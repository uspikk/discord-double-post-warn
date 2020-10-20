function messagehandler(msg){
  const rankcommand = require('../index.js').rankcommand
  const args = msg.content.trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command==='!rank'){
  	rankcommand(msg)
  }
}


module.exports={messagehandler}