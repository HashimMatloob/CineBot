# CineBot - Discord Movie Recommendation Bot 
<img width="2816" height="1536" alt="CineBot_Banner" src="https://github.com/user-attachments/assets/8efe5ce3-8698-43d0-979a-2e879e9f3d87" />


A Discord bot that provides personalized movie recommendations by analyzing your Letterboxd profile and using AI to suggest films you haven't watched yet.

## Features

- **Letterboxd Integration**: Scrapes your Letterboxd profile to get watched and liked movies
- **AI-Powered Recommendations**: Uses Meta's Llama 4 Scout model for intelligent movie suggestions
- **Personalized Responses**: Analyzes your viewing history to avoid recommending movies you've already seen
- **Real-time Data**: Fetches current movie ratings from web sources
- **Discord Integration**: Works seamlessly in Discord servers and DMs

## How It Works

1. The bot scrapes a configured Letterboxd profile to get:
   - Movies you've watched
   - Movies you've liked/loved
2. When you send a message, it analyzes your profile data
3. Uses AI to provide personalized movie recommendations
4. Avoids suggesting movies you've already watched
5. Can fetch current ratings and reviews from the web

## Setup

### Prerequisites

- Node.js (v16 or higher)
- A Discord bot token
- A Groq API key for Llama access
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd discord-movie-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env` file in the root directory:
   ```env
   BOT_TOKEN=your_discord_bot_token_here
   LLAMA_API_KEY=your_groq_api_key_here
   ```

4. **Configure Letterboxd username**
   Edit `main.js` and change `"tiktokTaste"` to your Letterboxd username:
   ```javascript
   const { watched, liked } = await getLetterboxdProfile("your_username_here");
   ```

### Getting API Keys

#### Discord Bot Token
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "Bot" section
4. Create a bot and copy the token
5. Enable necessary permissions (Send Messages, Read Message History)

#### Groq API Key
1. Sign up at [Groq](https://groq.com/)
2. Navigate to API section
3. Generate a new API key

### Running the Bot

```bash
npm start
```

Or for development:
```bash
node main.js
```

## Usage

Once the bot is running and invited to your Discord server:

1. **Ask for recommendations**: 
   - "What should I watch tonight?"
   - "Any good horror movies?"
   - "Recommend me a sci-fi film"

2. **Get specific suggestions**:
   - "Movies similar to Inception"
   - "Best films from 2023"
   - "Underrated comedies"

The bot will analyze your Letterboxd profile and provide personalized suggestions based on what you've watched and liked.

## Project Structure

```
├── main.js           # Main Discord bot logic
├── letterboxd.js     # Letterboxd scraping functionality
├── package.json      # Project dependencies
├── .env             # Environment variables (create this)
└── README.md        # This file
```

## Dependencies

- **discord.js**: Discord API wrapper
- **axios**: HTTP client for API requests
- **cheerio**: Server-side jQuery for web scraping
- **dotenv**: Environment variable management

## Configuration

### Letterboxd Profile
Change the username in `main.js`:
```javascript
const { watched, liked } = await getLetterboxdProfile("your_username");
```

### AI Model
The bot uses `meta-llama/llama-4-scout-17b-16e-instruct`. You can change this in the API request:
```javascript
model: "meta-llama/llama-4-scout-17b-16e-instruct"
```

### Response Length
Bot responses are limited to 2000 characters (Discord limit). Modify this in:
```javascript
await message.reply(botReply.slice(0, 2000));
```

## Error Handling

The bot includes error handling for:
- Failed Letterboxd scraping
- API request failures
- Network issues
- Invalid responses

## Limitations

- Relies on web scraping (may break if Letterboxd changes their HTML structure)
- Limited to 5 pages of watched movies by default (150 movies)
- Response time depends on Letterboxd loading speed and AI API response time

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Common Issues

**Bot not responding**
- Check if bot token is correct
- Verify bot has necessary permissions in Discord server
- Check console for error messages

**Letterboxd scraping fails**
- Verify the username is correct and profile is public
- Check if Letterboxd has changed their HTML structure

**AI responses are generic**
- Ensure Groq API key is valid and has remaining credits
- Check if the Letterboxd profile data is being fetched correctly

## License

This project is open source. Feel free to modify and distribute as needed.

## Disclaimer

This bot scrapes public Letterboxd profiles. Make sure to respect Letterboxd's terms of service and consider rate limiting for production use.
