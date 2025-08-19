import React from 'react';

import { ControlButton, NumberButton } from './ControlElements';
import { Flex } from '@portfolio/ui';

const NumberPad = () => (
  <Flex direction="col" grow className="gap-1">
    <Flex align="center" className="gap-1">
      <NumberButton value={7} />
      <NumberButton value={8} />
      <NumberButton value={9} />
      <ControlButton>
        <Flex grow className="p-2 aspect-square">
          <Flex
            grow
            align="center"
            justify="center"
            className="border border-primary"
          >
            <span className="text-5xl">9</span>
          </Flex>
        </Flex>
      </ControlButton>
    </Flex>
    <Flex align="center" className="gap-1">
      <NumberButton value={4} />
      <NumberButton value={5} />
      <NumberButton value={6} />
      <ControlButton>
        <Flex grow className="p-2 aspect-square">
          <Flex
            grow
            direction="col"
            className="border border-primary text-sm px-1"
          >
            <Flex grow justify="between">
              <span>1</span>
              <span>2</span>
            </Flex>
            <Flex grow justify="between" align="end">
              <span>3</span>
              <span>4</span>
            </Flex>
          </Flex>
        </Flex>
      </ControlButton>
    </Flex>
    <Flex align="center" className="gap-1">
      <NumberButton value={1} />
      <NumberButton value={2} />
      <NumberButton value={3} />
      <ControlButton>
        <Flex grow className="p-2 aspect-square">
          <Flex
            grow
            align="center"
            justify="center"
            className="border border-primary text-sm"
          >
            <span>1</span>
            <span>2</span>
          </Flex>
        </Flex>
      </ControlButton>
    </Flex>
  </Flex>
);

export default function ControlPad() {
  return (
    <Flex direction="col" flex={1} className="gap-1">
      <Flex className="gap-1">
        <ControlButton icon="material-symbols:settings-rounded" />
        <ControlButton icon="material-symbols:lightbulb-2-outline-rounded" />
        <ControlButton icon="material-symbols:switch-access-rounded" />
      </Flex>
      <Flex className="gap-1">
        <NumberPad />
      </Flex>
      <Flex className="gap-1">
        <ControlButton icon="material-symbols:undo-rounded" />
        <NumberButton value={0} />
        <ControlButton icon="material-symbols:redo-rounded" />
      </Flex>
    </Flex>
  );
}
