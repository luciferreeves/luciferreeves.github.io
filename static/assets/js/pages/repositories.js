const userData = document.getElementById("userData");
// Get the user data from 'api/user'
$.getJSON("api/user", function (data) {
  const userAvatar = document.createElement("img");
  userAvatar.src = data.user.avatar;
  userAvatar.className = "img-polaroid";
  userAvatar.style.width = "100%";
  userData.appendChild(userAvatar);
  const strong = document.createElement("strong");
  const userName = document.createElement("h2");
  userName.innerHTML = data.user.name;
  userName.style.color = "#000";
  strong.appendChild(userName);
  userData.appendChild(strong);
  const userBio = document.createElement("p");
  userBio.innerHTML = data.user.bio;
  userBio.style.color = "#000";
  userData.appendChild(userBio);
  const followerContainer = document.createElement("p");
  followerContainer.style.color = "#000";
  const followerIcon = document.createElement("i");
  followerIcon.classList.add("tcs-icon", "trophy", "is-small");
  followerContainer.appendChild(followerIcon);
  const followerText = document.createElement("span");
  followerText.innerHTML = "&emsp;" + data.user.followers + " Followers";
  followerContainer.appendChild(followerText);
  userData.appendChild(followerContainer);
  const twParagraph = document.createElement("p");
  twParagraph.style.color = "#000";
  const twitterIcon = document.createElement("i");
  twitterIcon.classList.add("tcs-icon", "twitter", "is-small");
  twParagraph.appendChild(twitterIcon);
  const twitterText = document.createElement("span");
  const ts2 = document.createElement("span");
  ts2.innerHTML = "&emsp;";
  twitterText.appendChild(ts2);
  const twitterContainer = document.createElement("a");
  twitterContainer.style.color = "#db4437";
  twitterContainer.classList.add("a-hvr");
  twitterContainer.href = "https://twitter.com/" + data.user.twitter;
  twitterContainer.target = "_blank";
  twitterContainer.innerHTML = data.user.twitter;
  twitterText.appendChild(twitterContainer);
  twParagraph.appendChild(twitterText);
  userData.appendChild(twParagraph);
  const ghParagraph = document.createElement("p");
  ghParagraph.style.color = "#000";
  const githubIcon = document.createElement("i");
  githubIcon.classList.add("tcs-icon", "github", "is-small");
  ghParagraph.appendChild(githubIcon);
  const githubText = document.createElement("span");
  const ts3 = document.createElement("span");
  ts3.innerHTML = "&emsp;";
  githubText.appendChild(ts3);
  const githubContainer = document.createElement("a");
  githubContainer.style.color = "#db4437";
  githubContainer.classList.add("a-hvr");
  githubContainer.href = data.user.url;
  githubContainer.target = "_blank";
  githubContainer.innerHTML = data.user.login;
  githubText.appendChild(githubContainer);
  ghParagraph.appendChild(githubText);
  userData.appendChild(ghParagraph);
  const weeklyContributionsTitle = "Weekly Contributions (Past Year)";
  const weeklyContributions = document.createElement("p");
  weeklyContributions.style.color = "#000";
  weeklyContributions.innerHTML = weeklyContributionsTitle;
  weeklyContributions.style.textAlign = "center";
  userData.appendChild(weeklyContributions);
  const contributions = data.contributions;
  const canvas = document.createElement("canvas");
  canvas.id = "contributionsChart";
  const ctx = canvas.getContext("2d");
  const color = "#000083";
  // Generate Dates of past 53 weeks
  const dates = [];
  const today = new Date();
  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 53 * 7
  );
  for (let i = 0; i < 53; i++) {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + i * 7
    );
    const datePlusSevenDays = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 6
    );
    const sd = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const ed = datePlusSevenDays.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    dates.push(sd + " - " + ed);
  }
  const contributionsChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Weekly Contributions",
          data: contributions,
          backgroundColor: color,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            display: false
          }
        },
        y: {
          ticks: {
            display: false,
            beginAtZero: true
          }
        }
      }
    },
  });
  canvas.height = "200px";
  userData.appendChild(canvas);
});

const repos = document.getElementById("repos");
const page = window.location.search.split("page=")[1] || 1;

function nextPage() {
  window.location.href = `?page=${parseInt(page) + 1}`;
}

function prevPage() {
  window.location.href = `?page=${parseInt(page) - 1}`;
}

// Get the repositories from 'api/repos'
$.getJSON(`api/repos?page=${page}`, function (data) {
  if (page == 1) {
    document.getElementById("olderTop").classList.add("disabled");
    document.getElementById("olderBottom").classList.add("disabled");
  } else {
    document.getElementById("olderTop").classList.remove("disabled");
    document.getElementById("olderBottom").classList.remove("disabled");
    document.getElementById("olderTop").addEventListener("click", prevPage);
    document.getElementById("olderBottom").addEventListener("click", prevPage);
  }
  if (data.countNext == 0) {
    document.getElementById("newerTop").classList.add("disabled");
    document.getElementById("newerBottom").classList.add("disabled");
  } else {
    document.getElementById("newerTop").classList.remove("disabled");
    document.getElementById("newerBottom").classList.remove("disabled");
    document.getElementById("newerTop").addEventListener("click", nextPage);
    document.getElementById("newerBottom").addEventListener("click", nextPage);
  }
  const repositories = data.repositories;
  repositories.forEach((repo) => {
    const leadParagraphCotainer = document.createElement("p");
    leadParagraphCotainer.className = "lead";
    const repoName = repo.name;
    const repoLink = repo.url;
    const repoDescription = repo.description;
    const repoLanguage = repo.language || "No language";
    const repoStars = repo.stars;
    const repoForks = repo.forks;
    const license = repo.license;

    const nameContainer = document.createElement("h3");
    nameContainer.innerHTML = repoName;
    const descriptionContainer = document.createElement("p");
    descriptionContainer.innerHTML = repoDescription;
    const languageAndLicenseContainer = document.createElement("div");
    const languageBadgeContainer = document.createElement("span");
    languageBadgeContainer.className = "badge badge-warning";
    languageBadgeContainer.innerHTML = repoLanguage;
    const licenseBadgeContainer = document.createElement("span");
    licenseBadgeContainer.className = "badge badge-info";
    licenseBadgeContainer.style.marginLeft = "10px";
    licenseBadgeContainer.innerHTML = license;
    languageAndLicenseContainer.appendChild(languageBadgeContainer);
    languageAndLicenseContainer.appendChild(licenseBadgeContainer);
    languageAndLicenseContainer.style.marginBottom = "10px";
    const starsAndForksContainer = document.createElement("div");
    const starsContainer = document.createElement("span");
    const starIcon = document.createElement("i");
    starIcon.classList.add("tcs-icon", "star", "is-small");
    starsContainer.appendChild(starIcon);
    starsContainer.innerHTML += " " + repoStars + " Stars";
    const forksContainer = document.createElement("span");
    forksContainer.innerHTML += " " + repoForks + " Forks";
    starsAndForksContainer.appendChild(starsContainer);
    starsAndForksContainer.appendChild(forksContainer);
    starsAndForksContainer.style.marginBottom = "10px";
    const repoLinkContainer = document.createElement("p");
    const repoLinkAnchor = document.createElement("a");
    repoLinkAnchor.href = repoLink;
    repoLinkAnchor.innerHTML = "View on Github";
    repoLinkContainer.appendChild(repoLinkAnchor);
    leadParagraphCotainer.appendChild(nameContainer);
    leadParagraphCotainer.appendChild(descriptionContainer);
    leadParagraphCotainer.appendChild(languageAndLicenseContainer);
    leadParagraphCotainer.appendChild(starsAndForksContainer);
    leadParagraphCotainer.appendChild(repoLinkContainer);
    repos.appendChild(leadParagraphCotainer);
  });
});
