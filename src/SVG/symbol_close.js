import React from 'react';

function SVG_symbol_close() {
  return(
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="SVG_symbol_close">
      <g fill-opacity="1" stroke-linecap="round">
    		<circle cx="50" cy="50" r="45" stroke-width="5"/>
        <line x1="33" y1="33" x2="67" y2="67" stroke-width="15" />
    		<line x1="33" y1="67" x2="67" y2="33" stroke-width="15"/>
      </g>
    </svg>
  );
}

export default SVG_symbol_close;
