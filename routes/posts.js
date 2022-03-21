const firebase = require("../firebase");
const fs = require("fs");
const cheerio = require("cheerio");
const express = require("express");
const router = express.Router();
const marked = require("marked");

router.get("/posts/:id", function (req, res) {
  const id = req.params.id;
  // get single document where slug === id
  const store = firebase.firestore();
  let query = store.collection("posts");
  query.select("tags", "title", "content", "publishDate");
  query = query.where("slug", "==", id);
  var html = fs.readFileSync(__dirname + "/../public/views/post.html", "utf8");
  var $ = cheerio.load(html);
  query
    .get()
    .then(function (querySnapshot) {
      if (querySnapshot.empty) {
        res.send("404 Not Found");
      } else {
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
          // Parse the markdown and highlight the code
          const renderPreview = $("#content");
          marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code, lang) {
              const hljs = require("highlight.js");
              const language = hljs.getLanguage(lang) ? lang : "plaintext";
              return hljs.highlight(code, { language }).value;
            },
            langPrefix: "hljs language-",
            pedantic: false,
            gfm: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false,
          });
          renderPreview.html(marked.parse(content));
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
                  ],
                  // • rendering keys, e.g.:
                  throwOnError : false
                });
            });
          </script>`;
          $("body").append(autoRenderScript);
          res.send($.html());
        });
      }
    })
    .catch(function (error) {
      console.log("Error getting documents: ", error);
    });
});

module.exports = router;
