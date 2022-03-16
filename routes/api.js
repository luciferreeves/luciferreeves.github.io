const express = require("express");
const router = express.Router();
const { Github } = require("../api/github");
const github = new Github("luciferreeves");

router.get("/repos", (req, res) => {
  const page = req.query.page || 1;
  github.getRepos(page).then((repos) => {
    github.getRepos(parseInt(page) + 1).then((repos2) => {
      const count = repos.length;
      const count2 = repos2.length;
      const repositories = [];
      repos.forEach((repo) => {
        repositories.push({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          issues: repo.open_issues_count,
          license: repo.license ? repo.license.name : null,
          updated: repo.updated_at,
          created: repo.created_at,
        });
      });
      res.json({
        count: count,
        countNext: count2,
        repositories: repositories,
      });
    });
  });
});

router.get("/user", (req, res) => {
  github.getUserDetails().then((user) => {
    github.getOneYearUserContributions().then((contributions) => {
      res.json({
        user: {
          login: user.login,
          name: user.name,
          avatar: user.avatar_url,
          location: user.location,
          bio: user.bio,
          url: user.html_url,
          followers: user.followers,
          following: user.following,
          company: user.company,
          twitter: user.twitter_username,
          blog: user.blog,
        },
        contributions: contributions,
      });
    });
  });
});

module.exports = router;
