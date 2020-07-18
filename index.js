const sulla = require('venom-bot');
const mime = require('mime-types');
const fs = require("fs");

sulla.create().then((client) => start(client));
 
function start(client) {

  client.onMessage((message) => {

    if(message.isMedia) {

      const senderGRP = message.from;
      if(message.isGroupMsg) {
        
        if(!message.caption.includes('/sticker')) return;

        client.downloadFile(message).then(async bufer => {
          const b = new Buffer.from(message.id.toString('base64').split('/').join('').slice(0, 17)+message.mediaKey.toString('base64').split('/').join('').slice(0, 15))

          const filename = `figurinhas/${b.replace('false', Math.floor(Math.random() * 99998).toString())}.${mime.extension(message.mimetype).includes("jpeg") ? mime.extension(message.mimetype).replace('jpeg', 'png') : mime.extension(message.mimetype)}`;

          await fs.writeFile(filename, bufer, (err) => {
  
              if(err) return console.log(err)
          })
            setTimeout(() => { 
              client.sendImageAsSticker(senderGRP, `C:/Users/samue/Desktop/bot-whatsapp/${filename}`) 

          }, 750);

        })
        return;
      }
    
      const sender = message.from;
        
        client.downloadFile(message).then(async buffer => {

          const c = new Buffer.from(message.id.toString('base64').split('/').join('').slice(0, 15)+message.mediaKey.toString('base64').split('/').join('').slice(0, 15))
          const fileName = `figurinhas/${c.replace('false', Math.floor(Math.random() * 99999).toString())}.${mime.extension(message.mimetype)}`;
  
          await fs.writeFile(fileName, buffer, (err) => {
              if(err) return console.log(err)
              
          })
          setTimeout(() => { 
              client.sendImageAsSticker(sender, `C:/Users/samue/Desktop/bot-whatsapp/${fileName}`) 
          }, 750);
        });
      }
    });
  }
