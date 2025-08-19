# Sudoku - Backend

A **serverless API layer** for the Sudoku - Frontend package, providing puzzle generation, solving, and hinting through AWS Lambda + API Gateway. Built to showcase modern **serverless design**, **TDD**, **DDD**, and constraint-based problem solving.

## Overview
Sudoku - Backend is the **API layer** of a Sudoku game demo featured in my portfolio. It demonstrates serverless architecture, domain-driven design, and advanced testing practices. While currently a **work-in-progress**, the project lays the foundation for a robust Sudoku engine capable of generating puzzles based on solving techniques rather than cell count.

- **Problem it solves:** Supplies Sudoku puzzles and solving logic via API endpoints.
- **Why it exists:** Created as a **portfolio demo** to highlight backend engineering depth, especially in serverless API design and constraint programming.
- **Audience:** Hiring managers, engineers, and developers evaluating technical ability.

## Tech Stack
- **Serverless Framework** – infrastructure-as-code deployment
- **AWS Lambda + API Gateway** – serverless compute + endpoints
- **Express** – routing layer
- **TypeScript** – type safety & maintainability
- **Zod** – request validation
- **Jest + Supertest** – TDD and integration testing

## Architecture Highlights
- **TDD-first workflow:** Comprehensive unit and integration test suite, built with Jest and Supertest.
- **DDD-inspired design:** Service-oriented architecture for puzzle generation and solving logic.
- **Serverless-first approach:** Modular Lambda handlers designed for scalability.
- **Constraint-based solver:** Custom solver designed to solve by difficulty of techniques used.

## Features (Planned & Partial)
 - [x] Reusable serverless Express app
 - [x] Request validation middleware with Zod
 - [x] Beginner-level solver implementation
 - [ ] Finish create game endpoint + handler
	 - [x] Routing
	 - [x] Validation
	 - [ ] Puzzle Generation
 - [ ] CI/CD deployment pipeline
 - [ ] Intermediate to Expert-level solvers

## Usage
_Not currently usable – backend endpoints are still under development._

## Roadmap  
- **Short term (MVP):**  
  - Finish upgrading solver to handle beginner-level puzzle generation.
  - Set up CI/CD deployment pipeline.
- **Medium term:**  
  - Add get hint and get solution endpoints
  - Improve test coverage and automated validation.
- **Long term:**
  - Expand solver with higher-level Sudoku techniques.  
  - Optimize constraint solver performance with smarter caching/revalidation.  
- **Out of scope (currently):**  
  - Variant Sudoku types (killer cages, fog Sudoku, etc.).  

## Author & Context  
- **Author:** Colin Hain - Sole Developer
- **Context:** Part of the larger portfolio mono-repo, paired with the Sudoku - Frontend package.  
- **Focus:**  
  - **TDD discipline** with full test coverage.  
  - **Serverless architecture** with AWS Lambda and Serverless Framework.  
  - **DDD and service-oriented design.**  
  - **Constraint programming** approach to Sudoku solving.  

## License  
This package is covered under the MIT License at the root of the `portfolio-suite` repository. 
