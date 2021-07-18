const Discord = require("discord.js");
const config = require('dotenv').config()

const client = new Discord.Client();

const prefix = process.env.PREFIX;

client.on('ready', () => {
  console.log('Bot online UwU')
})

client.on("message", function(message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! Essa mensagem demorou ${timeTaken}ms.`);
  }

  else if (command === "avatar") {
    message.reply(message.author.displayAvatarURL());
  }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.channelID;
  let oldUserChannel = oldMember.channelID;

  //process.env.USERVOICE = Tag da pessoa que entra no canal de voz
  //process.env.USERDM = ID da pessoa que recebe a DM

  if (newMember.member.user.tag == process.env.USER_VOICE) {
    if(!oldUserChannel && newUserChannel !== oldUserChannel) {
      client.users.cache.get(process.env.USER_DM).send(`${newMember.member.user.tag} entrou no canal de voz ${newMember.channel.name}.`/*'Alguem entrou em um canal de voz UwU'*/);
    }
    else if(!newUserChannel && newUserChannel !== oldUserChannel) {
      client.users.cache.get(process.env.USER_DM).send(`${oldMember.member.user.tag} saiu do canal de voz ${oldMember.channel.name}.`/*'Alguem entrou em um canal de voz UwU'*/);
    }
    else if(newUserChannel !== oldUserChannel) {
      client.users.cache.get(process.env.USER_DM).send(`${newMember.member.user.tag} mudou para o canal de voz ${newMember.channel.name}.`/*'Alguem entrou em um canal de voz UwU'*/);
    }
  }
});


client.login(process.env.BOT_TOKEN);