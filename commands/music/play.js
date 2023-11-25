const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription(
      "Play spotify or youtube song. Provide links for accuracy. Can provide links to playlists."
    )
    .addStringOption((option) =>
      option
        .setName("song")
        .setDescription("The song name/url, you want to play.")
        .setRequired(true)
    ),
  async execute({ interaction, audioPlayer }) {
    if (interaction.member.voice?.channelId) {
      const query = interaction.options.getString("song", true); // we need input/query to play

      // let's defer the interaction as things can take time to process
      await interaction.deferReply();

      try {
        const { track } = await audioPlayer.play(
          interaction.member.voice?.channelId,
          query,
          {
            nodeOptions: {
              // nodeOptions are the options for guild node (aka your queue in simple word)
              metadata: interaction, // we can access this metadata object using queue.metadata later on
              // GuildNodeCreateOptions - for searching docs
              leaveOnEmpty: true,
              leaveOnEmptyCooldown: 300000,
              leaveOnEnd: true,
              leaveOnEndCooldown: 300000,
            },
          }
        );

        interaction.followUp(`**${track.title}** enqueued!`);
      } catch (error) {
        console.log(
          `Something went wrong playing the query - ${query}, with error`,
          error
        );

        interaction.followUp(`Something went wrong: ${error.message}`);
      }
    } else {
      interaction.reply("You're not in voice daddy");
    }
  },
};
