require("dotenv").config();
const credentialCURLCommand = `curl -H 'Authorization: token ${process.env.GITHUB_TOKEN}' \
-H 'Accept: application/vnd.github.v3.raw' \
-O \
-L https://api.github.com/repos/luciferreeves/credentials/contents/firebase-admin/credentials.json`;

const shell = require("shelljs");
shell.exec("rm -rf credentials.json");
shell.exec(credentialCURLCommand);
const firebase = require("firebase-admin");
var serviceAccount = require("../credentials.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://thatcomputerscientist-e9cf2.firebaseio.com",
});

module.exports = firebase;
