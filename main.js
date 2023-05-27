const { Client, Events, GatewayIntentBits } = require("discord.js");
const { initiateCommands } = require("./initiate_commands");
const { token } = require("./config");
const { createAudioPlayer, AudioPlayerStatus } = require("@discordjs/voice");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: ["MESSAGE", "CHANNEL"],
});

client.login(token);

client.on(Events.ClientReady, () => {
  console.log("The Potato bot is online"); //message when bot is online
});

let voiceConnection;

const audioPlayer = createAudioPlayer();

audioPlayer.on(AudioPlayerStatus.Idle, () => {
  console.log("AudioPlayerStatus.Idle");
});

audioPlayer.on(AudioPlayerStatus.AutoPaused, () => {
  console.log("AudioPlayerStatus.AutoPaused");
});

audioPlayer.on(AudioPlayerStatus.Buffering, () => {
  console.log("AudioPlayerStatus.Buffering");
});

audioPlayer.on(AudioPlayerStatus.Paused, () => {
  console.log("AudioPlayerStatus.Paused");
});

audioPlayer.on(AudioPlayerStatus.Playing, () => {
  console.log("AudioPlayerStatus.Playing");
});

audioPlayer.on("error", (error) => {
  console.error(
    `Error: ${error.message} with resource ${error.resource.metadata.title}`
  );
});

initiateCommands(client);

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (command) {
      try {
        await command.execute(interaction, audioPlayer, voiceConnection);
      } catch (error) {
        const content = `There was an error while executing "${interaction.commandName}" command!`;

        console.error(content, error);

        const errorResponse = {
          content,
          ephemeral: true,
        };

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorResponse);
        } else {
          await interaction.reply(errorResponse);
        }
      }
    }
  }
});
