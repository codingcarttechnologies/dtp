// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  apiAddress: 'http://ec2-52-26-69-75.us-west-2.compute.amazonaws.com:3000/api/v1/',
  signalRAddress: 'http://ec2-52-26-69-75.us-west-2.compute.amazonaws.com:3001/',
  eventPollDelay: 120000             // delay to check the server for the latest events (in ms)
};
