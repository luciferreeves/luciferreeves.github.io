// Import express router
const express = require("express");
const router = express.Router();

// Create the routes
router.get("/", (req, res) => {
  // Send index.html from public folder
  res.sendFile(__dirname + "/public/index.html");
});

// Export the routes
module.exports = router;
