function getSongQueueList({ interaction, audioPlayer }) {
  const queue = audioPlayer.nodes.get(interaction.member.guild.id);
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
};
