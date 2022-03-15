const firebase = require("firebase-admin");

require("dotenv").config();
const credentials = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: String(process.env.private_key).replace(/\\n/g, "\n").replace(/\"/g, ""),
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
};

firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: "https://thatcomputerscientist-e9cf2.firebaseio.com",
});

module.exports = firebase;
