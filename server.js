// Import Express and CORS
const express = require("express");
const cors = require("cors");

// Import the routes
const routes = require("./routes");

// Create the server
const app = express();

// Set the port
const port = process.env.PORT || 3000;

// Set the middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/static", express.static(__dirname + "/static"));
app.use(routes);

// Set public folder

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
