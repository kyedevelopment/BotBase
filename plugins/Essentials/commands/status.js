const { Command } = require("../../../structures");
const { SlashCommandBuilder } = require('discord.js');
const { DefaultEmbed } = require('../../../embeds');
const axios = require('axios');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "status",
      enabled: true,
      data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Displays the current status of Discord and the bot")
    });
  }

  async execute(interaction) {
    const discordStatusResponse = await axios.get('https://srhpyqt94yxb.statuspage.io/api/v2/status.json');
    const discordStatus = discordStatusResponse.data.status;
    const ping = interaction.client.ws.ping;
  
    let discordStatusEmoji;
    if (discordStatus.description === 'All Systems Operational') {
      discordStatusEmoji = '✅';
    } else {
      discordStatusEmoji = '❌';
    }
  
    //incorperate your own status system here
    let botStatusEmoji = '✅';
    let botStatus = 'All Systems Operational';
  
    let pingEmoji;
    if (ping < 100) {
      pingEmoji = '🟢';
    } else if (ping < 200) {
      pingEmoji = '🟡';
    } else {
      pingEmoji = '🔴';
    }
  
    const statusEmbed = new DefaultEmbed()
      .setTitle('Status')
      .setDescription(`**Discord Status:** ${discordStatus.description} ${discordStatusEmoji}\n**Bot Status:** ${botStatus} ${botStatusEmoji}\n**Ping:** ${ping}ms ${pingEmoji}`);
  
    await interaction.reply({ embeds: [statusEmbed] });
  }
};