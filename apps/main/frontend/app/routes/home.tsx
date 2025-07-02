import React from 'react';

import type { Route } from './+types/home';

import { Projects, Flex, About, Contact } from '~/components';

export default function Home() {
  return (
    <Flex as="main" grow justify="center">
      <Flex direction="col" grow className="max-w-7xl gap-24 px-8 py-24">
        <About />
        <Projects />
        <Contact />
      </Flex>
    </Flex>
  );
}
