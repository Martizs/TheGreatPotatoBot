const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),
  async execute({ audioPlayer, interaction }) {
    const queue = audioPlayer.nodes.get(interaction.guild.id);

    if (queue) {
      queue.node.skip();
      interaction.reply(`**${queue.currentTrack.title}** - skipped`);
    } else {
      interaction.reply("Queue not found :c");
    }
  },
};
