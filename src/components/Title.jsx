import React, {Component} from 'react'
import {Header} from 'semantic-ui-react'

export default class Title extends Component {
  constructor(props, context) {
    super(props, context);

    this.props.getTitle(this.props.projectSymbol, this.props.deviceName);
  }

  title = () => {
    let title = "";
    if (this.props.project) {
      title += `プロジェクトID: ${this.props.project.projectID.substring(0, 7)}, ${this.props.project.projectSymbol} / ${this.props.project.projectName}`;
      if (this.props.device) {
        title += ` / ${this.props.device.deviceName} (${this.props.device.deviceIp})`
      }
    }
    return <Header className={"page-title"} content={title} as={"h1"}/>;
  }

  render() {
    return (
      <this.title/>
    )
  }
}
