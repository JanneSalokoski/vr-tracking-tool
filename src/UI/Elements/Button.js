import React, {useContext} from 'react';
import "./Buttons.scss";

function Button (props) {
  return (
    <button
      className={props.className}
      disabled={props.disabled}
      onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
