import React from 'react';
import Button from "./Button.js";

import SVG_symbol_minify from "../../SVG/symbol_minify.js";

import "./Buttons.scss";

function CloseButton (props) {
  return (
    <Button className="minify" onClick={props.callback}>
      <SVG_symbol_minify />
    </Button>
  );
}

export default CloseButton;
