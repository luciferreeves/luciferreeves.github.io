// Import express router
const express = require("express");
const router = express.Router();
// Import the routes
const admin = require("./admin");
const repositories = require("./repositories");
const blog = require("./blog");
const posts = require("./posts");
// Set the routes
router.use("/admin", admin);
router.use("/api/blog", blog);
router.use("/", repositories);
router.use("/", posts);

// Create the routes
router.get("/", (req, res) => {
  res.render("index.html");
});
router.get("/about", (req, res) => {
  res.render("about.html");
});


// Export the routes
module.exports = router;
