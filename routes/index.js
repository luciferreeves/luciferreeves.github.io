// Import express router
const express = require("express");
const router = express.Router();
const firebase = require("../firebase");
const fs = require("fs");
const cheerio = require("cheerio");
// Import the routes
const admin = require("./admin");
const api = require("./api");
const posts = require("./posts");
// Set the routes
router.use("/admin", admin);
router.use("/api", api);
router.use("/api/blog", posts);

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

router.get("/posts/:id", function (req, res) {
  const id = req.params.id;
  // get single document where slug === id
  const store = firebase.firestore();
  let query = store.collection("posts");
  query.select("tags", "title", "content", "publishDate");
  query = query.where("slug", "==", id);
  var html = fs.readFileSync(__dirname + "/../public/views/post.html", "utf8");
  var $ = cheerio.load(html);
  query.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      const post = doc.data();
      const changedTitle =
        '<script>document.title = "That Computer Scientist | ' +
        post.title +
        '";</script>';
      $("head").append(changedTitle);
      $("#title").text(post.title);
      $("#content").html(post.content);
      $("#publishDate").text(post.publishDate);
      post.tags.forEach((tag) => {
        $("#tags").append(
          `<a href="/posts/tag/${tag.trim().replace(/ /g, '-')}" class="label label-info" style="margin-right: 10px;">${tag.trim()}</a>`
        );
      });
      res.send($.html());
    });
  });
});

// Export the routes
module.exports = router;
