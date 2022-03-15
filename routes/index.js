// Import express router
const express = require("express");
const router = express.Router();
// Import the routes
const admin = require("./admin");

// Set the routes
router.use("/admin", admin);

// Create the routes
router.get("/", (req, res) => {
  // Send index.html from public folder
  res.render("index.html");
});


// Export the routes
module.exports = router;
