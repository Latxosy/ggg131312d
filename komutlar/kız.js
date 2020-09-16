const Discord = require('discord.js');

exports.run = function(client, message) {
 message.delete();

  var role = message.guild.roles.find(role => role.id === "753310463177261128");
  message.member.addRole(role);
   message.member.removeRole("753312100993990777")
  message.member.addRole("753203549252616193")
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['discord.js','javascript'],
  permLevel: 0
};

exports.help = {
  name: 'kız',
  description: 'JavaScript kanallarına erişim sağlar.',
  usage: 'js'
};
//codare
