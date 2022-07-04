module.exports.config = {
	name: "send",
	version: "1.0.5",
	hasPermssion: 2,
	credits: "Mirai mod by HĐGN mod lại by TrúcCute",
	description: "Gửi tin nhắn tới các nhóm(reply vào ảnh/video cần gửi kèm)!\nPhiên bản xịn hơn của sendnotiUwU",
	commandCategory: "Admin",
	usages: "[Text]",
	cooldowns: 5,
  dependencies: {
    "fs": "",
    "axios": "",
    "moment-timezone": "",
    "request": ""
  }
}

module.exports.languages = {
	"vi": {
		"sendSuccess": "𝐓𝐡𝐨̂𝐧𝐠 𝐛𝐚́𝐨 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 𝐓𝐨̛́𝐢 %1 𝐍𝐡𝐨́𝐦!",
		"sendFail": "[!] 𝐊𝐡𝐨̂𝐧𝐠 𝐓𝐡𝐞̂̉ 𝐆𝐮̛̉𝐢 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐓𝐨̛́𝐢 %1 𝐍𝐡𝐨́𝐦"
	},
	"en": {
		"sendSuccess": "Sent message to %1 thread!",
		"sendFail": "[!] Can't send message to %1 thread"
	}
}

module.exports.run = async ({ api, event, args, getText, Users }) => {
  let { senderID, messageReply, threadID, messageID, type } = event;
  let name = await Users.getNameUser(senderID)
  let moment = require("moment-timezone")
  let gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  if (type == "message_reply") {
    let request = require("request")
    let fs = require('fs')
    let axios = require('axios')
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
        api.sendMessage({body: `ㅤ »🌸 𝑨𝑫𝑴𝑰𝑵 𝑩𝑶𝑻 🌸«\n\n𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${gio}\n𝐆𝐮̛̉𝐢 𝐭𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧: ${name}\n𝐍𝐨̣̂𝐢 𝐝𝐮𝐧𝐠:\n『 ${args.join(` `)} 』`, attachment: fs.createReadStream(path) }, idThread, (e, info) => {
          if (e) cantSend.push(idThread);
        });
        count++;
      await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    return api.sendMessage(getText("sendSuccess", count), threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), threadID, messageID) : "", messageID)
  }
  else {
    let allThread = global.data.allThreadID || [];
    let count = 1, cantSend = [];
    for (idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == threadID) ""
      else {
        api.sendMessage(`====== [ 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 ] ======\n\n𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${gio}\n𝐆𝐮̛̉𝐢 𝐭𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧: ${name}\n𝐍𝐨̣̂𝐢 𝐝𝐮𝐧𝐠:\n『 ${args.join(` `)} 』`, idThread, (error, info) => {
          if (error) cantSend.push(idThread)
        });
        count++;
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }
    return api.sendMessage(getText("sendSuccess", count), threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), threadID, messageID) : "", messageID)
  }
}
