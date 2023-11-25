const { SlashCommandBuilder } = require("discord.js");
const { getQueue } = require("../../utils/interactionUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seeks specific part in the current track in seconds")
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("The part to seek in seconds")
        .setRequired(true)
    ),
  async execute({ interaction, audioPlayer }) {
    const number = interaction.options.getNumber("number");

    const queue = getQueue({ interaction, audioPlayer });

    if (queue) {
      queue.node.seek(number * 1000);
      interaction.reply(`${number}s SEEKED!`);
    }
  },
};
