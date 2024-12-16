// npm install express axios cheerio
// node index.js (to run server.)

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/user_stats", async (req, res) => {
  const { platform, username } = req.query;

  if (!platform || !username) {
    return res.status(400).json({ error: "Platform and username are required." });
  }

  try {
    let userDetails;

    switch (platform.toLowerCase()) {
      case "leetcode":
        userDetails = await fetchLeetCodeStats(username);
        break;
      case "geeksforgeeks":
        userDetails = await fetchGeeksForGeeksStats(username);
        break;
      case "codechef":
        userDetails = await fetchCodeChefStats(username);
        break;
      case "codeforces":
        userDetails = await fetchCodeforcesStats(username);
        break;
      default:
        return res.status(400).json({ error: "Unsupported platform." });
    }

    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "An error occurred.", details: error.message });
  }
});

// Platform-specific functions
async function fetchLeetCodeStats(username) {
    const url = `https://leetcode.com/graphql`;
    const query = {
      query: `query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            ranking
          }
          submitStats {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }`,
      variables: { username },
    };
  
    try {
      const response = await axios.post(url, query);
      const user = response.data.data.matchedUser;
  
      // Parse submission counts by difficulty
      const submissions = user.submitStats.acSubmissionNum.reduce((acc, curr) => {
        acc[curr.difficulty.toLowerCase()] = curr.count;
        return acc;
      }, {});
  
      const easySolved = submissions.easy || 0;
      const mediumSolved = submissions.medium || 0;
      const hardSolved = submissions.hard || 0;
      const totalSolved = easySolved + mediumSolved + hardSolved;
  
      return {
        platform: "LeetCode",
        username: user.username,
        realName: user.profile.realName || "N/A",
        ranking: user.profile.ranking || "N/A",
        easySolved,
        mediumSolved,
        hardSolved,
        totalSolved,
      };
    } catch (error) {
      throw new Error(`Failed to fetch LeetCode stats: ${error.message}`);
    }
  }
  

async function fetchGeeksForGeeksStats(username) {
  const url = `https://auth.geeksforgeeks.org/user/${username}/`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const usernameText = $(".profile-head .text-bold").text().trim();
  const problemsSolved = $(".scoreCard_head_left--score__oSi_x").eq(1).text().trim();

  return {
    platform: "GeeksforGeeks",
    username: usernameText || username,
    totalSolved: problemsSolved || "N/A",
  };
}

async function fetchCodeChefStats(username) {
  const url = `https://www.codechef.com/users/${username}`;
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const name = $(".user-details-container .h2-style").text().trim();
  const problemsSolved = $(".problems-solved h3");

  return {
    platform: "CodeChef",
    username,
    name,
    totalSolved: problemsSolved.text().split(":")[1].trim() || "N/A",
  };
}

async function fetchCodeforcesStats(username) {
  const url = `https://codeforces.com/api/user.status?handle=${username}`;
  const response = await axios.get(url);

  const submissions = response.data.result;
  const solvedProblems = new Set(submissions.map((sub) => sub.problem.name));

  return {
    platform: "Codeforces",
    username,
    totalSolved: solvedProblems.size,
  };
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
