import React from 'react';

import { Flex } from '../element';
import { JumpLink } from '../navigation';

export default function About() {
  return (
    <Flex
      as="section"
      id="about"
      direction="col"
      align="center"
      className="scroll-mt-24 gap-4 text-justify"
    >
      <Flex
        direction="col"
        align="center"
        justify="center"
        className="min-h-32 gap-2"
      >
        <h1 className="text-4xl font-bold">Hi, I'm Colin Hain</h1>
        <h3 className="text-3xl font-medium">A Full-Stack Developer</h3>
      </Flex>
      <Flex direction="col" className="max-w-prose gap-4 text-lg/relaxed">
        <p>
          Experienced in building scalable, cloud-native applications and
          internal tools with React, TypeScript, Node.js, and AWS. My background
          in development-adjacent roles has led me to specialize in transforming
          complex challenges into maintainable, modern architectures and
          high-impact solutions from a unique perspective. I prioritize
          developer experience, system performance, and clear design,
          consistently delivering resilient platforms that replace brittle
          legacy systems and streamline critical workflows. Explore my work
          below to see how I architect, develop, and optimize enterprise
          systems.
        </p>
      </Flex>
      <Flex
        direction={{ base: 'col', sm: 'row' }}
        justify="center"
        align="center"
        className="w-full gap-2 px-8 sm:gap-4"
      >
        <JumpLink
          anchor="contact"
          name="Let's Work Together"
          variant="cta"
          className="w-full max-w-64 font-medium"
        />
        <JumpLink
          anchor="projects"
          name="Browse Projects"
          variant="cta"
          className="w-full max-w-64 font-medium"
        />
      </Flex>
    </Flex>
  );
}
