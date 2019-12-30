import React, {createContext, useReducer} from 'react';

const initialState = {trains: {}};

const reducer = (state, action) => {
  const newState = {...state}
  switch (action.type) {
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
