import React, {useContext, useEffect} from 'react';
import './main.scss';
import {API} from "./API/API.js";

import {store} from "./store.js";

import Components from "./UI/Components/Components.js";

function VrTrackingTool() {
  const applicationState = useContext(store);
  const {state, dispatch} = applicationState;

  const connectClient = () => {
    API.MQTT.connect((res) => {
      if (res.success) {
        dispatch({type: "CONNECTION_SUCCESFULL"});
      } else {
        dispatch({type: "CONNECTION_FAILED"});
      }
    });
  }

  const connectApplication = () => {
    if (!state.connected) {
      API.MQTT.client.isConnected() ? dispatch({type: "CONNECTION_SUCCESFULL"}) : connectClient();
    }
  };

  const getStationInfo = async () => {
    const stationInfo = await API.getStationInfo();
    dispatch({type: "SET_STATION_INFO", data: stationInfo});
  }

  const init = () => {
    connectApplication();
    getStationInfo();
  }

  // Run init only when loading app for the first time
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="vr-tracking-tool">
      <Components.Header />
      <input type="button" value="Connect" onClick={connectApplication} />
      <input type="button" value="Disconnect" onClick={() => API.disconnect(() => {dispatch({type: "DISCONNECTED"})})} />
      <Components.TrainView />
        </div>
  );
}

export default VrTrackingTool;
