import { Technologies } from './technologies';

export const ProjectDetails = Object.freeze({
  featured: {
    id: 'knowledgeBase',
    title: 'Internal Knowledge Base Platform',
    technologies: [
      Technologies.React,
      Technologies.TypeScript,
      Technologies.Tailwind,
      Technologies.ReactRouter,
      Technologies.Motion,
      Technologies.MobX,
      Technologies.Zod,
      Technologies.Sanity,
      Technologies.Docker,
      Technologies.Fargate,
      Technologies.S3,
      Technologies.CodePipeline,
      Technologies.CodeBuild
    ],
    summary:
      'Led the development of a modernized replacement system for a legacy internal knowledge base, which was gaining widespread disregard and discontent from the over 200 employees. This initiative delivered significant improvements to content delivery through a robust frontend architecture designed to address the three major concerns of users—lack of visibility, lack of searchability, and lack of accessibility—and maximize publishing efficiency through a personalized CMS platform.',
    details: `
As an independent developer, I assumed full ownership of the product—from architectural design to deployment techniques and strategies. I mentored a developing UX designer in foundational design principles and collaborated closely on Figma prototypes, prioritizing user accessibility needs for stakeholder approval.

Given the project's rapid delivery requirement, my architectural approach for the platform's frontend focused on flexibility and familiarity—utilizing my React and TypeScript experience, I established a strong, type-safe foundation, ensuring long-term maintainability. I developed a responsive UI using Tailwind CSS to allow users to interact with the app according to their preferences. For a flexible, quickly iterable reactive state, I decided on MobX. To handle the heavy API dependency of a headless CMS and the desire for curated department-based content, I implemented Zod for its TypeScript-first schema declaration and validation. Zod's convenient runtime data manipulation bridged the gaps between content management and delivery.

The second half of this project involved designing and implementing a Sanity CMS studio. I proposed and campaigned for Sanity as our CMS, as its unrivaled customizability was essential to handle hard-coded and non-traditionally structured content found in the legacy system. I took full advantage of this customizability to develop clear workflows and content models that simplified complex editorial processes and eliminated manual coding, resulting in a reduction of at least 75% in content publishing time.

The platforms were containerized with Docker and deployed to AWS Fargate with AWS CodePipeline and CodeBuild serving as the primary CI/CD automation tools. While these deployment techniques were part of the company's standard serverless deployment strategy, I further adapted this pattern to engineer a multi-environment strategy, leveraging custom load-balancing rules, enabling the hosting of both the studio and the head in the same service as separate containers.
      `,
    reception:
      'This platform delivered significant, measurable impact. Content managers experienced an estimated 90% increase in overall publishing efficiency through the elimination of manual coding and the implementation of standardized design principles. Furthermore, user adoption surged dramatically by an estimated hundredfold due to curated departmental content delivery, the much-anticipated searchability capabilities, and its intuitive, user-friendly design—key complaints that led to the widespread disregard of the legacy system.'
  },
  others: [
    {
      id: 'notificationService',
      title: 'Notification Microservice',
      technologies: [
        Technologies.Node,
        Technologies.Express,
        Technologies.Lambda,
        Technologies.MongoDB,
        Technologies.Mongoose,
        Technologies.Twilio,
        Technologies.Figma
      ],
      summary:
        'This notification microservice doubles as my first enterprise development opportunity and a crucial learning step that I build upon today. While continuing my role as a Project Manager and Technical Support Specialist, I took on the responsibility of creating a foundational notification microservice within a larger serverless application. I designed and implemented its event-driven API with AWS Lambda and a MongoDB/Mongoose data access layer, while simultaneously acting as a crucial bridge between user needs, sales objectives, and the technical team.',
      details: `
My architecture of the messaging service was derived from an intensive study of core systems developed by other team members. Following their inspiration, I integrated Twilio for dynamic, personalized email and SMS delivery, as well as configured flexible message templates and deployed each notification operation as an isolated AWS Lambda function for fine-grained observability, independent scalability, and maintainability. I charted event flows and documented handler triggers to support future integration needs of the event-driven architecture.

Beyond the notification microservice, I served as a technical liaison, translating complex user pain points and sales targets into actionable design adjustments. I prototyped initial UX designs in Figma for demonstrations in sales pitches and focus groups, and improved upon them based on direct client feedback. This attention to user needs and demonstration of business acumen in the design phase directly addressed the industry's needs, helping to secure mobility-based tech contracts for the company.
      `,
      reception:
        "Despite the development of the application being ceased due to funding reallocation, the notification microservice I built was functionally complete and demonstrated technical viability in personal testing. My mediary position in the project enabled me to work directly with user feedback and sales requirements in the UX design. My product demonstrations, combined with my in-depth knowledge of the platform, played a crucial role in securing mobility-based tech contracts. This opportunity was a pivotal learning experience that profoundly underscored the critical importance of meticulous code organization, robust testing beyond basic functionality, and clear architectural communication—lessons I rigorously apply to all development I've done since."
    },
    {
      id: 'salesforceDev',
      title: 'Salesforce Tooling/Optimization',
      technologies: [Technologies.Salesforce, Technologies.LWC],
      summary:
        "Modernized and architecturally overhauled a 'nightmare' legacy Salesforce platform into a maintainable, resilient, and developer-friendly environment. This upgrade involved architecting and implementing modular design patterns within a Test-Driven Development (TDD) framework and paved the way for essential operational tooling that drastically improved system stability and developer efficiency.",
      details: `
Faced with a severely neglected and poorly designed Salesforce environment, referred to as the 'nightmare environment' within the development team, I conducted a comprehensive diagnosis that led to the decision that a total refactor was necessary to establish best practices and ensure long-term maintainability.

Inspired by advanced Apex development principles in James Simone's '[Joys of Apex](https://www.jamessimone.net/blog/joys-of-apex)', I designed and implemented a robust TDD framework across the entire codebase and introduced modular patterns, such as factories, repositories, and dependency injection, to replace the unstable legacy code with reusable and highly testable components. With this foundation in a quality, resilient system laid, I developed reusable constructs for commonly used Salesforce modules, most notably a streamlined batch job and trigger handler framework, which drastically simplified development and increased maintainability.

Beyond the core refactor, I developed a Lightning Web Component (LWC) mass transfer tool to grant transaction autonomy to supervisors. This user-friendly application empowered supervisors to independently draft, preview, and execute large-scale ownership transfers without any technical support intervention. The tool included real-time metrics and robust rollback capabilities, fundamentally improving data integrity, user trust, and operational efficiency within the Salesforce ecosystem.
      `,
      reception:
        "The Salesforce environment was transformed from an internal bottleneck, the 'nightmare environment', into a flexible, resilient, and highly testable platform. The newfound access to rapid and confident deployment of new features, along with improved developer velocity, significantly reduced technical debt. Finally, the implemented mass transfer tool specifically eliminated dozens of hours of manual support intervention monthly, directly empowering supervisors and enhancing operational autonomy across the organization."
    }
  ]
});
