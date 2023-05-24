const { Client, Events, GatewayIntentBits } = require("discord.js");
const { initiateCommands } = require("./initiate_commands");
const { token } = require("./config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildMessages,
  ],
  partials: ["MESSAGE", "CHANNEL"],
});

client.login(token);

client.on(Events.ClientReady, () => {
  console.log("The AI bot is online"); //message when bot is online
});

initiateCommands(client);

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    console.log("interaction", interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if (command) {
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error("error", error);

        const errorResponse = {
          content: "There was an error while executing this command!",
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
