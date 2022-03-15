const { Octokit } = require("@octokit/rest");
class Github {
    octokit = null;
    username = null;
    constructor(username) {
        this.octokit = new Octokit();
        this.username = username;
    }
    async getRepos(page) {
        const { data } = await this.octokit.repos.listForUser({
            username: this.username,
            type: "all",
            sort: "updated",
            per_page: 25,
            page: page
        });
        return data;
    }
}

exports.Github = Github;
