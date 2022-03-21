const firebase = require("../firebase");
const express = require("express");
const router = express.Router();

router.get("/posts", (req, res) => {
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
      res.json(posts);
    });
});

router.put("/update/:slug", (req, res) => {
  const store = firebase.firestore();
  const { title, content, tags, publishDate, shortText, slug } = req.body;
  const base64 = Buffer.from(content).toString("base64");
  const post = {
    title,
    content: base64,
    tags: String(tags).split(",").length > 0 ? String(tags).split(",") : [],
    publishDate,
    shortText,
    slug,
  };
  let query = store.collection("posts");
  query = query.where("slug", "==", slug);
  query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          title: post.title,
          content: post.content,
          tags: post.tags,
          publishDate: post.publishDate,
        });
      });
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

router.delete("/delete/:slug", (req, res) => {
  const store = firebase.firestore();
  let query = store.collection("posts");
  query = query.where("slug", "==", req.params.slug);
  query
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});


router.post("/new", (req, res) => {
  const { title, content, tags, publishDate, shortText, slug } = req.body;
  const store = firebase.firestore();
  const id = store.collection("posts").doc().id;
  // convert content to base64
  const base64 = Buffer.from(content).toString("base64");
  const post = {
    id,
    title,
    content: base64,
    tags: String(tags).split(",").length > 0 ? String(tags).split(",") : [],
    publishDate,
    shortText,
    slug,
  };
  let query = store.collection("posts");
  query
    .doc(id)
    .set(post)
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false, err });
    });
});

module.exports = router;
