import React from 'react';
import Button from "./Button.js";

import SVG_symbol_contextMenu from "../../SVG/symbol_contextMenu.js";

import "./Buttons.scss";

function ContextMenuButton (props) {
  return (
    <Button className="contextMenuButton" onClick={props.callback}>
      <SVG_symbol_contextMenu />
    </Button>
  );
}

export default ContextMenuButton;
