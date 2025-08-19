import React from 'react';

import ControlButton from './ControlButton';

interface NumberButtonProps {
  value: number;
}

export default function NumberButton({ value }: NumberButtonProps) {
  return <ControlButton>{value}</ControlButton>;
}
