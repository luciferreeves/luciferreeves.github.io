const express = require("express");
const router = express.Router();

router.get("/dashboard", function (req, res) {
  res.render("dashboard.html");
});

router.get("/", (req, res) => {
  // Send admin.html from public folder
  res.render("admin.html");
});

module.exports = router;
