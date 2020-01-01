import React from 'react';

function SVG_symbol_expand(props) {
  const expandSymbol = (
    <g fill-opacity="1" stroke="#00cc00">
      <circle cx="50" cy="50" r="45" stroke-width="5" />
      <path d="M33    25.5   L75.5   25.5    L75.5   67  Z" stroke-width="0" />
      <path d="M25.5  33     L25.5   75.5    L67   75.5  Z" stroke-width="0" />
    </g>
  );

  const unExpandSymbol = (
    <g fill-opacity="1" stroke="#00cc00">
  		<circle cx="50" cy="50" r="45" stroke-width="5"/>
      <path d="M33    25.5   L75.5   25.5    L75.5   67  Z" stroke-width="0" transform="rotate(180, 61.33, 39.33)" />
      <path d="M25.5  33     L25.5   75.5    L67   75.5  Z" stroke-width="0" transform="rotate(180, 39.33, 61.33)" />
    </g>
  );

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="SVG_symbol_expand">
      {props.expanded ? unExpandSymbol : expandSymbol}
    </svg>
  );
}

export default SVG_symbol_expand;
