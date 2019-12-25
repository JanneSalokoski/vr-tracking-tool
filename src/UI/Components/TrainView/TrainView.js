import React from 'react';
import "./TrainView.scss";

import TrainItem from "./TrainItem.js";

const data = require("./data.json");

const TrainView = (props) => {
  const getTrainItems = (train_data) => {
    return train_data.map(train => (<TrainItem data={train}/>));
  }

  return(
    <div className="module TrainView">
      <div className="trainList">
        {getTrainItems(data.trains)}
      </div>
    </div>
  );
}

export default TrainView;
