import React from 'react';
import dateFormat from "dateformat";

import "./TrainItem.scss";

const formatTime = (date) => {
  const timestampFormat = "HH:MM:ss";
  return (date) ? dateFormat(date, timestampFormat) : "";
}

const TrainItem = (props) => {
  const getTimeTableRow = (row) => (
    <tr className={"row"}>
      <td className="stationShortCode">{row.stationShortCode}</td>
      <td className="commercialTrack">{row.commercialTrack}</td>
      <td className="time">{formatTime(row.scheduledTime)}</td>
      <td className="delay">{row.differenceInMinutes}</td>
      <td className="liveEstimateTime">{formatTime(row.liveEstimateTime)}</td>
    </tr>
  );

  const getTimeTableRows = (rows) =>
    rows.map(row => getTimeTableRow(row));

  console.log(props.data.timeTableRows)

  return(
    <div className="TrainItem">
      <div className="controls">[X][↑][O]</div>
      <div className="title">{props.data.trainNumber}</div>
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
