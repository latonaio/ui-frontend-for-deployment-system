import React from 'react'
import {Button, Dropdown, Grid, Icon, Popup, Table} from 'semantic-ui-react'
import Navbar from '../containers/Navbar';
import AionHeader from '../containers/AionHeader';
import Footer from '../components/Footer';
import WindowSizeListener from 'react-window-size-listener'
import VeryBasicTable from "../components/VeryBasicTable";
import Title from "../containers/Title";
import {Link} from "react-router-dom";

const DEVICE_STATUS_CONNECTING = 0;

class Microservices extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      gridHeight: 800,
      selectedMicroserviceID: null,
      message: null,
    };

    const params = this.props.match;
    this.projectSymbol = params.params.projectSymbol;

    this.columns = {
      "microservices": [
        {name: "マイクロサービス名", key: "name", headerTextAlign: "left", rowTextAlign: "left"},
        {name: "ID", key: "microserviceID", headerTextAlign: "left", rowTextAlign: "left"},
        {name: "Latest Version", key: "latest", headerTextAlign: "center", rowTextAlign: "center"},
        {name: "リリース日", key: "releaseDate", headerTextAlign: "center", rowTextAlign: "center"},
        {name: "", key: "remove", headerTextAlign: "center", rowTextAlign: "center"},
      ],
      "devices": [
        {name: "エッジ端末名(IP)", key: "name", headerTextAlign: "left", rowTextAlign: "left"},
        {
          name: <span style={{fontSize: "0.8em", lineHeight: "0.8em"}}>Network<br/>Status</span>,
          key: "status",
          headerTextAlign: "center",
          rowTextAlign: "center"
        },
        {name: "Project", key: "symbol", headerTextAlign: "center", rowTextAlign: "center"},
        {name: "コンテナ/デプロイ", key: "container", headerTextAlign: "center", rowTextAlign: "center"},
        {name: "OS/デプロイ", key: "os", headerTextAlign: "center", rowTextAlign: "center"},
      ],
    };
    this.registerRow = this.registerRow.bind(this);

    // Microservice
    this.props.fetchMicroservices(this.projectSymbol);
    this.props.fetchNotDeployedMicroservices(this.projectSymbol);

    // Device
    this.props.fetchDevices();
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        this.props.fetchDevices();
      }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  microserviceRows = () => {
    const microservices = [];
    for (let i = 0; i < this.props.microservices.length; i++) {
      const microservice = this.props.microservices[i];
      let row = {
        name: microservice.name,
      };

      if (microservice.microservice_id) {
        row = {
          ...row,
          microserviceID: microservice.microservice_id.substr(0, 7),
          latest: microservice.latest,
          releaseDate: microservice.release_date
            ? microservice.release_date.slice(0, 10).replace(/-/g, "/") : null,
          remove: microservice.isRemovable === 1
            ? <Icon name={'times'} link
                    onClick={() => {
                      this.props.removeMicroservice(this.projectSymbol, microservice.name);
                      this.setState({message: null});
                    }}/> : null,
        }
      }

      microservices.push(row);
    }
    return microservices;
  }

  deviceRows = () => {
    const devices = [];

    for (let i = 0; i < this.props.devices.length; i++) {
      const device = this.props.devices[i];
      const linkTo = `/Pods/${this.projectSymbol}/${device.deviceName}`;
      devices.push({
        name: `${device.deviceName} (${device.deviceIp})`,
        status: device.connectionStatus === DEVICE_STATUS_CONNECTING
          ? <span><Icon name={"check circle"} color={"green"}/>connected</span>
          : <span><Icon name={"warning sign"} color={"red"}/>disconnected</span>,
        symbol: device.projectSymbol
          ? <span>{device.projectSymbolFk}</span>
          : <span style={{color: "red"}}>{device.projectSymbolFk}</span>,
        container: <Link to={linkTo}><Button className={"blue mini"}>コンテナ管理</Button></Link>,
        os: <Button className={"blue mini"} color={"olive"}>OS管理</Button>
      });
    }

    return devices;
  }

  handleRegisterFormOpen = () => this.setState({isRegister: true});
  handleRegisterFormChange = (_, {name, value}) => {
    this.setState({[name]: value});
    if (value !== null) {
      this.setState({message: "Enterキーで決定"});
    } else {
      this.setState({message: null});
    }
  }
  handleRegisterKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (this.state.selectedMicroserviceID !== null) {
        this.props.addMicroservice(
          this.projectSymbol,
          this.props.notDeployedMicroservices[this.state.selectedMicroserviceID].name,
        );
        this.setState({selectedMicroserviceID: null, isRegister: false, message: null});
      }
    }
  }

  microserviceOptions = () => {
    return this.props.notDeployedMicroservices.map((microservice, index) => ({
      key: microservice.microservice_id,
      text: microservice.name,
      value: index,
    }))
  }

  registerRow() {
    let registerForm;
    if (this.state.isRegister) {
      registerForm =
        <Popup
          open={this.state.message !== null}
          content={this.state.message}
          position={"bottom center"}
          wide
          trigger={
            <Dropdown
              search
              selection
              name={"selectedMicroserviceID"}
              wrapSelection={false}
              options={this.microserviceOptions()}
              onChange={this.handleRegisterFormChange}
              onKeyPress={this.handleRegisterKeyPress}
              as={"span"}
              fluid
            />
          }
        />
    } else {
      registerForm = <Icon name={"plus"} link onClick={this.handleRegisterFormOpen}/>
    }

    return (
      <Table.Row>
        <Table.Cell colSpan={this.columns.microservices.length}>
          {registerForm}
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    return (
      <div className="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 120;
          this.setState({gridHeight: gridHeight});
        }}/>

        <AionHeader titles={["デプロイシステム", "プロジェクトビュー"]}/>

        <Grid style={{height: this.state.gridHeight + "px", marginTop: "0"}}>
          <Grid.Row style={{padding: "0"}}>
            <Grid.Column width={3}>
              <Navbar/>
            </Grid.Column>
            <Grid.Column width={13} className={"contents"}>
              <Title projectSymbol={this.projectSymbol} deviceID={null}/>
              <Grid className={"split-grid"} divided style={{height: this.state.gridHeight - 100 + "px"}}>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    <h2>
                      マイクロサービス一覧
                    </h2>
                    <VeryBasicTable
                      columns={this.columns.microservices}
                      rows={this.microserviceRows()}
                      additionalRow={<this.registerRow/>}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <h2>
                      エッジ端末の状況
                    </h2>
                    <VeryBasicTable
                      columns={this.columns.devices}
                      rows={this.deviceRows()}/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer/>
      </div>
    )
  }
}


export default Microservices;
