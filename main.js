require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`hlo ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.toLowerCase().includes("hello")) {
    message.reply("Hello, how can I help you?");
  } else if (message.content.toLowerCase().includes("I am hungry")) {
    message.reply("Eat poop");
  }
});

client.login(process.env.BOT_TOKEN);
