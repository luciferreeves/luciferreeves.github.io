// Import express router
const express = require("express");
const router = express.Router();
// Import the routes
const admin = require("./admin");
const api = require("./api");
// Set the routes
router.use("/admin", admin);
router.use("/api", api);

// Create the routes
router.get("/", (req, res) => {
  res.render("index.html");
});
router.get("/about", (req, res) => {
  res.render("about.html");
});
router.get("/repos", (req, res) => {
  res.render("repositories.html");
});

// Export the routes
module.exports = router;
