// Import Express and CORS
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import the routes
const routes = require("./routes");

// Create the server
const app = express();

// Set the port
const port = process.env.PORT || 3000;
// Set the middleware
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/static", express.static(__dirname + "/static"));
app.use(express.static(__dirname + '/public'));
app.use(routes);

app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
