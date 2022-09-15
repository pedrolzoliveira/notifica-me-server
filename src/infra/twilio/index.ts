import twilio from 'twilio'

export class TwilioClient {
  public client: twilio.Twilio

  constructor() {
    this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  }
}
