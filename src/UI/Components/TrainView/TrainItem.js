import React, {useContext} from 'react';
import dateFormat from "dateformat";

import {store} from "../../../store.js";

import "./TrainItem.scss";

const formatTime = (date) => {
  const timestampFormat = "HH:MM";
  return (date) ? dateFormat(date, timestampFormat) : "";
}

const TrainItem = (props) => {
  const applicationState = useContext(store);
  const {state, dispatch} = applicationState;

  const getTimeTableRow = (row) => (
    <tr key={row.stationShortCode} className={`row ${row.commercialStop ? "STOP" : "PASS"} ${(row.stationShortCode === props.data.currentStation) ? "currentStation" : ""}`}>
      <td className="stationShortCode">{state.stationInfo[row.stationShortCode].stationName}</td>
      <td className="commercialTrack">{row.commercialTrack}</td>
      <td className="departure">{formatTime(row.departure.scheduledTime)}</td>
      <td className="delay">{row.differenceInMinutes}</td>
      <td className="liveEstimateTime">{formatTime(row.liveEstimateTime)}</td>
    </tr>
  );

  const getTimeTableRows = (rows) =>
    rows.map(row => getTimeTableRow(row));

  return(
    <div className={"TrainItem " + props.data.elementStatus}>
      <div className="controls">[X][↑][O]</div>
      <div className="title">{props.data.trainName}</div>
      <div className="settings">...</div>

      <div className="o-d">
        <span className="startTime">{`[${formatTime(props.data.fromStation.departure.scheduledTime)}] `}</span>
        <span className="from">{state.stationInfo[props.data.fromStation.stationShortCode].stationName}</span>
        <span className="separator"> → </span>
        <span className="to">{state.stationInfo[props.data.toStation.stationShortCode].stationName}</span>
        <span className="endTime">{` [${formatTime(props.data.toStation.arrival.scheduledTime)}]`}</span>
      </div>

      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Station</th>
              <th>Track</th>
              <th>Departure</th>
              <th>Delay</th>
              <th>Estimate</th>
            </tr>
          </thead>
          <tbody>
            {getTimeTableRows(props.data.timeTableRows)}
          </tbody>
        </table>
      </div>

      <div className="status">{props.data.runningCurrently ? "ONLINE" : "OFFLINE"}</div>

      <div className="info"></div>
    </div>
  );
}

export default TrainItem;
