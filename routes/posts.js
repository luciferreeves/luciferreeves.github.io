const firebase = require("../firebase");
const express = require("express");
const router = express.Router();

router.get("/posts", (req, res) => {
  const store = firebase.firestore();
  const posts = [];
  let query = store.collection("posts");

  query
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        posts.push(documentSnapshot.data());
      });
    })
    .then(() => {
      res.json(posts);
    });
});

router.post("/new", (req, res) => {
  const { title, content, tags, publishDate } = req.body;
  const store = firebase.firestore();
  const id = store.collection("posts").doc().id;
  const post = {
    id,
    title,
    content,
    tags: String(tags).split(",").length > 0 ? String(tags).split(",") : [],
    publishDate,
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
