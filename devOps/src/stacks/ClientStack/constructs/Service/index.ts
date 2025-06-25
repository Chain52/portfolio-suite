// From: https://containersonaws.com/pattern/api-gateway-fargate-cloudformation

import { Duration, Size, Stack } from "aws-cdk-lib";
import { SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Repository } from "aws-cdk-lib/aws-ecr";
import {
  AwsLogDriver,
  AwsLogDriverMode,
  Cluster,
  ContainerImage,
  FargateService,
  FargateTaskDefinition,
} from "aws-cdk-lib/aws-ecs";
import { IRole } from "aws-cdk-lib/aws-iam";
import { ILogGroup, LogGroup } from "aws-cdk-lib/aws-logs";
import { DnsRecordType, INamespace } from "aws-cdk-lib/aws-servicediscovery";
import { Construct } from "constructs";

import { ClientProps } from "~/constants";

interface ServiceConstructProps {
  Cluster: Cluster;
  Namespace: INamespace;
  TaskExecutionRole: IRole;
  VPC: Vpc;
}

export default class ServiceConstruct extends Construct {
  private _logGroup: ILogGroup;
  private _service: FargateService;
  private _securityGroup: SecurityGroup;

  constructor(scope: Stack, id: string, props: ServiceConstructProps) {
    super(scope, id);

    const taskDefinition = new FargateTaskDefinition(
      this,
      "ClientTaskDefinition",
      {
        family: ClientProps.ServiceName,
        cpu: ClientProps.CPU,
        memoryLimitMiB: ClientProps.Memory,
        executionRole: props.TaskExecutionRole,
      }
    );

    this._logGroup = new LogGroup(scope, "ContainerLogGroup");

    taskDefinition.addContainer(ClientProps.ServiceName, {
      containerName: ClientProps.ServiceName,
      image: ContainerImage.fromEcrRepository(
        Repository.fromRepositoryArn(
          scope,
          "ECRContainer",
          ClientProps.ContainerImageARN
        )
      ),
      portMappings: [
        {
          containerPort: ClientProps.ContainerPort,
          hostPort: ClientProps.ContainerPort,
        },
      ],
      healthCheck: {
        command: ["CMD-SHELL", "curl -f http://localhost/ || exit 1"],
        interval: Duration.seconds(ClientProps.HealthCheck.Interval),
        retries: ClientProps.HealthCheck.Retries,
        timeout: Duration.seconds(ClientProps.HealthCheck.Timeout),
      },
      logging: new AwsLogDriver({
        streamPrefix: ClientProps.ServiceName,
        mode: AwsLogDriverMode.NON_BLOCKING,
        maxBufferSize: Size.mebibytes(ClientProps.LogOptions.BufferSize),
        logGroup: this._logGroup,
      }),
    });

    this._securityGroup = new SecurityGroup(this, "ServiceSecurityGroup", {
      vpc: props.VPC,
    });

    this._service = new FargateService(this, id, {
      serviceName: ClientProps.ServiceName,
      cluster: props.Cluster,
      taskDefinition,
      assignPublicIp: true,
      securityGroups: [this._securityGroup],
      vpcSubnets: {
        subnets: props.VPC.selectSubnets({ subnetType: SubnetType.PUBLIC })
          .subnets,
      },
      desiredCount: ClientProps.DesiredTaskCount,
      cloudMapOptions: {
        containerPort: ClientProps.ContainerPort,
        cloudMapNamespace: props.Namespace,
        dnsRecordType: DnsRecordType.SRV,
        dnsTtl: Duration.minutes(ClientProps.CloudMapOptions.TTL),
      },
    });
  }

  get LogGroup() {
    return this._logGroup;
  }

  get FargateService() {
    return this._service;
  }

  get SecurityGroup() {
    return this._securityGroup;
  }
}
