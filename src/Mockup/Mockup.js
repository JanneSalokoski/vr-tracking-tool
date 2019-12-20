import React from 'react';
import "./Mockup.scss";

require('typeface-courier-prime');
require('typeface-source-code-pro');

const Mockup = () => {
  return (
    <div class="wrapper">
      <header>
        <h1 class="pageTitle">VR-tracking-tool</h1>
      </header>
      <main>
        <div class="view_selector section">
          <span class="label">View:</span>
          <span class="view_option selected">Train</span>
          <span>|</span>
          <span class="view_option">Station</span>
        </div>
        <div class="settings section">
          <div class="train_view_settings">
            <label for="select_train">Train:</label>
            <input type="text" id="select_train" defaultValue="IC12"></input>
          </div>
        </div>
        <div class="view section">
          <div class="info">
            <span class="label">From:</span>
            <span class="from"><a href="#">Joensuu</a></span>
            <span class="label">To:</span>
            <span class="from"><a href="#">Helsinki</a></span>
            <span class="label">| Status:</span>
            <span class="status">Moving</span>
            <span class="late">[+2:13]</span>
          </div>
          <br />
          <div class="stations">
            <div class="station headers">
              <span class="station_name">STATION</span>
              <span class="departure_time">T.TIME</span>
              <span class="actual_departure_time">R.TIME</span>
              <span class="late">DIFF</span>
            </div>
            <div class="station passed">
              <span class="station_name">Joensuu</span>
              <span class="departure_time">10:14:00</span>
              <span class="actual_departure_time">→ 10:15:31</span>
              <span class="late">[+1:31]</span>
            </div>
            <div class="station current">
              <span class="station_name">Kittilä</span>
              <span class="departure_time">10:20:00</span>
              <span class="actual_departure_time">→ 10:22:13</span>
              <span class="late">[+2:13]</span>
            </div>
            <div class="station coming">
              <span class="station_name">Helsinki</span>
              <span class="departure_time">10:40:00</span>
              <span class="estimated_departure_time">→ ~10:44:27</span>
              <span class="late">[+4:27]</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Mockup;
