const REGION = "us-east-2";
const ACCOUNT_ID = "409744482757";
const SERVICE_NAME = "client-app";

export const ClientProps = Object.freeze({
  AccountId: ACCOUNT_ID,
  Region: REGION,
  Location: `${REGION}:${ACCOUNT_ID}`,
  ServiceName: SERVICE_NAME,
  CPU: 256,
  Memory: 512,
  VPC: {
    Name: "portfolio-vpc",
    CIDR: "10.0.0.0/16",
  },
  Subnet: {
    Name: "PublicSubnet",
    CIDR: 18,
  },
  CloudMapOptions: {
    Name: "InternalDnsNamespace",
    TTL: 0,
  },
  ContainerImageARN: `arn:aws:ecr:us-east-2:409744482757:repository/client-app`,
  ContainerPort: 80,
  HealthCheck: {
    Interval: 300,
    Retries: 2,
    Timeout: 60,
  },
  LogOptions: {
    BufferSize: 1,
  },
  DesiredTaskCount: 1,
  API: {
    Name: `${SERVICE_NAME}-api`,
    VPCLinkName: `${SERVICE_NAME}-vpc-link`,
  },
});
