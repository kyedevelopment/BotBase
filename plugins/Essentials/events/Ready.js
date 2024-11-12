const { Collection } = require("discord.js");
const config = require("../../../config");
const { Event } = require("../../../structures/");

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: "ready",
      enabled: true,
    });
  }
  async run() {
    await this.client.application.commands.set(
      Array.from(this.client.commands.values()).map((r) => r.data.toJSON())
    );
    
    let userCount = 0;
    for (const guild of this.client.guilds.cache.values()) {
        userCount += guild.memberCount;
    }
    console.log(`[BOT] ${this.client.user.username} is now ready to serve ${this.client.guilds.cache.size} guilds and ${userCount} users.`);
  }
};
