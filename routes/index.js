// Import express router
const express = require("express");
const router = express.Router();

// Import the routes
const admin = require("./admin");
const repositories = require("./repositories");
const blog = require("./blog");
const posts = require("./posts");
const home = require("./home");

// Set the routes
router.use("/admin", admin);
router.use("/api/blog", blog);
router.use("/", repositories);
router.use("/", posts);
router.use("/", home);

// Create the routes

router.get("/about", (req, res) => {
  res.render("about.html");
});


// Export the routes
module.exports = router;
