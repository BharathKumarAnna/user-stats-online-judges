# **Competitive Programming User Stats API**

This project provides an API to fetch user stats from multiple competitive programming platforms such as LeetCode, GeeksforGeeks, CodeChef, and Codeforces. It scrapes or queries data using APIs to provide details like solved problems, rankings, and more.

---

## **Features**
- Fetch stats from multiple platforms:
  - LeetCode
  - GeeksforGeeks
  - CodeChef
  - Codeforces
- Uses scraping and APIs to retrieve accurate user data.
- Lightweight and efficient with `Express`, `Axios`, and `Cheerio`.

---

## **Prerequisites**
Make sure you have the following installed:
1. [Node.js](https://nodejs.org/) (v14 or later)
2. npm (comes with Node.js)

---

## **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/competitive-stats-api.git
   cd competitive-stats-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## **Usage**

1. Start the server:
   ```bash
   node index.js
   ```

2. Make a GET request to the `/user_stats` endpoint with the following query parameters:
   - `platform`: The name of the competitive programming platform (e.g., `leetcode`, `geeksforgeeks`, `codechef`, `codeforces`).
   - `username`: The username of the user on the platform.

   Example request:
   ```
   http://localhost:3000/user_stats?platform=leetcode&username=sampleUser
   ```

   Example response:
   ```json
   {
     "platform": "LeetCode",
     "username": "sampleUser",
     "realName": "John Doe",
     "ranking": "1234",
     "easySolved": 50,
     "mediumSolved": 30,
     "hardSolved": 10,
     "totalSolved": 90
   }
   ```

---

## **API Endpoints**

### **GET `/user_stats`**
Fetch user stats from a supported platform.

| Parameter   | Type   | Description                                   |
|-------------|--------|-----------------------------------------------|
| `platform`  | string | Name of the platform (`leetcode`, `geeksforgeeks`, `codechef`, `codeforces`). |
| `username`  | string | Username of the user on the respective platform. |

### Example Platforms:
- **LeetCode**: Fetches data using the GraphQL API.
- **GeeksforGeeks**: Scrapes user profile stats from the website.
- **CodeChef**: Scrapes user profile stats from the website.
- **Codeforces**: Fetches user stats using the Codeforces API.

---

## **Technologies Used**
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **Axios**: HTTP client for making API requests.
- **Cheerio**: Web scraping library to parse HTML.

---

## **Notes**
- The API uses web scraping for platforms like GeeksforGeeks and CodeChef. Changes in the website's structure might break the scraping functionality.
- Make sure to respect each platform's terms of service when using this API.
- The server is configured to run on port **3000** by default. You can change this in the code.

---

## **Future Enhancements**
- Add support for more platforms (e.g., HackerRank, SPOJ).
- Implement caching to reduce repeated requests and improve performance.
- Use official APIs wherever possible to ensure reliability.

---

## **End API**
- end user api -> http://localhost:3000/user_stats?platform={platform}&username={username}
- Replace {platform} with (geeksforgeeks or leetcode or codechef or codeforces)
- Replace {username} with username in that particular platform.
## **Example**:  
- http://localhost:3000/user_stats?platform=leetcode&username=example_user
- http://localhost:3000/user_stats?platform=geeksforgeeks&username=bharathkumaranna10

---
## **Contributing**
Contributions are welcome! Feel free to open issues or submit pull requests.
