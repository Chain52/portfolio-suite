import React from 'react';

import { Flex } from '../element';
import JumpLink from './JumpLink';
import { Icon } from '@iconify/react/dist/iconify.js';

const NavItems = () => {
  return (
    <Flex
      grow
      justify="between"
      align="center"
      className="relative mx-auto max-w-7xl px-4 py-3"
    >
      <Flex className="left-0 sm:absolute">
        <JumpLink
          anchor="about"
          name="Colin Hain"
          textBreakpoint="sm"
          className="text-xl font-bold"
        >
          <img src="/favicon-32x32.png" className="h-8 w-8" />
        </JumpLink>
      </Flex>
      <Flex grow justify="center" className="mt-1">
        <JumpLink anchor="about" name="About" className="text-lg" />
        <JumpLink anchor="projects" name="Projects" className="text-lg" />
        <JumpLink anchor="contact" name="Contact" className="text-lg" />
      </Flex>
      <Flex className="right-0 gap-1 sm:absolute">
        <a href="mailto:colinphain@gamil.com" title="Email Me">
          <Icon
            icon="mdi:email-outline"
            className="text-3xl text-[#4444bb] hover:text-blue-900"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/colin-hain"
          target="_blank"
          title="Connect on LinkedIn"
        >
          <Icon
            icon="mdi:linkedin"
            className="text-3xl text-[#4444bb] hover:text-blue-900"
          />
        </a>
      </Flex>
    </Flex>
  );
};

export default function Navbar() {
  return (
    <Flex as="nav" id="top" className="fixed top-0 z-10 w-full bg-white shadow">
      <NavItems />
    </Flex>
  );
}
