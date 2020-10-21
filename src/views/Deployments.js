import React from 'react'
import {Button, Grid, Icon} from 'semantic-ui-react'
import Navbar from '../containers/Navbar';
import AionHeader from '../containers/AionHeader';
import Footer from '../components/Footer';
import WindowSizeListener from 'react-window-size-listener'
import Title from "../containers/Title";
import {Diff, Hunk, parseDiff} from 'react-diff-view';
import 'react-diff-view/style/index.css';

// const publicURL = process.env.REACT_APP_PUBLIC_URL;
const EMPTY_HUNKS = [];

class Deployments extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {gridHeight: 800};

    const params = this.props.match;
    this.projectID = params.params.project_id;
    this.deviceID = params.params.device_id;
    this.microserviceID = params.params.microservice_id;

    this.props.getDevice(this.deviceID);
    this.props.getMicroservice(this.microserviceID);
    this.props.getLatestDeployment(this.microserviceID, this.deviceID);
    this.props.getContainer(this.microserviceID, this.deviceID);

    this.formRef = React.createRef();
    this.inputRef = React.createRef();

    this.microserviceTitle = this.microserviceTitle.bind(this);
    this.containerInformation = this.containerInformation.bind(this);
    this.deployButtonArea = this.deployButtonArea.bind(this);
    this.dockerFileDiff = this.dockerFileDiff.bind(this);

    this.handleUpload = this.handleUpload.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleDeploy = this.handleDeploy.bind(this);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        if (this.props.deployment && this.props.deployment.state === 0) {
          this.props.getContainer(this.microserviceID, this.deviceID);
          this.props.getLatestDeployment(this.microserviceID, this.deviceID);
        }
      }, 3000);
  }

  componentWillUnmount() {
    // デプロイ画面で使用した情報が他のデプロイ画面に引き継がれないようにする
    this.props.clearState();
    clearInterval(this.timerID);
  }

  microserviceTitle() {
    let microserviceTitle;
    if (this.props.microservice) {
      microserviceTitle = `${this.props.microservice.name} (マイクロサービスID: ${this.props.microservice.microservice_id.substring(0, 7)})`;
    }
    return <h2>{microserviceTitle}</h2>;
  }

  containerInformation() {
    if (this.props.container && this.props.container.container_id) {
      let containerInformation = `コンテナID: ${this.props.container.latest_container_id.substring(0, 7)}`;
      return (
        <h2>{containerInformation}</h2>
      );
    } else {
      return (
        <h2>コンテナ情報取得中</h2>
      );
    }
  }

  deployButtonArea() {
    let downloadClass = "";
    let downloadIconColor = " blue";
    let downloadURL;
    if (!this.props.localDockerFileText) {
      downloadClass = " disabled";
      downloadIconColor = " gray";
    } else {
      downloadURL = window.URL.createObjectURL(
        new Blob([this.props.localDockerFileText], {"type": "text/plain"}));
    }
    // upload不可能になる状態はない想定
    let uploadClass = "";
    let uploadIconColor = " blue";

    let deployClass = " blue";
    if (this.props.deployment && this.props.deployment.state === 0) {
      const now = new Date();
      const deployment_date = new Date(this.props.deployment.deployment_date);
      // 最後のデプロイが10分以内かつ失敗していたらデプロイボタンを押せないようにする
      if (now.setMinutes(now.getMinutes() - 10) < deployment_date.getTime()) {
        deployClass = " disabled gray";
      }
    }
    return (
      <div className={"ui top-right-area labeled icon text compact menu"}>
        <Button as={"a"} className={'ui labeled-icon-button large item' + downloadClass}
                href={downloadURL}
                download={"Dockerfile"} target={"_blank"}>
          <Icon name='download' className={"tiny fitted" + downloadIconColor}/>
          download
        </Button>
        <Button as={"a"} className={'ui labeled-icon-button large item' + uploadClass}
                onClick={this.handleUpload}>
          <Icon name='upload' className={"tiny fitted" + uploadIconColor}/>
          upload
        </Button>
        <Button className={"small" + deployClass} onClick={this.handleDeploy}>Deploy 実行</Button>
        <form onSubmit={this.handleSubmit} ref={this.formRef}>
          <input type={"file"} style={{display: "none"}}
                 accept={"*"} onChange={this.uploadFile} ref={this.inputRef}/>
        </form>
      </div>
    );
  }

  handleUpload() {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  }

  uploadFile() {
    this.props.uploadDockerFile(
      this.inputRef.current.files[0], this.props.localDockerFileText);
    this.inputRef.current.value = null;
  }

  handleDeploy() {
    if (this.props.uploadedDockerFileName) {
      this.props.deploy(this.microserviceID, this.deviceID, this.props.uploadedDockerFileName, this.projectID);
    } else {
      alert("Dockerfileをアップロードしてください。");
    }
  }

  dockerFileDiff() {
    let diff;
    let diffType = "diff";
    let hunks = EMPTY_HUNKS;
    if (this.props.diffText) {
      [diff] = parseDiff(this.props.diffText, {nearbySequences: 'zip'});
      hunks = diff.hunks;
      diffType = diff.type;
    }

    return (
      <div className={"diff-view"}>
        <Diff diffType={diffType} viewType="unified" hunks={hunks}>
          {hunks =>
            hunks.map(hunk => (
              <Hunk key={hunk.content} hunk={hunk}/>
            ))
          }
        </Diff>
      </div>
    );
  }

  render() {
    return (
      <div className="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 120;
          this.setState({gridHeight: gridHeight});
        }}/>

        <AionHeader titles={["デプロイシステム", "プロジェクトビュー", "コンテナ管理(エッジ)", "Dockerfile"]}/>

        <Grid style={{height: this.state.gridHeight + "px"}}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Navbar/>
            </Grid.Column>
            <Grid.Column width={13} className={"contents"}>
              <Title projectID={this.projectID} deviceID={this.deviceID}/>
              <div className={"page-contents"}>
                <this.deployButtonArea/>
                <this.microserviceTitle/>
                <this.containerInformation/>
                <this.dockerFileDiff/>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Footer/>
      </div>
    )
  }
}


export default Deployments;
