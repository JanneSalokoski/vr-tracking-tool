import React, {useContext, useEffect} from 'react';

import {API, Train} from "../../../API/API.js";
import { store } from '../../../store.js';

import TrainItem from "./TrainItem.js";
import Autocomplete from "./Autocomplete.js";

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

  async function getLiveTrains() {
    const data = await API.getLiveTrains();
    dispatch({type: "LIVE_TRAINS_UPDATED", data: data});
  }

  async function enterSearch(event) {
    getLiveTrains();
    dispatch({type: "TRAIN_SEARCH_ACTIVE"});
  }

  async function exitSearch(event) {
    dispatch({type: "TRAIN_SEARCH_ENDED"});
  }

  const updateIdentifier = (event) => {
    dispatch({type: "TRAIN_SEARCH_QUERY_UPDATED", query: event.target.value});
    //const liveTrains = getLiveTrains();
  }

  async function handleKeyPresses (event) {
    if (event.key === "Enter") {
      createNewTrain();
      dispatch({type: "TRAIN_SEARCH_QUERY_UPDATED", query: ""});
    }
  }

  useEffect(() => {
    if (Object.entries(state.liveTrains).length > 1) {
      let filteredLiveTrains = state.liveTrains.filter(train =>
        train.trainName.match(new RegExp(state.trainSearchQuery, "g")));

      dispatch({type: "FILTERED_LIVE_TRAINS_UPDATED", data: filteredLiveTrains});
    }
  }, [state.trainSearchQuery])

  const createNewTrain = async () => {
    const train = await API.getTrains(state.trainSearchQuery);
    dispatch({type: "CREATE_TRAIN", trainObject: train});

    const tracking = await API.getTracking(state.trainSearchQuery);
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
      <div className="search">
        <div className="searchBar">
          <input className="trainSearchBar" type="text" placeholder="trainNumber" onChange={updateIdentifier} autofocus="true" onFocus={enterSearch} onBlur={exitSearch} value={state.trainSearchQuery} onKeyPress={handleKeyPresses}/>
          <input className="trainSearchSubmit" type="button" onClick={createNewTrain} value="Create train"></input>
        </div>
        <Autocomplete items={state.filteredLiveTrains} />
      </div>
      <div className="trainList">
        {createTrainItemElements(state.trains)}
      </div>
    </div>
  );
}

export default TrainView;
