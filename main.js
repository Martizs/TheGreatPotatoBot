const { Client, Events, GatewayIntentBits } = require("discord.js");
const { initiateCommands } = require("./initiate_commands");
const { token, guildId, maintainerId } = require("./config");
const { Player } = require("discord-player");
const {
  SpotifyExtractor,
  YoutubeExtractor,
} = require("@discord-player/extractor");

// initiate main discord bot client
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

const audioPlayer = new Player(client);

// If you dont want to use all of the extractors and register only the required ones manually, use
(async () => {
  try {
    await audioPlayer.extractors.register(SpotifyExtractor, {});
    console.log("SpotifyExtractor loaded successfully");
  } catch (error) {
    console.log("Error loading SpotifyExtractor", error);
  }

  try {
    await audioPlayer.extractors.register(YoutubeExtractor, {});
    console.log("YoutubeExtractor loaded successfully");
  } catch (error) {
    console.log("Error loading YoutubeExtractor", error);
  }
})();

// this event is emitted whenever discord-player starts to play a track
audioPlayer.events.on("playerStart", (queue, track) => {
  // we will later define queue.metadata object while creating the queue
  queue.metadata.channel.send(`Started playing **${track.title}**!`);
});

// initiate command and command/interaction listeners
initiateCommands(client);

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (command) {
      try {
        await command.execute({
          interaction,
          audioPlayer,
        });
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

process.on("uncaughtException", function (err) {
  console.error("Uncaught error, caught hehe", err.stack);

  const queue = audioPlayer.nodes.get(guildId);

  if (err.message.includes("410") && queue) {
    if (queue.currentTrack) {
      let message = `This is the bad track that tried to break me - ${queue.currentTrack.title}. 
      With url - ${queue.currentTrack.url}. 
      <@${maintainerId}> :sob: .`;

      if (queue.tracks.data.length) {
        message += " \n Resuming the list";
        // NOTE: apperantly after a bad song is played, the playlist goes into
        // idle? And then we need to resume it by invoking .play()
        queue.node.play();
      }

      queue.metadata.channel.send(message);
    }
  }
});
