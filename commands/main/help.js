const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all commands"),
  async execute({ interaction }) {
    let responseText = "**Command list**: \n";

    [...interaction.client.commands.values()].forEach((commandItem) => {
      responseText += `${commandItem.data.name} - ${commandItem.data.description} \n`;
    });

    interaction.reply(responseText);
  },
};
