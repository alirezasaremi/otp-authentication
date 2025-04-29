export enum Site {
  TOKEN = 'token'
}

export enum OtpState {
  SEND = "otp_send",
  VERIFY = "otp_verify",
}

export enum OtpMethod {
  EMAIL = "email",
  CUSTOM_SMS = "custom_sms",
  SMS = "sms",
}