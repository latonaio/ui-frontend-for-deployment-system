import React from 'react'
import {Form, Grid, Icon, Popup, Table} from 'semantic-ui-react'
import Navbar from '../containers/Navbar';
import AionHeader from '../containers/AionHeader';
import Footer from '../components/Footer';
import WindowSizeListener from 'react-window-size-listener'
import Message from "../containers/Message";
import {Link} from "react-router-dom";

const MAX_SYMBOL_LENGTH = 7;

class Projects extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
      editingProject: {
        name: null,
        symbol: null,
        targetSymbol: null,
      },
      error: {
        name: null,
        symbol: null,
      },
    };

    this.registerRow = this.registerRow.bind(this);

    this.props.fetchProjects();
  }

  handleRegisterFormOpen = () => {
    this.setState({
      editingProject: {
        symbol: null,
        name: null,
        targetSymbol: null,
      },
      error: {
        name: null,
        symbol: null,
      },
    })
    this.props.pushNewProjectRow();
  };

  handleEditFormOpen = (project) => {
    this.setState({
      editingProject: {
        symbol: project.projectSymbol,
        name: project.projectName,
        targetSymbol: project.projectSymbol,
      },
      error: {
        name: null,
        symbol: null,
      },
    })
    this.props.setEditMode(project.projectSymbol);
  }

  handleProjectNameChange = (_, input) => {
    this.setState({
      editingProject: {
        ...this.state.editingProject,
        name: input.value
      }
    });
    this.checkName(input.value);
  }
  handleProjectSymbolChange = (_, input) => {
    this.setState({
      editingProject: {
        ...this.state.editingProject,
        symbol: input.value
      }
    });
    this.checkSymbol(input.value);
  }

  handleRegisterKeyPress = e => {
    if (e.key === 'Enter') {
      if (this.isEmpty(this.state.editingProject.name) || this.isEmpty(this.state.editingProject.symbol)) {
        this.setState({
          error: {
            name: this.isEmpty(this.state.editingProject.name) ? "プロジェクト名が入力されていません" : this.state.error.name,
            symbol: this.isEmpty(this.state.editingProject.symbol) ? "シンボルが入力されていません" : this.state.error.symbol,
          }
        });
      } else {
        if (this.state.error.name === null && this.state.error.symbol === null) {
          this.props.registerProject(
            this.state.editingProject.name,
            this.state.editingProject.symbol,
            this.state.editingProject.targetSymbol);
          this.setState({
            editingProject: {name: null, symbol: null, targetSymbol: null},
            error: {name: null, symbol: null},
          });
        }
      }
    }
  }

  checkName = (value) => {
    let message = null;
    if (this.props.projects
      .filter(project => project.projectSymbol !== this.state.editingProject.targetSymbol)
      .some(project => project.projectName === value)) {
      message = "プロジェクト名が重複しています";
    }
    this.setState({
      error: {
        ...this.state.error,
        name: message,
      }
    });
  }

  checkSymbol = (value) => {
    let message = null;
    if (value === 'default') {
      message = "このプロジェクトシンボルは使えません ";
    } else if (this.props.projects
      .filter(project => project.projectSymbol !== this.state.editingProject.targetSymbol)
      .filter(project => !this.isEmpty(project.projectSymbol))
      .map(project => project.projectSymbol.toLowerCase())
      .some(lowerProjectSymbol => lowerProjectSymbol === value.toLowerCase())) {
      message = "シンボルが重複しています";
    } else if (this.isEmpty(value) !== null && !value.match(new RegExp(`^[A-Za-z0-9]{0,${MAX_SYMBOL_LENGTH}}$`))) {
      message = `${MAX_SYMBOL_LENGTH}文字以内の半角英数字で入力してください`
    }

    this.setState({
      error: {
        ...this.state.error,
        symbol: message,
      }
    });
  }

  isEmpty = (input) => input === undefined || input === null || input === "";

  projectRow(row) {
    return (
      <Table.Row>
        <Table.Cell content={
          <Link to={"/Microservices/" + row.projectSymbol}>
            {row.projectName},&nbsp;{row.projectSymbol}
          </Link>
        }/>
        <Table.Cell content={
          <Icon link name={"edit outline"} onClick={this.handleEditFormOpen.bind(this, row)}/>}/>
        {this.otherCells(row)}
      </Table.Row>
    )
  }

  registerRow(row) {
    let symbolForm;
    if (row.projectSymbol !== undefined) {
      symbolForm = <label>{row.projectSymbol}</label>
    } else {
      symbolForm = <Popup
        open={this.state.error.symbol !== null}
        content={this.state.error.symbol}
        position={"bottom left"}
        wide
        trigger={
          <Form.Input
            onChange={this.handleProjectSymbolChange}
            onKeyPress={this.handleRegisterKeyPress}
            error={this.state.error.symbol !== null}
            width={5}
            placeholder={"シンボル"}
            defaultValue={row.projectSymbol}
          />
        }
      />
    }

    let registerForm;
    registerForm =
      <Form>
        <Form.Group inline style={{marginBottom: "0"}}>
          <Popup
            open={this.state.error.name !== null}
            content={this.state.error.name}
            position={"bottom left"}
            wide
            trigger={
              <Form.Input
                onChange={this.handleProjectNameChange}
                onKeyPress={this.handleRegisterKeyPress}
                error={this.state.error.name !== null}
                width={11}
                placeholder={"プロジェクト名"}
                defaultValue={row.projectName}
              />
            }
          />
          {symbolForm}
        </Form.Group>
      </Form>

    return (
      <Table.Row>
        <Table.Cell content={registerForm}/>
        <Table.Cell content={
          <Icon link name={"times"} onClick={this.props.unsetEditMode}/>
        }/>
        {this.otherCells(row)}
      </Table.Row>
    );
  }

  otherCells = (row) => [
    <Table.Cell textAlign={"center"} content={row.projectID ? row.projectID.substring(0, 7) : ""}/>,
    <Table.Cell textAlign={"center"} content={row.podCount}/>,
    <Table.Cell textAlign={"center"} content={row.deviceCount}/>,
    <Table.Cell textAlign={"center"}
                content={row.projectSymbol !== undefined ? (row.podCount > 0 ? "Running" : "Created") : null}/>,
  ]

  projectTable = () => {
    const tableRows = [];

    for (let i = 0; i < this.props.projects.length; i++) {
      const row = this.props.projects[i];
      tableRows.push(row.isEditing ? this.registerRow(row) : this.projectRow(row));
    }

    // 全ての行のプロジェクトシンボルが存在する->追加中ではない
    if (this.props.projects.every(p => p.projectSymbol !== undefined)) {
      tableRows.push(<Icon name={"plus"} link onClick={this.handleRegisterFormOpen}/>);
    }

    return (
      <Table basic={"very"}>
        <Table.Header>
          <Table.HeaderCell textAlign={"left"} width={7} content={"プロジェクト名, シンボル"}/>
          <Table.HeaderCell textAlign={"center"} width={1}/>
          <Table.HeaderCell textAlign={"center"} width={2} content={"ID"}/>
          <Table.HeaderCell textAlign={"center"} width={2} content={"Pod数"}/>
          <Table.HeaderCell textAlign={"center"} width={2} content={"端末数"}/>
          <Table.HeaderCell textAlign={"center"} width={2} content={"Status"}/>
        </Table.Header>
        <Table.Body className={"project-table-body"}>
          {tableRows}
        </Table.Body>
      </Table>
    );
  }

  render() {
    return (
      <div className="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 120;
          this.setState({gridHeight: gridHeight});
        }}/>

        <AionHeader titles={["デプロイシステム", "プロジェクト"]}/>

        <Grid style={{height: this.state.gridHeight + "px", marginTop: "0"}}>
          <Grid.Row style={{padding: "0"}}>
            <Grid.Column width={3}>
              <Navbar/>
            </Grid.Column>
            <Grid.Column width={13} className={"contents"}>
              <this.projectTable/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Message/>
        <Footer/>
      </div>
    )
  }
}


export default Projects;
