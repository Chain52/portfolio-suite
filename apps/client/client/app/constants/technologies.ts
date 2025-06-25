import { type ReactNode } from 'react';
import LWCicon from '~/components/icon/LWCicon';
import MotionIcon from '~/components/icon/MotionIcon';

export type Technology = {
  icon: string | { light: string; dark: string } | (() => ReactNode);
  name: string;
};

export const Technologies = Object.freeze({
  React: {
    icon: 'vscode-icons:file-type-reactts',
    name: 'React'
  },
  TypeScript: {
    icon: 'vscode-icons:file-type-typescript-official',
    name: 'TypeScript'
  },
  MobX: {
    icon: 'logos:mobx',
    name: 'MobX'
  },
  Zod: {
    icon: 'logos:zod',
    name: 'Zod'
  },
  Sanity: {
    icon: 'devicon:sanity',
    name: 'Sanity'
  },
  ReactRouter: {
    icon: {
      light: 'vscode-icons:file-type-light-reactrouter',
      dark: 'vscode-icons:file-type-reactrouter'
    },
    name: 'React Router'
  },
  Motion: {
    icon: MotionIcon,
    name: 'Motion'
  },
  Node: {
    icon: 'logos:nodejs-icon',
    name: 'Node.js'
  },
  Express: {
    icon: {
      light: 'devicon:express',
      dark: 'simple-icons:express'
    },
    name: 'Express.js'
  },
  Fargate: {
    icon: 'logos:aws-fargate',
    name: 'AWS Fargate'
  },
  S3: {
    icon: 'logos:aws-s3',
    name: 'AWS S3'
  },
  Lambda: {
    icon: 'logos:aws-lambda',
    name: 'AWS Lambda'
  },
  CodePipeline: {
    icon: 'logos:aws-codepipeline',
    name: 'AWS CodePipeline'
  },
  CodeBuild: {
    icon: 'logos:aws-codebuild',
    name: 'AWS CodeBuild'
  },
  Docker: {
    icon: 'logos:docker-icon',
    name: 'Docker'
  },
  Tailwind: {
    icon: 'devicon:tailwindcss',
    name: 'TailwindCSS'
  },
  Salesforce: {
    icon: 'logos:salesforce',
    name: 'Salesforce'
  },
  LWC: {
    icon: LWCicon,
    name: 'Lightning Web Components'
  },
  Selenium: {
    icon: 'logos:selenium',
    name: 'Selenium'
  },
  Mongoose: {
    icon: 'devicon:mongoose',
    name: 'Mongoose'
  },
  MongoDB: {
    icon: 'logos:mongodb-icon',
    name: 'MongoDB'
  },
  Twilio: {
    icon: 'logos:twilio-icon',
    name: 'Twilio'
  },
  Figma: {
    icon: 'logos:figma',
    name: 'Figma'
  },
  GitHub: {
    icon: {
      light: 'simple-icons:github',
      dark: 'logos:github'
    },
    name: 'GitHub'
  }
});
export type Technologies = Record<keyof typeof Technologies, Technology>;
