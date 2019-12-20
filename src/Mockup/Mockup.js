import React from 'react';
import "./Mockup.scss";

const Mockup = () => {
  return (
    <div class="wrapper">
      <header>
        <h1 class="pageTitle">VR-tracking-tool</h1>
      </header>
      <main>
        <div class="view-selector section">
          <span class="label">View:</span>
          <span class="view_option">Train</span>
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
          </div>
          <div class="stations">
            <div class="station passed">
              <span class="station_name">Joensuu</span>
              <span class="departure_time">10:14:00</span>
              <span class="actual_departure_time">→ 10:15:31</span>
              <span class="late">[+1:31]</span>
            </div>
            <div class="station passed">
              <span class="station_name">Kittilä</span>
              <span class="departure_time">10:20:00</span>
              <span class="estimated_departure_time">→ ~10:22:13</span>
              <span class="late">[+2:13]</span>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <span class="copyright">Janne Salokoski &copy; 2019</span>
      </footer>
    </div>
  );
};

export default Mockup;
