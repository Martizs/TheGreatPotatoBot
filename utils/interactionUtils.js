function getQueue({ interaction, audioPlayer }) {
  return audioPlayer.nodes.get(interaction.guild.id);
}

function getSongQueueList({ interaction, audioPlayer }) {
  const queue = getQueue({ interaction, audioPlayer });
  if (queue) {
    return {
      trackList: queue.tracks.data,
      queue,
    };
  } else {
    interaction.reply(
      "There is no queue or the last song from queue is playing UwU"
    );
  }

  return {};
}

module.exports = {
  getSongQueueList,
  getQueue,
};
