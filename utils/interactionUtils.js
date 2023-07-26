function getQueue({ interaction, audioPlayer }) {
  const queue = audioPlayer.nodes.get(interaction.guild.id);

  if (!queue) {
    interaction.reply("Queue not found :c");
  }

  return queue;
}

function getSongQueueList({ interaction, audioPlayer }) {
  const queue = getQueue({ interaction, audioPlayer });
  if (queue) {
    return {
      trackList: queue.tracks.data,
      queue,
    };
  }

  return {};
}

module.exports = {
  getSongQueueList,
  getQueue,
};
