import React from 'react';
import './main.scss';

import Components from "./UI/Components/Components.js";

function VrTrackingTool() {
  return (
    <div className="vr-tracking-tool">
      <Components.Header />
      <Components.TrainView />
    </div>
  );
}

export default VrTrackingTool;
