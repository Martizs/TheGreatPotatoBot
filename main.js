require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on("ready", () => {
  console.log("The AI bot is online"); //message when bot is online
});

client.login(process.env.DISCORD_BOT_TOKEN_SECRET);
