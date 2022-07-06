let request = require("request")
let fs = require('fs')
let axios = require('axios')
module.exports.config = {
	name: "send",
	version: "1.0.5",
	hasPermssion: 2,
	credits: "Mirai mod lại by TrúcCute",
	description: "Gửi tin nhắn tới các nhóm(reply vào ảnh/video cần gửi kèm)!\nPhiên bản xịn hơn của sendnotiUwU",
	commandCategory: "Admin",
	usages: "[Text]",
	cooldowns: 5,
  dependencies: {
    "fs": "",
    "axios": "",
    "request": ""
  }
}

module.exports.run = async ({ api, event, args, Users, handleReply }) => {
  let { senderID, messageReply, threadID, messageID, type } = event;
  let name = await Users.getNameUser(senderID)
  let cc = require("moment-timezone")
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
  if (type == "message_reply") {
    if (messageReply.attachments[0].type == "audio") {
      path = __dirname + `/cache/snoti.m4a` ||  __dirname + `/cache/snoti.mp3`
    }
    if (messageReply.attachments[0].type == "photo") {
      path = __dirname + `/cache/snoti.jpg`
    }
    if (messageReply.attachments[0].type == "video") {
      path = __dirname + `/cache/snoti.mp4`
    }
    if (messageReply.attachments[0].type == "animated_image") {
      path = __dirname + `/cache/snoti.gif`
    }
    let abc = messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, {
      responseType: 'arraybuffer'
    })).data
    fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
    let allThread = global.data.allThreadID || []
    let count = 1, cantSend = [];
    for (idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == threadID) ""
      else {
        api.sendMessage({body: `====== [ 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 ] ======\n-----------------------------------------------\n𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${gio}\n-----------------------------------------------\n𝐍𝐨̣̂𝐢 𝐝𝐮𝐧𝐠:\n ${args.join(` `)}\n-----------------------------------------------\n𝐀𝐝𝐦𝐢𝐧: ${name} `, attachment: fs.createReadStream(path) }, idThread, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: senderID,
                ID: messageID,
                messageID: info.messageID
              });
          if (e) cantSend.push(idThread)
        })
        count++;
      await new Promise(resolve => setTimeout(resolve, 500));
      }
    } api.sendMessage(`Đã thông báo thành công đến ${count} box và không thành công đến ${cantSend.length} box`, threadID)
  }
  else {
    let allThread = global.data.allThreadID || [];
    let count = 1, cantSend = [];
    for (idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == threadID) ""
      else {
        api.sendMessage(`====== [ 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 ] ======\n-----------------------------------------------\n𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${gio}\n-----------------------------------------------\n𝐍𝐨̣̂𝐢 𝐝𝐮𝐧𝐠:\n ${args.join(` `)}\n-----------------------------------------------\n𝐀𝐝𝐦𝐢𝐧: ${name}`, idThread, (error, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: senderID,
                ID: messageID,
                messageID: info.messageID
              });
          if (e) cantSend.push(idThread)
        });
        count++;
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } api.sendMessage(`Đã thông báo thành công đến ${count} box và không thành công đến ${cantSend.length} box`, threadID)
  }
}

module.exports.handleReply = async ({ api, event, handleReply, Users }) => {
  let { body, threadID, senderID, messageID } = event;
  let index = body.split(" ")
  switch(handleReply.type) {
    case "callad": {
      let name = await Users.getNameUser(senderID)
      if (event.attachments.length != 0) {
        if (event.attachments[0].type == "audio") {
    path = __dirname + `/cache/snoti.m4a` ||  __dirname + `/cache/snoti.mp3`
  }
  if (event.attachments[0].type == "photo") {
    path = __dirname + `/cache/snoti.jpg`
  }
  if (event.attachments[0].type == "video") {
    path = __dirname + `/cache/snoti.mp4`
  }
  if (event.attachments[0].type == "animated_image") {
    path = __dirname + `/cache/snoti.gif`
  }
        api.sendMessage({body: `Từ ${name}\nNội dung: ${body}`, attachment: fs.createReadStream(path)}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
          })
        }, handleReply.ID)
      } else if (index.length != 0) {
        api.sendMessage({body: `Từ ${name}\nNội dung: ${body}`}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
          })
        }, handleReply.ID)
      }
    }
  }
}
