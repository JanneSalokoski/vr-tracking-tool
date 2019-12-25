import React from 'react';
import "./TrainItem.scss";

const TrainItem = (props) => {
  const getTimeTableRow = (row) => (
    <tr className={"row"}>
      <td className="stationShortCode">{row.stationShortCode}</td>
      <td className="commercialTrack">{row.commercialTrack}</td>
      <td className="time">{}</td>
      <td className="delay">{row.liveEstimateTime}</td>
    </tr>
  );


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
            
          </tbody>
        </table>
      </div>

      <div className="status">OK</div>

      <div className="info">Turvalaitevika</div>
    </div>
  );
}

export default TrainItem;
