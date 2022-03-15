const express = require("express");
const router = express.Router();
const { Github } = require("../api/github");
const github = new Github("luciferreeves");

router.get('/repos', (req, res) => {
    const page = req.query.page || 1;
    github.getRepos(page).then(repos => {
        const count = repos.length;
        const repositories = [];
        repos.forEach(repo => {
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
                created: repo.created_at
            });
        });
        res.json({
            count: count,
            repositories: repositories
        });
    });
})


module.exports = router;