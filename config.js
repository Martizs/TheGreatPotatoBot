require("dotenv").config();

module.exports = {
  token: process.env.DISCORD_BOT_TOKEN_SECRET,
  clientId: process.env.DISCORD_BOT_APPLICATION_ID,
  guildId: process.env.SPAMY_BOY_SERVER_ID,
  maintainerId: process.env.MAINTAINER_ID,
};
