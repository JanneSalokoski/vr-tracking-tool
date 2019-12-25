import React from 'react';
import "./TrainItem.scss";

const dateFormat = require('dateformat');

const TrainItem = (props) => {
  const trainName = `${props.data.trainType}${props.data.trainNumber}`;

  const dateToTime = (date) =>
    `~${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

  const getRowTime = (row) =>
    new Date(row.liveEstimateTime || row.actualTime || row.scheduledTime);

  const getTimeTableRow = (row) => (
    <tr className={
        row.type + " " +
        ((row.trainStopping) ? "STOP" : "PASS") + " " +
        ((getRowTime(row) > new Date()) ? "arriving" : "passed")
      }>
      <td className="stationShortCode">{row.stationShortCode}</td>
      <td className="commercialTrack">{row.commercialTrack}</td>
      <td className="time">{getRowTime(row)}</td>
      <td className="delay">{row.liveEstimateTime}</td>
    </tr>
  );

  const getTimeTableRows = (timetableRows) =>
    timetableRows.map(getTimeTableRow);

  return(
    <div className="TrainItem">
      <div className="controls">[X][↑][O]</div>
      <div className="title">IC12</div>
      <div className="settings">...</div>

      <div className="o-d">[21:21:00] HKI → JSU [03:22:43]</div>

      <div className="timetable">
        <table>
          <thead>
            <tr>
              <th>Station</th>
              <th>Track</th>
              <th>Time</th>
              <th>Delay</th>
              <th>Estimate</th>
            </tr>
          </thead>
          <tbody>
            {getTimeTableRows(props.data.timeTableRows)}
          </tbody>
        </table>
      </div>

      <div className="status">OK</div>

      <div className="info">Turvalaitevika</div>
    </div>
  );
}

export default TrainItem;
