import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import {PrivateRoute} from './components/PrivateRoute';

import Login from './containers/Login';
import Projects from './containers/Projects';
import Microservices from './containers/Microservices';
import Pods from './containers/Pods';
import Deployment from './containers/Deployments';
// font awesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCameraRetro,
  faCaretRight,
  faCheckSquare,
  faCircle,
  faCogs,
  faCut,
  faFileExport,
  faHandPointer,
  faSave,
  faStop,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCameraRetro,
  faCheckSquare,
  faCogs,
  faFileExport,
  faHandPointer,
  faSave,
  faArrowAltCircleRight,
  faArrowAltCircleLeft,
  faStop,
  faCut,
  faTimes,
  faCaretRight,
  faCircle,
);


const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Switch>
          <PrivateRoute path="/Projects" component={Projects}/>
          <PrivateRoute path="/Microservices/:projectSymbol" component={Microservices}/>
          <PrivateRoute path="/Pods/:projectSymbol/:deviceName" component={Pods}/>
          <PrivateRoute path="/Deployment/:projectSymbol/:deviceName/:microserviceName" component={Deployment}/>
          <Route path="/" exact={true} component={Login}/>
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(App);
