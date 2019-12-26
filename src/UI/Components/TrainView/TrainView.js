import React, {useContext} from 'react';

import {API} from "../../../API/API.js";
import { store } from '../../../store.js';

import TrainItem from "./TrainItem.js";

import "./TrainView.scss";

const TrainView = (props) => {
  const applicationState = useContext(store);
  const {state, dispatch} = applicationState;

  const createTrainItemElements = (trains) => {
    let trainItemElements = [];

    for (let train in trains) {
      trainItemElements.push((<TrainItem key={trains[train].trainName} data={trains[train]} />));
    }

    return trainItemElements;
  }

  const createNewTrain = async () => {
    const identifier = 266;
    const train = await API.getTrains(identifier);
    dispatch({type: "CREATE_TRAIN", trainObject: train});

    API.subscribeToTrainUpdates(train, (newTrainObject) => {
      dispatch({type: "UPDATE_TRAIN", trainObject: newTrainObject});
    });
  }

  return(
    <div className="module TrainView">
      <input type="button" onClick={createNewTrain} value="Create train (IC12)"></input>
      <div className="trainList">
        {createTrainItemElements(state.trains)}
      </div>
    </div>
  );
}

export default TrainView;
