const Discord = require('discord.js');
let config = require('./config.js').config
const client = new Discord.Client();

let lastmessageauthor;


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.channel.id ===config.monitorchannel){
  	if(msg.author.id === lastmessageauthor){
  		console.log(`Warning user ${msg.author.username}`)
  		client.users.cache.get(msg.author.id).send('Topelt postid ei ole tolereeritud reklaami kanalis.')
  	    msg.delete()
  	}
  	lastmessageauthor=msg.author.id
  }
});

client.login(config.discordtoken);