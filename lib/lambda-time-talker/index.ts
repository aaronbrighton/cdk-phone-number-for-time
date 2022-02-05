
import { SNSEvent, Context } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { AmazonPinpointInboundSms } from './types';

// AWS SNS service
const sns = new AWS.SNS();

export const handler = async (
  event: SNSEvent,
  context: Context,
) => {

  console.log('Event: '+JSON.stringify(event));

  let snsMessage: AmazonPinpointInboundSms = JSON.parse(event.Records[0].Sns.Message);
  snsMessage.messageBody = snsMessage.messageBody.trim(); // Clean up for messy humans

  await sns.publish({
    PhoneNumber: snsMessage.originationNumber,
    Message: new Date().toUTCString(),
  }).promise();

};