const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

///////////// KOMUTLAR BAŞ

////////////// KOMUTLAR SON
////////////// ALTI ELLEME
require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("userUpdate", async (oldUser, newUser) => {
  var tag = "❝";
  let sunucu = client.guilds.find(e => e.id === `753201228665716776`);
  let uye = sunucu.members.get(oldUser.id);

  if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
    uye.addRole("753203410408439838");
    uye.removeRole("753203549252616193");
    uye.send("Ekip tagını bıraktıgın için , Ekip Rolunu aldım görüşmek üzere :))");
  }
});



client.on("userUpdate", async (oldUser, newUser) => {
  var tag = "❝";
  let sunucu = client.guilds.find(e => e.id === `753201228665716776`);
  let uye = sunucu.members.get(newUser.id);

  if (newUser.username.includes(tag) && !oldUser.username.includes(tag)) {
    uye.addRole("753312100993990777");
    uye.removeRole("753203410408439838");
    uye.send("Ekip tagımızı aldıgın için , Kayıt olma izni  verildi iyi eğlenceler.");
  }
});


client.on("message" , async message => {
  if(message.author.bot) return;

db.add(`mesaj.${message.author.id}` , 1);



client.on("guildMemberAdd", async (member) => {
member.addRole("753203410408439838")
})





let toplam =  db.fetch(`mesaj.${message.author.id}`)
if(toplam === 20) {
var hd = [
    "sen sevda mısın nesin böyle ya!",
    " 1 milyon lira verseler gene gülüşünle değişmem.",
    "romantik bir yemeğe ne dersin?",
     "Ne zaman uyanırsın ? Güneşin doğuşunu izlemek istiyorum da...",
    "belki biraz seni kıskanmış olabilirimmm. Ama çok harikasın neden kıskanmayayım :(",
     "güzelliğin gözlerimi kamaştırdı beh!",
     "iyi ki varsın :heart:",
     "galiba senden hoşlanıyorum",
     " yazma be yazma kocam kızıyor ",
     "biliyorum bana karşı boş değilsin ama sevgilim var ",
     "Canın yandı mı? Cennetten düşmüş gibi bir halin var",
     "ayyyyyy çok şekersinnnnnnnnnnnnnn",
     "peki şey bu hep böyle mi gidecek arkadaş mıyız hala :( ",
    "aşkımıza kimse engel olamaz",
"of tamam git onunla konuş, belli ki yeni sevgili yapmışsın. Yazmasana bana bir daha?",
  "sence de biraz fazla gergin değil misin bugün? Az sakin olsana canım.",
" bazen bu kadar harika olmanı kıskanıyorum diyebilirim.",
"şeyyy utanıyorum da sana söylemem gereken bir şey var.",
  "onun dilinde sen, aklında ben varım. Sevgilimden uzak dur",
  "şu sunucuda bir şeyi kıskanıyorum o da senin müthişliğin ya",
"bi sarılsak mı ya sana ihtiyacım var"

    ]
message.reply(`${(hd[Math.floor(Math.random() * hd.length)])}`)
db.delete(`mesaj.${message.author.id}`)
}
});


client.on("guildMemberAdd", member => {

member.send("Sunucumuza hoşgeldin.Ekıbımız sunucu vs önemi yoktur sadece ortam , sohbet , oyun vs eğlenmek amaçlıdır sunucuya giriş yapmak için tagı eklemenız gerekmektedir.Direk kopyala yapıştır yapabilirsiniz")
})

client.on("guildMemberAdd", member => {

member.send("❝")
})



client.on("guildMemberAdd", async (member) => {
member.addRole("753203410408439838")
})


client.on("guildMemberAdd", async (member) => {
member.addRole("753203410408439838")
})


client.on(`userUpdate`, (oldUser, newUser) => {

 

  let kişi = client.users.get(oldUser.id)

  let avatar = kişi.avatarURL

  let kanal = client.channels.find(ch => ch.id === '753295238914638055')

 

  const emb = new Discord.RichEmbed()

  .setImage(avatar)

  .setFooter(`${kişi.tag}`)

  .setTimestamp()

  .setDescription(`Fotoğrafa gitmek için [tıkla](${kişi.avatarURL})!`)

  kanal.send(emb)

 

})