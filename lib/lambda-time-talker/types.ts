export type AmazonPinpointInboundSms = {
    /**
       * The phone number that sent the incoming message to you (in other words, your customer's phone number).
       */
    originationNumber: string;
  
    /**
       * The phone number that the customer sent the message to (your dedicated phone number).
       */
    destinationNumber: string;
  
    /**
       * The registered keyword that's associated with your dedicated phone number.
       */
    messageKeyword: string;
  
    /**
       * The message that the customer sent to you.
       */
    messageBody: string;
  
    /**
       * The unique identifier for the incoming message.
       */
    inboundMessageId: string;
  
    /**
       * The unique identifier of the message that the customer is responding to.
       */
    previousPublishedMessageId?: string;
  };
  