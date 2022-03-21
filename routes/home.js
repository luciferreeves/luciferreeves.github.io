const express = require("express");
const router = express.Router();
const cheerio = require("cheerio");
const firebase = require("../firebase");
const fs = require("fs");

router.get("/", (req, res) => {
  const store = firebase.firestore();
  const posts = [];
  let query = store.collection("posts");
  query = query.select("slug", "tags", "title", "shortText", "publishDate");
  query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        posts.push(doc.data());
      });
    })
    .then(() => {
      var html = fs.readFileSync(
        __dirname + "/../public/views/index.html",
        "utf8"
      );
      var $ = cheerio.load(html);
      $("#posts").html("");
      posts.forEach((post, index) => {
        if (index === 0) {
            $('#hero-unit').removeClass('hidden');
            $('#hero-unit').html(`
                <h1>${post.title}</h1>
                <p>${post.shortText}</p>
                <p><a class="btn btn-primary btn-lg" href="/posts/${post.slug}">Read More</a></p>
            `);
        }
      });
      res.send($.html());
    });
});

module.exports = router;
