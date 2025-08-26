require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const { getLetterboxdProfile } = require('./letterboxd'); // ✅ imported correctly

// ------------------
// Normalize movie titles
function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/\s+/g, ' ')       // collapse multiple spaces
    .replace(/[^a-z0-9 ]/gi, '') // remove punctuation
    .trim();
}

// ------------------
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Ready event
client.once('clientReady', () => {
  console.log(`Bot ready: ${client.user.tag}`);
});

// Message handler
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const userInput = message.content.trim();
  if (!userInput) return;

  try {
    // Fetch user's Letterboxd profile (watched + liked)
    const { watched, liked } = await getLetterboxdProfile("tiktokTaste");

    // Normalize titles for LLM
    const watchedNormalized = watched.map(m => normalizeTitle(m.title));
    const likedNormalized = liked.map(m => normalizeTitle(m.title));

    // Normalize user input
    const userInputNormalized = normalizeTitle(userInput);

    // Create system prompt for LLM
    const systemPrompt = `
You are CineBot, a movie expert.
User has a Letterboxd profile. Here is their data:
Watched movies: ${watchedNormalized.slice(0, 30).join(", ")}
Loved movies: ${likedNormalized.slice(0, 30).join(", ")}
Always analyze this profile before replying.
If a movie is in "watched", they’ve seen it.
If a movie is in "loved", it’s one of their favorites.
User is in 2025; you are an older version. Keep yourself updated by constantly checking the web.
Don't give long answers, try to be a good guide, and don't repeat movies user has already watched.
To check Letterboxd and IMDb ratings, search the web.
`;

    // Call the LLM API
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userInputNormalized }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LLAMA_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let botReply = response.data.choices[0]?.message?.content?.trim();
    if (!botReply) botReply = "I have no words for that...";

    await message.reply(botReply.slice(0, 2000));

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    await message.reply("Something went wrong talking to CineBot.");
  }
});

// Login
client.login(process.env.BOT_TOKEN);
