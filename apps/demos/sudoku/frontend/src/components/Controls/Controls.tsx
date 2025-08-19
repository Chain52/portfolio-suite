import React from 'react';

import ControlPad from './ControlPad';

interface ControlsProps {
  largeViewport?: boolean;
}

const ControlBar = () => <div>ControlBar</div>;

export default function Controls({ largeViewport }: ControlsProps) {
  return largeViewport ? <ControlPad /> : <ControlBar />;
}
