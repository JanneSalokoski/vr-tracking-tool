import React from 'react';
import "./Header.scss";

const Header = (props) => {
  return (
    <div className="module header">
      <h1 className="application-title">VR Tracking Tool <span className="version">[1.0.0]</span></h1>
      <nav>
        <span className="nav-item current"><a href="trains">Trains</a></span>
        <span className="nav-item"><a href="stations">Stations</a></span>
        <span className="nav-item"><a href="stations">About</a></span>
        <span className="nav-item"><a href="stations">News</a></span>
      </nav>
      <div className="description">
        <h2>What is it</h2>
        <p>VR Tracking Tool is a simple...</p>
      </div>
    </div>
  );
}

export default Header;
