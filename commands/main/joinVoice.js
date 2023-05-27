// Note: for better connectivity and audio, see - https://discordjs.guide/voice/#extra-dependencies
const { SlashCommandBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { guildId } = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join_voice")
    .setDescription(
      "Joins voice, so that you wouldn't be lonely. You sad boi."
    ),
  async execute(interaction) {
    console.log("interaction", interaction);
    interaction.reply("Yes yes, i'm coming mom");
    // joinVoiceChannel({
    //   channelId: interaction.channelId,
    //   guildId: guildId,
    //   adapterCreator: channel.guild.voiceAdapterCreator,
    // });
  },
};
