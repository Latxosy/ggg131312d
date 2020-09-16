const Discord = require('discord.js');
const db = require('quick.db');


exports.run = async (client, message, args) => {
  
 
  
 if(!message.member.roles.has("753320266482057398")) return message.channel.send(`Bu komutu kullanabilmek için \`Ban Hammer\` yetkisine sahip olmalısınız.`);
  let guild = message.guild
  let user = message.mentions.users.first();
  
  let sChannel2 = message.guild.channels.find(c => c.name === "ban-log")
  let sebep = args.slice(1).join(" ") || `Belirtilmemiş.`
  let yasaklayankisi = `Yasaklayan : ${message.author.tag} - ${message.author.id}`
  if (!user) return message.channel.send(`Yasaklayacağın kişiyi etiketlemelisin.`)
  if (user == message.author) return message.channel.send(`Yasaklayacağın kişiyi etiketlemelisin.`)
  message.guild.member(user).ban(`${sebep} | ${yasaklayankisi}`).catch(error => message.reply("Üyeyi yasaklamak için yetkim yetmiyor.")) 
 message.channel.send(`**${user.tag}** Adlı kullanıcı **${message.author.tag}** tarafından **${sebep}** nedeniyle yasaklandı.`, new Discord.RichEmbed().setImage(`https://cdn.discordapp.com/attachments/583291638638706712/592946744107466762/patlayan_kafa_amk.gif`))
  sChannel2.send(`**${user.tag}** Adlı kullanıcı **${message.author.tag}** tarafından **${sebep}** nedeniyle yasaklandı.`)
  user.send(`**${message.author.tag}** tarafından **${guild.name}** sunucusundan **${sebep}** sebebiyle yasaklandınız. `, new Discord.RichEmbed().setImage(`https://cdn.discordapp.com/attachments/583291638638706712/592946744107466762/patlayan_kafa_amk.gif`))
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Belirttiğiniz kullanıcıyı sunucudan yasaklar.',
  usage: 'yasakla <@kullanıcı>'
};