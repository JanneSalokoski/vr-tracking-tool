import React, {useContext} from 'react';
import "./Header.scss";

import {store} from "../../../store.js";


const Header = (props) => {
  const applicationState = useContext(store);
  const {state, dispatch} = applicationState;

  return (
    <div className="module header">
      <h1 className="application-title">VR Tracking Tool <span className="version">{`[${state.meta.majorVersion}.${state.meta.minorVersion} ${state.meta.releaseType}]`}</span></h1>
      <nav>
        <span className="nav-item current"><a href="trains">Trains</a></span>
        <span className="nav-item"><a href="stations">Stations</a></span>
        <span className="nav-item"><a href="stations">About</a></span>
        <span className="nav-item"><a href="stations">News</a></span>
      </nav>
      <div className="description">
        <h2></h2>
      </div>
    </div>
  );
}

export default Header;
