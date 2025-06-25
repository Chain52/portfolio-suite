// From: https://containersonaws.com/pattern/api-gateway-fargate-cloudformation

import { Stack, Stage } from "aws-cdk-lib";
import {
  HttpApi,
  HttpRoute,
  HttpStage,
  LogGroupLogDestination,
  VpcLink,
} from "aws-cdk-lib/aws-apigatewayv2";
import { HttpServiceDiscoveryIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Port, SecurityGroup, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { ILogGroup } from "aws-cdk-lib/aws-logs";
import { IService } from "aws-cdk-lib/aws-servicediscovery";
import { Construct } from "constructs";
import { ClientProps } from "~/constants";

interface APIGatewayConstructProps {
  LogGroup: ILogGroup;
  ServiceDiscoveryService?: IService;
  ServiceSecurityGroup: SecurityGroup;
  VPC: Vpc;
}

export default class APIGatewayConstruct extends Construct {
  constructor(scope: Stack, id: string, props: APIGatewayConstructProps) {
    super(scope, id);

    if (!props.ServiceDiscoveryService) {
      throw new Error("Failed to create Service Discovery Service");
    }

    const securityGroup = new SecurityGroup(this, id + "SecurityGroup", {
      vpc: props.VPC,
    });

    // Potential point of failure: the rule may need to go the other way around.
    props.ServiceSecurityGroup.addIngressRule(
      securityGroup,
      Port.allTraffic(),
      "Allow API Gateway to communication with Fargate Service"
    );

    new HttpStage(this, id + "Stage", {
      httpApi: new HttpApi(this, id, {
        apiName: ClientProps.API.Name,
        createDefaultStage: false,
        defaultIntegration: new HttpServiceDiscoveryIntegration(
          id + "DefaultIntegration",
          props.ServiceDiscoveryService,
          {
            vpcLink: new VpcLink(this, id + "VPCLink", {
              vpcLinkName: ClientProps.API.VPCLinkName,
              vpc: props.VPC,
              securityGroups: [securityGroup],
              subnets: props.VPC.selectSubnets({
                subnetType: SubnetType.PUBLIC,
              }),
            }),
          }
        ),
      }),
      autoDeploy: true,
      detailedMetricsEnabled: true,
      accessLogSettings: {
        destination: new LogGroupLogDestination(props.LogGroup),
      },
    });
  }
}
