const { SlashCommandBuilder } = require("discord.js");
const { getSongQueueList } = require("../../utils/interactionUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("list")
    .setDescription("Lists remaining songs in the current queue."),
  async execute({ interaction, audioPlayer }) {
    const { trackList: queueList, queue } = getSongQueueList({
      interaction,
      audioPlayer,
    });
    if (queueList) {
      if (queueList.length) {
        interaction.reply("**Remaining songs in queue**: \n");

        let listText = "";

        queueList.forEach((item, index) => {
          const newSongEntry = `${index + 1}) ${item.title} - ${
            item.author
          } \n`;

          if (listText.length + newSongEntry.length > 2000) {
            queue.metadata.channel.send(listText);

            listText = "";
          }

          listText += newSongEntry;
        });

        queue.metadata.channel.send(listText);
      } else {
        interaction.reply("Queue empty :c");
      }
    }
  },
};
