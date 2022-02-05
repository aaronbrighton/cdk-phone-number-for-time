import { Duration, Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as sns_subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';

export class PhoneNumberForTimeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Amazon Pinpoint will route in-bound SMS messages to this topic
    const smsRelayTopic = new sns.Topic(this, 'sms-relay-topic');

    // Output it, as someone will need to manually stitch Pinpoint to this topic
    new CfnOutput(this, 'sms-relay-topic-output', {
      value: smsRelayTopic.topicArn,
    });

    // The logic that gets called when an SMS is received
    const subscriberLambda = new lambda_nodejs.NodejsFunction(this, 'subscriber-function', {
      entry: path.join(__dirname, 'lambda-time-talker/index.ts'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      memorySize: 1024, // Arbitrary, opportunity for optimizing
      timeout: Duration.seconds(30), // Arbitrary
      initialPolicy: [
        new iam.PolicyStatement({
          actions: [
            'sns:Publish',
            'sns:CreateTopic',
            'sns:TagResource',
            'sns:Subscribe',
          ],
          resources: [
            '*',
          ],
        }),
      ],
    });
    smsRelayTopic.addSubscription(new sns_subscriptions.LambdaSubscription(subscriberLambda));
  }
}
