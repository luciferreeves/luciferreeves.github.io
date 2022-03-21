const firebase = require("../firebase");
const express = require("express");
const router = express.Router();

function checkReferer(referer) {
  const whitelist = ["localhost", "thatcomputerscientist"];
  if (!referer) return false;
  const host = referer.split("/")[2];
  if (whitelist.some((substring) => host.includes(substring))) {
    return true;
  } else {
    return false;
  }
}

router.get("/posts", (req, res) => {
  const referer = req.headers.referer ? req.headers.referer : null;
  if (checkReferer(referer)) {
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
  } else {
    res.status(403).send("Forbidden");
  }
});

router.put("/update/:slug", (req, res) => {
  const referer = req.headers.referer ? req.headers.referer : null;
  if (checkReferer(referer)) {
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
            shortText: post.shortText,
          });
        });
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.json({ success: false, err });
      });
  } else {
    res.status(403).send("Forbidden");
  }
});

router.delete("/delete/:slug", (req, res) => {
  const referer = req.headers.referer ? req.headers.referer : null;
  if (checkReferer(referer)) {
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
  } else {
    res.status(403).send("Forbidden");
  }
});

router.post("/new", (req, res) => {
  const referer = req.headers.referer ? req.headers.referer : null;
  if (checkReferer(referer)) {
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
  } else {
    res.status(403).send("Forbidden");
  }
});

module.exports = router;
