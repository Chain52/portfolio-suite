# Portfolio Infrastructure (AWS CDK)

This repository contains the AWS CDK codebase for deploying and managing the cloud infrastructure behind my personal portfolio website. The architecture follows a container-based deployment model using API Gateway, ECS Fargate, and a VPC.

---

## Overview

The stack provisions the following AWS resources:

- **VPC** – A new virtual private cloud with public subnets
- **ECS Cluster** – Container orchestration for running application tasks
- **Fargate Service** – Serverless compute to run the portfolio website container
- **API Gateway** – Acts as the public entry point to route HTTP traffic to the Fargate service

This implementation is based on the pattern described in [Containers on AWS – API Gateway + Fargate](https://containersonaws.com/pattern/api-gateway-fargate-cloudformation).

---

## Project Structure (YAML Format)

```yaml
src/
  constants/
    ClientProps.ts           # Consolidated set of properties for the Client
  stacks/
    ClientStack/             
      constructs/
        APIGateway/          # API Gateway integration
        Cluster/             # ECS Cluster definition
        Service/             # Fargate service configuration
        VPC/                 # VPC setup
      index.ts               # Client infrastructure
  index.ts                   # CDK app entry point
```

---

## Status

Initial deployment is functional, but several issues remain:

- **Overprovisioned**: ClientStack created more resources than expected
- **Naming**: Inconsistent naming is used throughout the resources
- **CI/CD**: Lack of CodePipeline implementation is not ideal

---

## Planned Improvements

- **Refactor Stacks**: Reduce unnecessary resource creation, apply consistent naming conventions, and separate infrastructure into multiple stacks (each construct should be a stack - combining `Cluster` and `Service`)
- **Debug Logical ID Output**: Align stack outputs with actual resource naming for better tracking and maintenance
- **Implement CI/CD**: Integrate AWS CodePipeline to streamline future deployments
- **IAM Review**: Audit created roles and permissions to ensure least-privilege principles

---

## Deployment

> 🛑 This project is under active revision. Deploying may have unintended consequences. 

### Prerequisites

- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) configured with deploy credentials
- [Node.js](https://nodejs.org/en/download/)
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) installed globally

### Deploy

> ⚠️ The Fargate service expects a container image hosted in AWS ECR. The image must be uploaded manually before running the CDK deployment.

```bash
docker build -t portfolio-client .
docker tag portfolio-client:latest <your-account-id>.dkr.ecr.<region>.amazonaws.com/portfolio-client:latest
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.<region>.amazonaws.com
docker push <your-account-id>.dkr.ecr.<region>.amazonaws.com/portfolio-client:latest


npm install
cdk bootstrap
cdk deploy
```
