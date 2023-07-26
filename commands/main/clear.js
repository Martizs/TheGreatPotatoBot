const { SlashCommandBuilder } = require("discord.js");
const { getQueue } = require("../../utils/interactionUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear_queue")
    .setDescription("Clears the queue"),
  async execute({ audioPlayer, interaction }) {
    const queue = getQueue({ audioPlayer, interaction });

    if (queue) {
      queue.clear();
      queue.node.skip();
      interaction.reply("Queue cleared!");
    } else {
      interaction.reply("Queue not found :c");
    }
  },
};
