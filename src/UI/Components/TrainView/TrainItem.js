import React, {useContext} from 'react';
import dateFormat from "dateformat";

import Button from "../../Elements/Button.js";
import CloseButton from "../../Elements/CloseButton.js";
import MinifyButton from "../../Elements/MinifyButton.js";
import ExpandButton from "../../Elements/ExpandButton.js";
import ContextMenuButton from "../../Elements/ContextMenuButton.js";

import {store} from "../../../store.js";

import "./TrainItem.scss";

const formatTime = (date) => {
  const timestampFormat = "HH:MM";
  return (date) ? dateFormat(date, timestampFormat) : "";
}

const TrainItem = (props) => {
  const applicationState = useContext(store);
  const {state, dispatch} = applicationState;

  const getTimeTableRow = (row) => {
		return (
    <tr key={row.stationShortCode}
      className={`row ${row.commercialStop ? "STOP" : "PASS"} ${(row.stationShortCode === props.data.currentStation && props.data.runningCurrently) ? "currentStation" : ""}`}>
      <td className="stationShortCode">{state.stationInfo[row.stationShortCode].stationName}</td>
      <td className="commercialTrack">{row.commercialTrack}</td>

      <td className="arrival_time">{formatTime(row.arrival.scheduledTime)}</td>
      <td className="arrival_delay">{row.arrival.differenceInMinutes}</td>
      <td className="arrival_liveEstimateTime">{formatTime(row.arrival.liveEstimateTime)}</td>

      {props.data.runningCurrently ? (<td className="departure_time">{formatTime(row.departure.scheduledTime)}</td>) : ""}
      {props.data.runningCurrently ? (<td className="departure_delay">{row.departure.differenceInMinutes}</td>) : ""}
      {props.data.runningCurrently ? (<td className="departure_liveEstimateTime">{formatTime(row.departure.liveEstimateTime)}</td>) : ""}
    </tr>
  )};

  const getTimeTableRows = (rows) =>
    rows.map(row => getTimeTableRow(row));

  return(
    <div className={"TrainItem " + props.data.elementStatus}>
      <div className="controls">
        <CloseButton callback={() => console.log("Close")} />
        <MinifyButton callback={() => console.log("Minify")} />
        <ExpandButton expanded={false} callback={() => console.log("Toggle expansion")} />
      </div>
      <div className="title">{props.data.trainName}</div>
      <div className="settings">
        <ContextMenuButton callback={() => {console.log("Open context menu")}} />
      </div>

      <div className="o-d">
        <span className="startTime">{`${formatTime(props.data.fromStation.departure.scheduledTime)}`}</span>
        <span className="from">{state.stationInfo[props.data.fromStation.stationShortCode].stationName}</span>
        <span className="separator"> → </span>
        <span className="to">{state.stationInfo[props.data.toStation.stationShortCode].stationName}</span>
        <span className="endTime">{`${formatTime(props.data.toStation.arrival.scheduledTime)}`}</span>
      </div>

      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Station</th>
              <th>Track</th>

              {props.data.runningCurrently ? (<th>Arrival time</th>) : (<th>Time</th>)}
              {props.data.runningCurrently ? (<th>Arrival delay</th>) : (<th>Delay</th>)}
              {props.data.runningCurrently ? (<th>Arrival estimate</th>) : (<th>Estimate</th>)}

              {props.data.runningCurrently ? (<th>Departure time</th>) : ""}
              {props.data.runningCurrently ? (<th>Departure delay</th>) : ""}
              {props.data.runningCurrently ? (<th>Departure estimate</th>) : ""}

            </tr>
          </thead>
          <tbody>
            {getTimeTableRows(props.data.timeTableRows)}
          </tbody>
        </table>
      </div>

      <div className={"status " + (props.data.runningCurrently ? "online" : "offline")}>{props.data.runningCurrently ? "ONLINE" : "OFFLINE"}</div>

      <div className="info">
        No additional info
      </div>
    </div>
  );
}

export default TrainItem;
