const { SlashCommandBuilder } = require("discord.js");
const { getQueue } = require("../../utils/interactionUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),
  async execute({ audioPlayer, interaction }) {
    const queue = getQueue({ audioPlayer, interaction });

    if (queue) {
      queue.node.skip();
      interaction.reply(`**${queue.currentTrack.title}** - skipped`);
    }
  },
};
