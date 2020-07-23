const sulla = require('venom-bot');
const mime = require('mime-types');
const fs = require("fs");

sulla.create().then((client) => start(client));
 
function start(client) {

  client.onMessage((message) => {

    if(message.isMedia) {

      if(message.isGroupMsg) {
        
        const senderGRP = message.from;

        if(!message.caption.includes('/sticker')) return;

        client.decryptFile(message).then(async bufer => {

          const b = new Buffer.from(Math.floor(Math.random() * 99999).toString()+message.mediaKey.toString('base64').split('/').join('x').slice(0, 18))

          const filename = `figurinhas/${b}.${mime.extension(message.mimetype)}`;

          await fs.writeFile(filename, bufer, (err) => {
  
              if(err) return console.log(err)
          })
            setTimeout(() => { 
              client.sendImageAsSticker(senderGRP, `C:/Users/samue/Desktop/wpp-bot/${filename}`) 

          }, 750);

        })
        return;
      } else {

        const sender = message.from;
        client.decryptFile(message).then(async buffer => {

          const c = new Buffer.from(Math.floor(Math.random() * 99999).toString().slice(0, 18)+message.mediaKey.toString('base64').split('/').join('_').slice(0, 15))
          const fileName = `figurinhas/${c}.${mime.extension(message.mimetype)}`;
  
          await fs.writeFile(fileName, buffer, (err) => {
              if(err) return console.log(err)
              
          })
          setTimeout(() => { 
              client.sendImageAsSticker(sender, `C:/Users/samue/Desktop/wpp-bot/${fileName}`) 
          }, 750);
        });
      }
    }
  });
};
