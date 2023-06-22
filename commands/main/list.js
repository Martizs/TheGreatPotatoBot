const { SlashCommandBuilder } = require("discord.js");
const { getSongQueueList } = require("../../utils/interactionUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Lists remaining songs in the current queue."),
  async execute({ interaction, audioPlayer }) {
    const { trackList: queueList } = getSongQueueList({
      interaction,
      audioPlayer,
    });
    if (queueList) {
      if (queueList.length) {
        let responseText = "**Remaining songs in queue**: \n";

        queueList.forEach((item, index) => {
          responseText += `${index + 1}) ${item.title} - ${item.author} \n`;
        });

        interaction.reply(responseText);
      } else {
        interaction.reply("Queue empty :c");
      }
    }
  },
};
