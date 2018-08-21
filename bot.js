const discord = require('discord.js');
const bot = new discord.Client();
const config = require('./config.json');
const fs = require('fs');
bot.commands = new discord.Collection();
var prefix = ".";


// ===Loading commands===



fs.readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});

// ===Done Loading commands===

bot.on("message", message => {
  const sender = message.author;
  const msg = message.content.toUpperCase()
  const prefix = "#"
  const cont = message.content.slice(prefix.length).split(" ")
  const args = cont.slice(1)

  if(message.content.startsWith(prefix)) return;

  const cmd = bot.commands.get(cont[0])
  if(cmd) cmd.run(bot, message, args);
})

bot.on('guildMemberAdd', (member) => require('./events/guildMemberAdd.js')(bot, member))

bot.on('ready', () => {
  var statuses = ["In Developement", "Im being revived", "Im alive!"]
  var result = statuses[Math.floor(Math.random() * statuses.length)]
  bot.user.setActivity(`Loading Himiachi...`, {type: "STREAMING", url: "https://twitch.tv/freakinghulk"})
  setTimeout(() => {
    setInterval(() => {
      if (result == statuses[0]) {
        bot.user.setActivity(result, {type: "WATCHING"})
      }
   
      if (result == statuses[1]) {
        bot.user.setActivity(result, {type: "LISTENING"})
      }
   
      if (result == statuses[2]) {
        bot.user.setActivity(result, {type: "PLAYING"})
      }
    }, 25000)
  }, 10000)
    console.log("Himiachi ready!")
})
bot.login(process.env.token);
