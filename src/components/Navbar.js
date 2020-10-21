import React from 'react'
import {NavLink} from 'react-router-dom'
import {Button, Grid, Icon, Menu} from 'semantic-ui-react'

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.logoutButton = this.logoutButton.bind(this);
  }

  logoutButton() {
    if (this.props.auth.loggedIn) {
      return (
        <Menu vertical compact borderless text className={"navigation-footer"}>
          <Menu.Item>
            <Button
              className={'item'} onClick={this.handleUpload} size={"large"}
              content={
                <Grid style={{overflow: "hidden"}}>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Icon name='bitbucket' size={"big"}/>
                    </Grid.Column>
                    <Grid.Column width={12} textAlign={"left"} verticalAlign={"middle"}>
                      Activate<br/>Bitbucket
                    </Grid.Column>
                  </Grid.Row>
                </Grid>}/>
          </Menu.Item>
          <Menu.Item>
            <Button
              className={'item'} onClick={this.handleUpload} size={"large"}
              content={
                <Grid style={{overflow: "hidden"}}>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Icon name='docker' size={"big"}/>
                    </Grid.Column>
                    <Grid.Column width={12} textAlign={"left"} verticalAlign={"middle"}>
                      Activate<br/>Docker Hub
                    </Grid.Column>
                  </Grid.Row>
                </Grid>}/>
          </Menu.Item>
          <Menu.Item>
            <Button icon labelPosition='left'
                    onClick={this.props.logoutAndRedirect}>
              <Icon name='sign-out'/>
              ログアウト
            </Button>
          </Menu.Item>
        </Menu>
      );
    } else {
      return "";
    }
  }

  render() {
    return (
      <nav>
        <Menu text vertical borderless compact>
          <Menu.Item>
            <Menu.Item fitted={"vertically"} header>Deployment System</Menu.Item>
            <Menu.Item fitted={"vertically"} content={<NavLink to="/Projects" exact>プロジェクト</NavLink>}/>
          </Menu.Item>
        </Menu>
        <this.logoutButton/>
      </nav>
    )
  }
}

export default Navbar;
