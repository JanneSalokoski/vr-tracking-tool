import React, {createContext, useReducer} from 'react';

const initialState = {
  connected: false,
  trains: {},
  stations: {},
  stationInfo: {},
  meta: {
    majorVersion: 0,
    minorVersion: 1,
    releaseType: "DEV",
  }
};

const reducer = (state, action) => {
  const newState = {...state}
  switch (action.type) {
    case 'CONNECTION_SUCCESFULL':
      console.log("Connected");
      newState.connected = true;
      return newState;
    case 'CONNECTION_FAILED':
      newState.connected = false;
      return newState;
    case 'DISCONNECTED':
      newState.connected = false;
      return newState;
    case 'SET_STATION_INFO':
      newState.stationInfo = action.data;
      console.log(action.data);
      return newState;
    case 'CREATE_TRAIN':
      newState.trains[action.trainObject.trainName] = action.trainObject;
      return newState;
    case 'UPDATE_TRAIN':
      newState.trains[action.trainObject.trainName] = action.trainObject;
      return newState;
    case 'TRACKING':
      newState.trains[action.train].currentStation = action.data.station;
      return newState;
    default:
      throw new Error();
  }
}

const store = createContext(initialState);
const {Provider} = store;

const DispatchProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (<Provider value={{state, dispatch}}>{children}</Provider>);
}

export {store, DispatchProvider};
