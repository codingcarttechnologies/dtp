export const environment = {
  production: true,
  apiAddress: 'http://ec2-52-26-69-75.us-west-2.compute.amazonaws.com:3000/api/v1/',
  signalRAddress: 'http://ec2-52-26-69-75.us-west-2.compute.amazonaws.com:3001/',
  eventPollDelay: 600000             // delay to check the server for the latest events (in ms)
};
