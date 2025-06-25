// From: https://containersonaws.com/pattern/api-gateway-fargate-cloudformation

import { Stack } from "aws-cdk-lib";
import { Vpc } from "aws-cdk-lib/aws-ec2";
import { Cluster, ContainerInsights } from "aws-cdk-lib/aws-ecs";
import {
  IRole,
  ManagedPolicy,
  PolicyDocument,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam";
import {
  INamespace,
  PrivateDnsNamespace,
} from "aws-cdk-lib/aws-servicediscovery";
import { Construct } from "constructs";

import { ClientProps } from "~/constants";

interface ClusterConstructProps {
  VPC: Vpc;
}

export default class ClusterConstruct extends Construct {
  private _cluster: Cluster;
  private _executionRole: IRole;
  private _namespace: INamespace;

  constructor(scope: Stack, id: string, props: ClusterConstructProps) {
    super(scope, id);

    this._cluster = new Cluster(this, id, {
      containerInsightsV2: ContainerInsights.ENABLED,
    });

    this._executionRole = new Role(this, "ECSTaskExecutionRole", {
      assumedBy: new ServicePrincipal("ecs-tasks.amazonaws.com"),
      path: "/",
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AmazonECSTaskExecutionRolePolicy"
        ),
      ],
      inlinePolicies: {
        AssumeRole: new PolicyDocument({
          statements: [
            new PolicyStatement({
              actions: ["sts:AssumeRole"],
              resources: ["*"],
              conditions: {
                ArnLike: {
                  "aws:SourceArn": `arn:aws:ecs:${ClientProps.Location}:*`,
                },
                StringEquals: {
                  "aws:SourceAccount": ClientProps.AccountId,
                },
              },
            }),
          ],
        }),
      },
    });

    this._namespace = new PrivateDnsNamespace(
      this,
      ClientProps.CloudMapOptions.Name,
      {
        vpc: props.VPC,
        name: ClientProps.CloudMapOptions.Name,
      }
    );
  }

  get ClusterInstance() {
    return this._cluster;
  }

  get TaskExecutionRole() {
    return this._executionRole;
  }

  get Namespace() {
    return this._namespace;
  }
}
