# CineBot

CineBot is a Discord bot that allows users to explore, analyze, and interact with movie data from Letterboxd. It leverages web scraping and AI-powered features to provide insights, recommendations, and fun interactions for movie enthusiasts.

## Features

- Fetch movie lists and ratings from a Letterboxd user profile
- Generate AI summaries, recommendations, or discussions based on user data
- Interactive commands for exploring movies, directors, and genres
- Easy integration with Discord

## How It Works

CineBot works in three main steps:

### 1. Scraping Letterboxd Data
CineBot uses [Axios](https://www.npmjs.com/package/axios) to fetch publicly available data from a Letterboxd user profile. This includes:

- Movies watched
- Ratings
- Lists created by the user

### 2. Processing Data
Once the data is fetched, CineBot processes it to generate meaningful insights or recommendations. It can:

- Summarize top-rated movies
- Suggest similar movies based on user preferences
- Generate AI-driven conversations about movies

### 3. AI-Powered Responses
CineBot integrates with an LLM (Large Language Model) API to provide intelligent, natural language responses. **You need your own LLM API key** to enable this feature.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cinebot.git
``` 
2. Navigate to the project folder:

```bash
cd cinebot
```
3. Install dependencies
 ```bash
npm install
   ```
4.Create a .env file in the root directory and add:
```bash
 DISCORD_TOKEN=your_discord_bot_token
 LLM_API_KEY=your_llm_api_key
```
Usage
1. Run the bot:
 ```bash
 node index.js
   ```
# Requirements
```bash
  1.Node.js v18 or higher
  2.Discord bot token
  3.LLM API key (OpenAI or similar)
  4.Axios for HTTP requests
  5.Cheerio for HTML parsing
```
# Contributing
-Feel free to contribute by opening issues or submitting pull requests. Make sure to follow proper coding conventions and add clear documentation.

# License
This project is licensed under the MIT License.
