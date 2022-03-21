const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const fs = require("fs");
const firebase = require("../firebase");

router.get("/dashboard", function (req, res) {
  res.render("dashboard.html");
});

router.get("/dashboard/new", function (req, res) {
  res.render("createPost.html");
});

router.get("/dashboard/edit/:slug", function (req, res) {
  var html = fs.readFileSync(
    __dirname + "/../public/views/editPost.html",
    "utf8"
  );
  var $ = cheerio.load(html);
  const store = firebase.firestore();
  let query = store.collection("posts");
  query = query.where("slug", "==", req.params.slug);
  query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        $("#title").val(doc.data().title);
        $("#content").val(Buffer.from(doc.data().content, "base64").toString());
        $("#tags").val(doc.data().tags);
        $("#publishDate").val(doc.data().publishDate);
      });
    })
    .then(() => {
      const publishScript = `<script src="/static/assets/js/pages/publish.js"></script>`;
      $("body").append(publishScript);
      res.send($.html());
    });
});

router.get("/", (req, res) => {
  // Send admin.html from public folder
  res.render("admin.html");
});

module.exports = router;
