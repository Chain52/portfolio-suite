// From: https://containersonaws.com/pattern/low-cost-vpc-amazon-ecs-cluster

import { Stack } from "aws-cdk-lib";
import { IpAddresses, SubnetType, Vpc } from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

import { ClientProps } from "~/constants";

export default class VPCConstruct extends Construct {
  private _vpc: Vpc;

  constructor(scope: Stack, id: string) {
    super(scope, id);

    this._vpc = new Vpc(this, id, {
      vpcName: ClientProps.VPC.Name,
      enableDnsSupport: true,
      enableDnsHostnames: true,
      ipAddresses: IpAddresses.cidr(ClientProps.VPC.CIDR),
      subnetConfiguration: [
        {
          name: ClientProps.Subnet.Name,
          subnetType: SubnetType.PUBLIC,
          cidrMask: ClientProps.Subnet.CIDR,
          mapPublicIpOnLaunch: true,
        },
      ],
      maxAzs: 2,
      natGateways: 0,
    });
  }

  get VPCinstance() {
    return this._vpc;
  }
}
