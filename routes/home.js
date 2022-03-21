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
        $("#posts").append(`
            <div class="lead">
                <h2>${post.title}</h2>
                <p>${post.shortText}</p>
                <p>Published On: ${new Date(post.publishDate).toLocaleString(
                  undefined,
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}</p>
                <p><a class="btn btn-default" href="/posts/${
                  post.slug
                }">Read More</a></p>
            </div>
        `);
      });
      res.send($.html());
    });
});

module.exports = router;
