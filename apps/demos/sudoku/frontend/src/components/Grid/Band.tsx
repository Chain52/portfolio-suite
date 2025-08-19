import React from 'react';
import Block from './Block';
import { Flex } from '@portfolio/ui';

interface BandProps {}

export default function Band({}: BandProps) {
  const blocks = ['block1', 'block2', 'block3']; // TODO: determine where blocks will come from
  return (
    <div className="grid grid-flow-row col-auto">
      {blocks.map((block) => (
        <Block />
      ))}
    </div>
  );
}
