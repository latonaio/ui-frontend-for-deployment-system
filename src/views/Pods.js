import React from 'react'
import {Button, Grid, Icon, Message} from 'semantic-ui-react'
import Navbar from '../containers/Navbar';
import AionHeader from '../containers/AionHeader';
import Footer from '../components/Footer';
import WindowSizeListener from 'react-window-size-listener'
import Title from "../containers/Title";
import VeryBasicTable from "../components/VeryBasicTable";
import ModalMessage from "../containers/Message";

// redisのhash型から取り出す際にstring型になる
const POD_STATUS_RUNNING = '0';

const STATUS_DEPLOY_RUNNING = '0';
const STATUS_DEPLOY_SENDING = '1';
const STATUS_DEPLOY_APPLYING = '2';
const STATUS_DEPLOY_SUCCESS = '3';
const STATUS_DEPLOY_FAILURE = "900";

const STATUS_DELETE_RUNNING = '800';
const STATUS_DELETE_SENDING = '801';
const STATUS_DELETE_APPLYING = '802';
const STATUS_DELETE_SUCCESS = '803';
const STATUS_DELETE_FAILURE = "980";

const STATUS_MESSAGE = {
  [STATUS_DEPLOY_RUNNING]: <div className='process-status-message'>Deploy<br/>Running</div>,
  [STATUS_DEPLOY_SENDING]: <div className='process-status-message'>Deploy<br/>Sending</div>,
  [STATUS_DEPLOY_APPLYING]: <div className='process-status-message'>Deploy<br/>Applying</div>,
  [STATUS_DEPLOY_SUCCESS]: <div className='process-status-message'>Deploy<br/>Completed</div>,
  [STATUS_DEPLOY_FAILURE]: <div className='process-status-message'>Deploy<br/>Failure</div>,
  [STATUS_DELETE_RUNNING]: <div className='process-status-message'>Delete<br/>Running</div>,
  [STATUS_DELETE_SENDING]: <div className='process-status-message'>Delete<br/>Sending</div>,
  [STATUS_DELETE_APPLYING]: <div className='process-status-message'>Delete<br/>Applying</div>,
  [STATUS_DELETE_SUCCESS]: <div className='process-status-message'>Delete<br/>Completed</div>,
  [STATUS_DELETE_FAILURE]: <div className='process-status-message'>Delete<br/>Failure</div>,
}

const DEPLOYING_STATUS_LIST = [
  STATUS_DEPLOY_RUNNING, STATUS_DEPLOY_SENDING, STATUS_DEPLOY_APPLYING,
]

const DELETING_STATUS_LIST = [
  STATUS_DELETE_RUNNING, STATUS_DELETE_SENDING, STATUS_DELETE_APPLYING,
]

class Pods extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {gridHeight: 800};

    const params = this.props.match;
    this.deviceName = params.params.deviceName;
    this.projectSymbol = params.params.projectSymbol;

    this.columns = {
      containers: [
        {
          name: "マイクロサービス名",
          key: "microserviceName",
          headerTextAlign: "left",
          rowTextAlign: "left",
          width: 4,
        },
        {
          name: "Pod名",
          key: "podName",
          headerTextAlign: "left",
          rowTextAlign: "left",
          width: 4,
        },
        {
          name: <span>Current<br/>Version</span>,
          key: "current",
          headerTextAlign: "center",
          rowTextAlign: "center",
          width: 1,
        },
        {
          name: <span>Latest<br/>Version</span>,
          key: "latest",
          headerTextAlign: "center",
          rowTextAlign: "center",
          width: 1,
        },
        {
          name: <span>Previous<br/>Dep. Date</span>,
          key: "deploymentDate",
          headerTextAlign: "center",
          rowTextAlign: "center",
          width: 1,
        },
        {
          name: <span>Pod<br/>Status</span>,
          key: "state",
          headerTextAlign: "center",
          rowTextAlign: "center",
          width: 1,
        },
        {
          name: <span>Docker File<br/>確認 / デプロイ</span>,
          key: "deploy",
          headerTextAlign: "center",
          rowTextAlign: "center",
          width: 2,
        },
        {
          name: "Pod削除",
          key: "delete",
          headerTextAlign: "center",
          rowTextAlign: "center",
          width: 1,
        },
        {
          name: <div>デプロイ<br/>Status</div>,
          key: "message",
          headerTextAlign: "center",
          rowTextAlign: "center",
          width: 1,
        },
      ]
    };

    this.props.getProject(this.projectSymbol);
    this.props.getDevice(this.deviceName);
    this.props.fetchPod(this.projectSymbol, this.deviceName);
  }

  componentDidMount = () => {
    this.timerID = setInterval(() =>
      this.props.fetchPod(this.projectSymbol, this.deviceName
      ), 3000);
  }

  componentWillUnmount = () => clearInterval(this.timerID);

  deviceTitle = () => {
    let deviceTitle;
    if (this.props.device) {
      deviceTitle = `${this.props.device.deviceName} (${this.props.device.deviceIp})`;
    }
    return <h2>{deviceTitle}</h2>;
  }

  containerRows = () => {
    const rows = [];

    const isSomeProcessing = this.props.pods.some(
      pod =>
        DEPLOYING_STATUS_LIST.includes(pod.deployment.status) || DELETING_STATUS_LIST.includes(pod.deployment.status)
    )

    for (let i = 0; i < this.props.pods.length; i++) {
      const pod = this.props.pods[i];
      let statusIcon = <Icon name={"warning sign"} className={"red"}/>;
      if (pod.status === POD_STATUS_RUNNING) {
        statusIcon = <Icon name={"check circle"} className={"green"}/>;
      }

      const isRunning = pod.status !== null && pod.status === POD_STATUS_RUNNING;
      const isTheOtherProject = this.props.device && this.projectSymbol !== this.props.device.projectSymbolFk;

      let message = "";
      let isDeploying = false;
      let isDeleting = false;

      if (pod.deployment.status !== null) {
        message = STATUS_MESSAGE[pod.deployment.status];
        isDeploying = DEPLOYING_STATUS_LIST.includes(pod.deployment.status);
        isDeleting = DELETING_STATUS_LIST.includes(pod.deployment.status);
      }

      const isDeployDisabled =
        isTheOtherProject           // デバイスの紐付き先のプロジェクトではない場合
        || isSomeProcessing         // いずれかのマイクロサービスがデプロイまたは削除中の場合
        || this.props.isInProgress  // ボタン押下からレスポンス待ちの場合
        || isRunning                // Podが起動している場合

      const isDeleteDisabled =
        isTheOtherProject            // デバイスの紐付き先のプロジェクトではない場合
        || isSomeProcessing         // いずれかのマイクロサービスがデプロイまたは削除中の場合
        || this.props.isInProgress   // ボタン押下からレスポンス待ちの場合
        || !isRunning                // Podが起動していない場合


      rows.push({
        podName: pod.podName,
        state: statusIcon,
        current: pod.currentVersion,
        latest: pod.latestVersion,
        deploymentDate: pod.deployedAt,
        microserviceName: pod.microserviceName,
        message: message,
        deploy: <span>
            <Button
              className={"blue mini"}
              content={"確認"}
            />
          <Button
            key={`deploy-${pod.microserviceName}-${isDeployDisabled}`}
            className={"mini"}
            content={"デプロイ"}
            color={"purple"}
            onClick={
              this.props.deployToKubernetes.bind(
                this,
                this.deviceName,
                pod.projectSymbol,
                pod.microserviceName
              )
            }
            loading={isDeploying}
            disabled={isDeployDisabled}
          />
        </span>,
        delete:
          <Button
            key={`delete-${pod.microserviceName}-${isDeleteDisabled}`}
            className={"mini"}
            content={"削除"}
            color={"black"}
            onClick={
              this.props.deleteFromKubernetes.bind(
                this,
                this.deviceName,
                pod.projectSymbol,
                pod.microserviceName)
            }
            loading={isDeleting}
            disabled={isDeleteDisabled}
          />,
      })
    }

    return rows;
  }

  wrongProjectErrorMessage = () => {
    if (this.props.device && this.projectSymbol !== this.props.device.projectSymbolFk) {
      return <Message
        error
        header={"エラー: このデバイスには別のプロジェクトが設定されています"}
      />
    } else {
      return "";
    }
  }

  render() {
    return (
      <div className="ui fluid container">
        <WindowSizeListener onResize={windowSize => {
          const gridHeight = windowSize.windowHeight - 120;
          this.setState({gridHeight: gridHeight});
        }}/>

        <AionHeader titles={["デプロイシステム", "プロジェクトビュー", "コンテナ管理(エッジ)"]}/>

        <Grid style={{height: this.state.gridHeight + "px", marginTop: "0"}}>
          <Grid.Row style={{padding: "0"}}>
            <Grid.Column width={3}>
              <Navbar/>
            </Grid.Column>
            <Grid.Column width={13} className={"contents"}>
              <Title projectSymbol={this.projectSymbol} deviceName={this.deviceName}/>
              <this.wrongProjectErrorMessage/>
              <div className={"page-contents"}
                   style={{height: this.state.gridHeight - 100 + "px", overflowY: "scroll"}}>
                <this.deviceTitle/>
                <VeryBasicTable
                  columns={this.columns.containers}
                  rows={this.containerRows()}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <ModalMessage/>
        <Footer/>
      </div>
    )
  }
}


export default Pods;
