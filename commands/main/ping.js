const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong! hehe"),
  async execute(interaction) {
    await interaction.reply("Pong! Bitch boi");
  },
};
