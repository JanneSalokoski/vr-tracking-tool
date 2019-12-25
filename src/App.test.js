import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import VrTrackingTool from './VrTrackingTool';

test('Renders VrTrackingTool', () => {
  const div = document.createElement('div');
  render(<VrTrackingTool />, div);
});
