import React from 'react';
import Button from "./Button.js";

import SVG_symbol_close from "../../SVG/symbol_close.js";

import "./Buttons.scss";

function CloseButton (props) {
  return (
    <Button className="close" onClick={props.callback}>
      <SVG_symbol_close />
    </Button>
  );
}

export default CloseButton;
