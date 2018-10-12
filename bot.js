const discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json")
var bot = new discord.Client();
var prefix = config.prefix
bot.commands = new discord.Collection()


fs.readdir("./commands/", (err, files) => {
  console.log("Loading commands...");
  if (err) return console.log(`Command loading failed!`);
  files.filter(f => f.split(".").pop() === "js").forEach((f, i) => {
    bot.commands.set(require(`./commands/${f}`).help.name, require(`./commands/${f}`));
  });
});

bot.on('message', message => {
  if(message.author.bot) return;
  if(message.author.id === "369256915479560192") {
  if(message.content.startsWith("D$PING")){
    message.channel.send(`${bot.ping} ms`)
    console.log(bot.ping)
  }
}

  if(message.author.id !== "369256915479560192"){
    if(message.content.startsWith("D$PING")){
      message.channel.send("Developer only sorry.")
    }
  }
  if(message.content.startsWith("..devstatus")) {
    message.channel.send("Self Host//Self Code//Git hub Release Date: ███████")
  }

  //DM Commands
bot.on("message", message => {
  let mArray = message.content.split(" ")
  let args = mArray.slice(1)

  if(message.channel.type == "dm") {
    if(message.content.startsWith("$help")) {
      message.channel.send("In order for to use DM commands do $dmhelp")
    }
  }
})


})

bot.on('message', message => {
  let mArray = message.content.split(" ")
  let args = mArray.slice(1)
  let cmd = bot.commands.get(mArray[0].slice(prefix.length))
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (!message.content.startsWith(prefix)) return;
  if (cmd) {
    if (config.ubl.includes(message.author.id)) return;
    cmd.run(bot, message, args, discord)
console.log(`${message.author.username} used the ${message.content.split(" ")[0]} command.`)
  }
})

bot.login(process.env.TOKEN)
