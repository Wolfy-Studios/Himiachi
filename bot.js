const discord = require('discord.js'),
bot = new discord.Client(),
config = require('./config.json'),
prefix = process.env.prefix;
bot.login(process.env.token);

// ===Loading commands===

console.log("Loading commands...")
bot.commands = new discord.Collection()

require('fs').readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});

// ===Done Loading commands===

bot.on('ready', () => {
  bot.user.setActivity(`for .help | ${bot.guilds.size} servers`, {type: "WATCHING"})
  console.log("Himiachi ready!")
})

bot.on('message', message => {
  let mArray = message.content.split(" ")
  let args = message.content.slice(1)
  
  if (message.content == prefix+"help") {
    message.channel.send("I'm a fairly new bot, do you really think I have any commands yet?").then(m => m.delete(10000))
  }
})