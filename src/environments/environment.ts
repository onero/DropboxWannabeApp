// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  shouldBeMobileFriendly: false,
  firebase: {
    apiKey: "AIzaSyB-c76-5PoOtPOuHi5e6J1eOp5j4oaNkIc",
    authDomain: "dropboxwannabe.firebaseapp.com",
    databaseURL: "https://dropboxwannabe.firebaseio.com",
    projectId: "dropboxwannabe",
    storageBucket: "dropboxwannabe.appspot.com",
    messagingSenderId: "119642286636"
  }
};
