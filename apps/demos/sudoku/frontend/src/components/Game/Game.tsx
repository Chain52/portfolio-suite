import React from 'react';
import { Grid } from '../Grid';
import Controls from '../Controls';
import { Flex } from '@portfolio/ui';

export default function Game() {
  return (
    <Flex direction={{ base: 'row', md: 'col' }}>
      <Grid />
      <Controls />
    </Flex>
  );
}
