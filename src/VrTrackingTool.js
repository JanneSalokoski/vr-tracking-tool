import React from 'react';
import './main.scss';
import {API} from "./API/API.js";

import Components from "./UI/Components/Components.js";

function VrTrackingTool() {
  API.MQTT.connect((res) => {
    console.log("CONNECTED");
  }
}

  return (
    <div className="vr-tracking-tool">
      <Components.Header />
      <Components.TrainView />
    </div>
  );
}

export default VrTrackingTool;
