#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { PhoneNumberForTimeStack } from '../lib/phone-number-for-time-stack';

const app = new cdk.App();
new PhoneNumberForTimeStack(app, 'PhoneNumberForTimeStack');
