import React, {useState, useContext} from 'react';
import "./Autocomplete.scss";

import { store } from '../../../store.js';

function AutocompleteItem (props) {
  const applicationState = useContext(store);
  const {state, dispatch} = applicationState;

  return (
    <li className="AutocompleteItem"
    key={props.trainName} id={props.item.trainName}>
      <span className="trainName">{props.item.trainName}:</span>
      <span className="from">{state.stationInfo[props.item.firstStation].stationName}</span>
      <span className="separator">→</span>
      <span className="to">{state.stationInfo[props.item.lastStation].stationName}</span>
    </li>
  );
}

function Autocomplete (props) {
  const applicationState = useContext(store);
  const {state, dispatch} = applicationState;

  const getAutocompleteItems = items =>
    items.map(item => (<AutocompleteItem item={item} />));

  return (
    <div className="Autocomplete">
      {
        state.trainSearch ? (
          <ol className="AutocompleteItems">
            {props.items ? getAutocompleteItems([...new Set(props.items)].slice(0, 20)) : undefined}
          </ol>
        ) : undefined
      }
    </div>
  );
}

export default Autocomplete;
