import { App } from "aws-cdk-lib";
import { ClientStack } from "./stacks";
import { ClientProps } from "./constants";

const app = new App();

new ClientStack(app, ClientProps.ServiceName, {
  env: { account: ClientProps.AccountId, region: ClientProps.Region },
});

app.synth();
