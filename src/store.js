import React, {createContext, useReducer} from 'react';

const initialState = {
  connected: false,
  trains: {},
  stations: {},
  meta: {
    majorVersion: 0,
    minorVersion: 1,
    releaseType: "Alpha",
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
