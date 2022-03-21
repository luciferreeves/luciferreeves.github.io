const firebase = require("../firebase");
const fs = require("fs");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();
const marked = require("marked");
const hljs = require("highlight.js");

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
      // convert content from base64 to utf8
      const content = Buffer.from(post.content, "base64").toString("utf8");
      // Parse the markdown
      const parsed = marked.parse(content, {
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        },
      });
      $("#content").html(parsed);
      $("#publishDate").text(post.publishDate);
      post.tags.forEach((tag) => {
        $("#tags").append(
          `<a href="/posts/tag/${tag
            .trim()
            .replace(
              / /g,
              "-"
            )}" class="label label-info" style="margin-right: 10px;">${tag.trim()}</a>`
        );
      });
      const katexTags = `
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.js"
          integrity="sha384-0fdwu/T/EQMsQlrHCCHoH10pkPLlKA1jL5dFyUOvB3lfeT2540/2g6YgSi2BL14p"
          crossorigin="anonymous"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/contrib/auto-render.min.js"
            integrity="sha384-+XBljXPPiv+OzfbB3cVmLHf4hdUFHlWNZN5spNQ7rmHTXpd7WvJum6fIACpNNfIR"
            crossorigin="anonymous"></script>`;
      $("body").append(katexTags);
      const autoRenderScript = `
        <script>
          document.addEventListener("DOMContentLoaded", function() {
              const tables = document.getElementsByTagName("table");
              for (let i = 0; i < tables.length; i++) {
                tables[i].classList.add("table");
                tables[i].classList.add("table-bordered");
              }
              renderMathInElement(document.getElementById("content"), {
                // customised options
                // • auto-render specific keys, e.g.:
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ],
                // • rendering keys, e.g.:
                throwOnError : false
              });
          });
        </script>`;
      $("body").append(autoRenderScript);
      res.send($.html());
    });
  });
});

module.exports = router;
