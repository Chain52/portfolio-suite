# Portfolio - Frontend
A lightweight **React + Tailwind portfolio site** showcasing my work, architectural breakdowns, and demos as they are completed. Deployed in a production-ready container on AWS.

## Overview
This is the main frontend of my portfolio. It provides an overview of who I am, how I build software, and links to contact me. As my demos and side projects reach completion, they will be integrated directly here.

- **Audience:** Hiring managers and contractors
- **Purpose:** Professional portfolio website, serving as the entry point to other projects in this mono-repo
- **Live site:** [colinhain.com](https://colinhain.com)

## Tech Stack
- **React + React Router** – routing and component structure
- **TailwindCSS** – responsive, mobile-first design
- **TypeScript** – static typing and maintainability
- **React Markdown** – content rendering
- **React Calendly** – simple scheduling integration
- **Docker** – containerized deployment on AWS Fargate

## Architecture & Design Notes
- **Mobile-first** responsive design
- **Dockerized deployment** for scalability on AWS
- **Markdown-driven content** via React Markdown (currently requires redeploy for updates, but future-ready for S3 integration)

## Features
- Overview of skills, architecture breakdowns, and project demos
- Contact integration via Calendly
- Modular component structure for future upgrades
- Publicly deployed, production-ready foundation

## Usage  
To run locally, you must have Yarn installed and do the following:

```bash
# Clone the repo
git clone https://github.com/Chain52/portfolio-suite.git

# Move into the root package
cd portfolio-suite

# Install dependencies
yarn install

# Start the dev server
yarn workspace @portfolio/client dev
```

## Roadmap  
- **Short term:**  
  - Integrate Sudoku demo once backend/frontend are complete
  - Refactor to use shared UI library
  - Migrate Markdown content to S3 for quick updates
- **Medium term:**  
  - Add testing and upgrade CI/CD pipeline
  - Improve accessibility (e.g., visuals for architecture breakdowns, better content semantics)
- **Long term:**
  - Enhance visuals with tasteful animations or polish
  - Optional blog section for long-form content

## Known Limitations
-   Markdown content is hardcoded (redeployment required for edits)
-   Minimal design "flair" (intentionally kept clean and professional)

## Author & Context  
- **Author:** Colin Hain - Sole Developer
- **Context:** Main app of my portfolio mono-repo  
- **Focus:**  
  - **React + React Router** skills
  - Clean project **organization and modularity**
  - Ability to **deploy** production-ready React apps with **containerization**

## License  
This package is covered under the MIT License at the root of the `portfolio-suite` repository. 
