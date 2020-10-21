import {microservicesConstants} from '../constants';

const initialState = {
  microservices: [],
  notDeployedMicroservices: [],
  devices: [],
  projectID: null,
  error: null,
};

export function microservices(state = initialState, action) {
  if (action.type === microservicesConstants.FETCH_MICROSERVICES_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === microservicesConstants.FETCH_MICROSERVICES_SUCCESS) {
    return {
      ...state,
      microservices: action.payload,
    };
  } else if (action.type === microservicesConstants.FETCH_MICROSERVICES_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === microservicesConstants.FETCH_DEVICES_REQUEST) {
    return {
      ...state,
      projectID: action.payload,
    };
  } else if (action.type === microservicesConstants.FETCH_DEVICES_SUCCESS) {
    return {
      ...state,
      devices: action.payload,
    };
  } else if (action.type === microservicesConstants.FETCH_DEVICES_FAILURE) {
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === microservicesConstants.ADD_MICROSERVICE_REQUEST) {
    const microservices = state.microservices;
    microservices.push({name: action.name});
    return {
      ...state,
      microservices
    };
  } else if (action.type === microservicesConstants.ADD_MICROSERVICE_SUCCESS) {
    return {
      ...state,
      microservices: action.payload.microservices,
      notDeployedMicroservices: action.payload.notDeployedMicroservices,
    };
  } else if (action.type === microservicesConstants.ADD_MICROSERVICE_FAILURE) {
    return {
      ...state,
      error: action.error,
      microservices: state.microservices.slice(0, -1),
    };
  } else if (action.type === microservicesConstants.REMOVE_MICROSERVICE_REQUEST) {
    // TODO 削除リクエストを送信したマイクロサービスを一覧から一時的に消す
    return {
      ...state,
    };
  } else if (action.type === microservicesConstants.REMOVE_MICROSERVICE_SUCCESS) {
    return {
      ...state,
      microservices: action.payload.microservices,
      notDeployedMicroservices: action.payload.notDeployedMicroservices,
    };
  } else if (action.type === microservicesConstants.REMOVE_MICROSERVICE_FAILURE) {
    // TODO 削除リクエストを送信したマイクロサービスを一覧に戻す
    return {
      ...state,
      error: action.error,
    };
  } else if (action.type === microservicesConstants.FETCH_NOT_DEPLOYED_MICROSERVICES_REQUEST) {
    return {
      ...state,
    }
  } else if (action.type === microservicesConstants.FETCH_NOT_DEPLOYED_MICROSERVICES_SUCCESS) {
    return {
      ...state,
      notDeployedMicroservices: action.payload,
    }
  } else if (action.type === microservicesConstants.FETCH_NOT_DEPLOYED_MICROSERVICES_FAILURE) {
    return {
      ...state,
    }
  } else {
    return state;
  }
}
