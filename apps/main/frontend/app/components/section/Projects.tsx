import React from 'react';
import { Icon } from '@iconify/react';

import { Flex } from '../element';
import { ProjectDetails, Technologies, type Technology } from '~/constants';
import Markdown from 'react-markdown';

interface ProjectCardProps {
  id: string;
  title: string;
  technologies: Technology[];
  summary: string;
  details: string;
  reception: string;
  className?: string;
}

const ProjectCard = ({
  id,
  title,
  technologies,
  summary,
  details,
  reception,
  className
}: ProjectCardProps) => {
  return (
    <Flex direction="col" className={className}>
      <Flex direction="col" className="rounded-lg border shadow">
        <Flex justify="center" align="baseline" className="border-b px-2 py-3">
          <h3 className="text-center text-3xl font-semibold">{title}</h3>
        </Flex>
        <Flex className="p-2">
          <Flex grow direction="col">
            <Flex direction="col" className="gap-2 border-b">
              <h4 className="text-lg font-medium">Technologies</h4>
              <Flex wrap justify="evenly" className="gap-4 px-4">
                {technologies.map((technology) => (
                  <Flex
                    key={`${technology.name.replaceAll(/[\s\.]/g, '')}-${id}`}
                    direction="col"
                    align="center"
                    className="w-30 overflow-visible"
                  >
                    {typeof technology.icon === 'function' && technology.icon()}
                    {typeof technology.icon !== 'function' && (
                      <Icon
                        icon={
                          typeof technology.icon === 'string'
                            ? technology.icon
                            : technology.icon.light
                        }
                        className="text-5xl"
                      />
                    )}
                    <span className="max-w-36 text-center text-lg text-wrap">
                      {technology.name}
                    </span>
                  </Flex>
                ))}
              </Flex>
            </Flex>
            <Flex className="p-2">
              <Flex direction="col" className="gap-4">
                <Flex direction="col">
                  <h4 className="text-sm font-bold text-gray-600">SUMMARY</h4>
                  <Flex className="px-2">
                    <p>{summary}</p>
                  </Flex>
                </Flex>
                <Flex direction="col">
                  <h4 className="text-sm font-bold text-gray-600">DETAILS</h4>
                  <Flex direction="col" className="gap-3 px-2">
                    <Markdown
                      components={{
                        a(props) {
                          return (
                            <a
                              className="text-blue-600 hover:text-blue-700 hover:underline"
                              {...props}
                            />
                          );
                        }
                      }}
                    >
                      {details}
                    </Markdown>
                  </Flex>
                </Flex>
                <Flex direction="col">
                  <h4 className="text-sm font-bold text-gray-600">RECEPTION</h4>
                  <Flex className="px-2">
                    <p>{reception}</p>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default function Projects() {
  return (
    <Flex as="section" id="projects" direction="col" className="scroll-mt-24">
      <h2 className="mb-4 text-3xl font-bold">Projects</h2>
      <Flex direction="col" className="gap-4 sm:mx-8">
        <ProjectCard {...ProjectDetails.featured} className="" />
        <Flex direction={{ base: 'col', lg: 'row' }} className="gap-4">
          {ProjectDetails.others.map((project) => (
            <ProjectCard key={project.id} {...project} className="sm:flex-1" />
          ))}
        </Flex>
        <Flex direction="col" className="gap-3">
          <p className="italic">
            Note: These project overviews describe proprietary systems I
            contributed to in professional settings. Their source code is not
            publicly available.
          </p>
          <p className="inline">
            You can explore older and experimental public projects on my{' '}
            <a
              href="https://github.com/Chain52"
              target="_blank"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              GitHub
              <Icon icon="mdi:external-link" className="mb-3 inline text-sm" />
            </a>
            .
          </p>
        </Flex>
      </Flex>
    </Flex>
  );
}
