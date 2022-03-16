const firebase = require("../firebase");
const express = require("express");
const router = express.Router();

router.get("/posts", (req, res) => {
  const store = firebase.firestore();
  const posts = [];
  let query = store.collection("posts");

  query
    .limit(1)
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

module.exports = router;
