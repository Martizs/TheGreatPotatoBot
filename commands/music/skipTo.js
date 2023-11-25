const { SlashCommandBuilder } = require("discord.js");
const { getSongQueueList } = require("../../utils/interactionUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip_to")
    .setDescription(
      "Skips to the specified song, discarding all others from the queue."
    )
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("The song number in queue")
        .setRequired(true)
    ),
  async execute({ interaction, audioPlayer }) {
    const number = interaction.options.getNumber("number") - 1;
    const { trackList: queueList, queue } = getSongQueueList({
      interaction,
      audioPlayer,
    });

    if (queueList) {
      if (queueList[number]) {
        queue.node.skipTo(queueList[number].id);
        interaction.reply(`Skipping to - **${queueList[number].title}**`);
      } else {
        interaction.reply("No such song number in queue :cry:");
      }
    }
  },
};
