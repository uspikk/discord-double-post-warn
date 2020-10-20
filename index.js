const Discord = require('discord.js');
let config = require('./config.js').config
let messagehandler = require('./function/messagehandler.js').messagehandler
const client = new Discord.Client();

let lastmessageauthor;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg){
    messagehandler(msg)
  }
  if(msg.channel.id ===config.monitorchannel){
  	if(msg.author.id === lastmessageauthor){
  		console.log(`Warning user ${msg.author.username}`)
  		client.users.cache.get(msg.author.id).send('Topelt postid ei ole tolereeritud reklaami kanalis.').then(msg.delete())
  	}
  	lastmessageauthor=msg.author.id
  }
});

function rankcommand(msg){
  const memberroles = client.guilds.cache.get(config.discordserverid).members.cache.get(msg.author.id)._roles
  const found = memberroles.find(element => element === config.rankcommand);
  if(found===undefined){
  	client.guilds.cache.get(config.discordserverid).members.cache.get(msg.author.id).roles.add(config.rankcommand).then(client.users.cache.get(msg.author.id).send('Tere tulemast discord.ee serverisse!'));
  }
  else{
    client.guilds.cache.get(config.discordserverid).members.cache.get(msg.author.id).roles.remove(config.rankcommand).then(client.users.cache.get(msg.author.id).send('Võtsite endalt õigused ära!'));
  }
}


client.login(config.discordtoken);

module.exports={
	rankcommand
}