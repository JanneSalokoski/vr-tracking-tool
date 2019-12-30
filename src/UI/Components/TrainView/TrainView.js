import React, {useContext} from 'react';

import {API, Train} from "../../../API/API.js";
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

  let identifier;
  const updateIdentifier = (event) => {
    identifier = event.target.value;
  }

  const createNewTrain = async () => {
    const train = await API.getTrains(identifier);
    dispatch({type: "CREATE_TRAIN", trainObject: train});

    const tracking = await API.getTracking(identifier);
    dispatch({type: "TRACKING", train: train.trainName, data: tracking});

    API.MQTT.subscribeToTopic(`trains/+/${train.trainNumber}/#`, (msg) => {
      //console.log(JSON.parse(msg.payloadString));
      let newTrainObject = new Train(JSON.parse(msg.payloadString));
      dispatch({type: "UPDATE_TRAIN", trainObject: newTrainObject});
    });

    API.MQTT.subscribeToTopic(`train-tracking/+/${train.trainNumber}/#`, (msg) =>
      dispatch({type: "TRACKING", train: train.trainName, data: JSON.parse(msg.payloadString)})
    );
  }

  return(
    <div className="module TrainView">
      <input type="button" value="Disconnect" onClick={API.disconnect} />
      <input type="text" placeholder="trainNumber" onChange={updateIdentifier}/>
      <input type="button" onClick={createNewTrain} value="Create train"></input>
      <div className="trainList">
        {createTrainItemElements(state.trains)}
      </div>
    </div>
  );
}

export default TrainView;
