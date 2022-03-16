const { Octokit: OctokitRest } = require("@octokit/rest");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

require("dotenv").config();
class Github {
  octokit = null;
  username = null;
  constructor(username) {
    this.octokitRest = new OctokitRest({
      auth: process.env.GITHUB_TOKEN,
    });
    this.username = username;
  }
  async getRepos(page) {
    const { data } = await this.octokitRest.repos.listForUser({
      username: this.username,
      type: "all",
      sort: "updated",
      per_page: 10,
      page: page,
    });
    return data;
  }

  async getUserDetails() {
    const { data } = await this.octokitRest.users.getByUsername({
      username: this.username,
    });
    return data;
  }

  async getOneYearUserContributions() {
    const body = {
      query: `query {
                user(login: "${this.username}") {
                name
                contributionsCollection {
                    contributionCalendar {
                    colors
                    totalContributions
                    weeks {
                        contributionDays {
                        color
                        contributionCount
                        date
                        weekday
                        }
                        firstDay
                    }
                    }
                }
                }
            }`,
    };
    const headers = {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    };
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });
    const data = await response.json();
    const contributionData = [];
    data.data.user.contributionsCollection.contributionCalendar.weeks.forEach(
      (week) => {
        let weeklyContributionCount = 0;

        week.contributionDays.forEach((day) => {
          weeklyContributionCount += day.contributionCount;
        });
        contributionData.push(weeklyContributionCount);
      }
    );
    return contributionData;
  }
}

exports.Github = Github;
