// Note: for better connectivity and audio, see - https://discordjs.guide/voice/#extra-dependencies
const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel, createAudioResource } = require("@discordjs/voice");
const path = require("node:path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play_best_song")
    .setDescription("Plays the best song in the world"),
  async execute(interaction, audioPlayer, voiceConnection) {
    if (interaction.member.voice?.channelId) {
      interaction.reply("I'm comming daddy");

      voiceConnection = joinVoiceChannel({
        channelId: interaction.member.voice.channelId,
        guildId: interaction.member.guild.id,
        adapterCreator: interaction.member.guild.voiceAdapterCreator,
      });

      const musicPath = path.join(__dirname, "nocock.mp3");
      const resource = createAudioResource(musicPath);

      audioPlayer.play(resource);

      voiceConnection.subscribe(audioPlayer);
    } else {
      interaction.reply("You're not in voice daddy");
    }
  },
};
