// Adapted from https://containersonaws.com/pattern/api-gateway-fargate-cloudformation

import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

import { ClientProps } from "~/constants";
import { APIGateway, Cluster, Service, VPC } from "./constructs";

export default class ClientStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new VPC(this, "VPC");
    const cluster = new Cluster(this, "Cluster", { VPC: vpc.VPCinstance });
    const service = new Service(this, "FargateService", {
      Cluster: cluster.ClusterInstance,
      Namespace: cluster.Namespace,
      TaskExecutionRole: cluster.TaskExecutionRole,
      VPC: vpc.VPCinstance,
    });
    new APIGateway(this, "APIGateway", {
      LogGroup: service.LogGroup,
      ServiceDiscoveryService: service.FargateService.cloudMapService,
      ServiceSecurityGroup: service.SecurityGroup,
      VPC: vpc.VPCinstance,
    });
  }
}
