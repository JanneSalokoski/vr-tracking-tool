import React from 'react';
import Button from "./Button.js";

import SVG_symbol_expand from "../../SVG/symbol_expand.js";

import "./Buttons.scss";

function CloseButton (props) {
  return (
    <Button className="expand" onClick={props.callback}>
      <SVG_symbol_expand />
    </Button>
  );
}

export default CloseButton;
