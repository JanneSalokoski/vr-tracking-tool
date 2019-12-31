import React, {useContext, useEffect} from 'react';
import './main.scss';
import {API} from "./API/API.js";

import {store} from "./store.js";

import Components from "./UI/Components/Components.js";

function VrTrackingTool() {
  const applicationState = useContext(store);
  const {state, dispatch} = applicationState;

  const connect_client = () => {
    API.MQTT.connect((res) => {
      if (res.success) {
        dispatch({type: "CONNECTION_SUCCESFULL"});
      } else {
        dispatch({type: "CONNECTION_FAILED"});
      }
    });
  }

  const connect_application = () => {
    if (!state.connected) {
      API.MQTT.client.isConnected() ? dispatch({type: "CONNECTION_SUCCESFULL"}) : connect_client();
    }
  };

  const init = () => {
    connect_application();
  }

  // Run init only when loading app for the first time
  useEffect(() => {
    init();
  }, []);

  return (
    <div className="vr-tracking-tool">
      <Components.Header />
      <input type="button" value="Connect" onClick={connect_application} />
      <input type="button" value="Disconnect" onClick={
        () => API.disconnect(() => {dispatch({type: "DISCONNECTED"})})
      } />
      <Components.TrainView />
    </div>
  );
}

export default VrTrackingTool;
