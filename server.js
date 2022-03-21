// Import Express and CORS
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import the routes
const routes = require("./routes");

// Create the server
const app = express();
var allowedOrigins = [
  "http://localhost:3000",
  "https://thatcomputerscientist.com",
];
app.use(function (req, res, next) {
  if (
    req.get("X-Forwarded-Proto") === "http" &&
    !["localhost", "127.0.0.1"].includes(
      req.get("X-Forwarded-Host")?.split(":")[0] ?? ""
    )
  ) {
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    next();
  }
});
// Set the port
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use("/static", express.static(__dirname + "/static"));
app.use(express.static(__dirname + "/public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/public/views");
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
