// Import express router
const express = require("express");
const router = express.Router();
// Import the routes
const admin = require("./admin");

// Set the routes
router.use("/admin", admin);

// Create the routes
router.get("/", (req, res) => {
  res.render("index.html");
});
router.get("/about", (req, res) => {
  res.render("about.html");
});

// Export the routes
module.exports = router;
