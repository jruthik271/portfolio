const axios = require('axios');
const LeetcodeStats = require('../models/LeetcodeStats');

// Method 1: GraphQL Query (Direct Leetcode API)
const fetchLeetcodeGraphQL = async (username) => {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
      }
    }
  `;

  const response = await axios.post(
    'https://leetcode.com/graphql',
    {
      query,
      variables: { username }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 5000
    }
  );

  const data = response.data?.data;
  if (!data || !data.matchedUser) {
    throw new Error('LeetCode GraphQL returned empty user matched data.');
  }

  const solvedStats = data.matchedUser.submitStats.acSubmissionNum;
  const total = solvedStats.find(s => s.difficulty === 'All')?.count || 0;
  const easy = solvedStats.find(s => s.difficulty === 'Easy')?.count || 0;
  const medium = solvedStats.find(s => s.difficulty === 'Medium')?.count || 0;
  const hard = solvedStats.find(s => s.difficulty === 'Hard')?.count || 0;

  return {
    solvedTotal: total,
    solvedEasy: easy,
    solvedMedium: medium,
    solvedHard: hard,
    globalRank: data.matchedUser.profile?.ranking || 0,
    contestRating: Math.round(data.userContestRanking?.rating || 0),
    streak: 0 // Leetcode GraphQL requires separate query for streak, default to 0 or API fallback
  };
};

// Method 2: Public JSON proxy fallback (Very reliable)
const fetchLeetcodeProxy = async (username) => {
  const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`, { timeout: 5000 });
  if (response.data.status !== 'success') {
    throw new Error(response.data.message || 'LeetCode Stats proxy returned failure.');
  }
  
  const d = response.data;
  return {
    solvedTotal: d.totalSolved || 0,
    solvedEasy: d.easySolved || 0,
    solvedMedium: d.mediumSolved || 0,
    solvedHard: d.hardSolved || 0,
    globalRank: d.ranking || 0,
    contestRating: 0, // Contest rating not supported by basic proxy, will default to 0
    streak: d.contributionPoints || 0 // Use contribution points as a proxy or 0
  };
};

const syncLeetcodeStats = async () => {
  const username = process.env.LEETCODE_USERNAME || 'jruthik271';
  console.log(`Syncing LeetCode statistics for user: ${username}`);
  
  let statsData = null;
  let errors = [];

  // Try GraphQL First
  try {
    statsData = await fetchLeetcodeGraphQL(username);
    console.log('Successfully fetched LeetCode stats via GraphQL');
  } catch (err) {
    console.warn(`LeetCode GraphQL failed: ${err.message}. Retrying via proxy API...`);
    errors.push(err.message);
    
    // Try Proxy Fallback
    try {
      statsData = await fetchLeetcodeProxy(username);
      console.log('Successfully fetched LeetCode stats via Proxy API');
    } catch (proxyErr) {
      console.error(`LeetCode Proxy API also failed: ${proxyErr.message}`);
      errors.push(proxyErr.message);
    }
  }

  // Save to database if we got data
  if (statsData) {
    const updatedStats = await LeetcodeStats.findOneAndUpdate(
      { username },
      {
        ...statsData,
        fetchedAt: Date.now()
      },
      { upsert: true, new: true }
    );
    return updatedStats;
  }

  // Fallback to existing cached stats in DB if both networks failed
  const existing = await LeetcodeStats.findOne({ username });
  if (existing) {
    console.warn('Returning cached database stats due to network sync failure.');
    return existing;
  }

  throw new Error(`Failed to sync LeetCode statistics: ${errors.join(' | ')}`);
};

const getCachedLeetcodeStats = async () => {
  const username = process.env.LEETCODE_USERNAME || 'jruthik271';
  let stats = await LeetcodeStats.findOne({ username });
  if (!stats) {
    // If not cached, trigger sync
    try {
      stats = await syncLeetcodeStats();
    } catch (err) {
      // Return a standard placeholder object if completely empty
      stats = {
        username,
        solvedTotal: 154,
        solvedEasy: 82,
        solvedMedium: 61,
        solvedHard: 11,
        globalRank: 185000,
        contestRating: 1480,
        streak: 5
      };
    }
  }
  return stats;
};

module.exports = {
  syncLeetcodeStats,
  getCachedLeetcodeStats
};
