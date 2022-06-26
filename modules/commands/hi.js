let fs = require("fs-extra");
module.exports.config = {
    name: "hi",
    version: "1.2.0",
    hasPermssion: 0,
    credits: "Kanichi mod lại by TrúcCute",
    description: "noprefix",
    commandCategory: "bổ não",
    usages: "[on/off]",
    cooldowns: 5,
    denpendencies: {
      "axios": "",
      "moment-timezone": "",
      "fs-extra": ""
    }
}

module.exports.onLoad = () => {
  let request = require("request");
  let dirMaterial = __dirname + `/noprefix/`;
  if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
  if (!fs.existsSync(dirMaterial + "bai.gif")) request("https://i.imgur.com/uVALChk.gif").pipe(fs.createWriteStream(dirMaterial + "bai.gif"))
  if (!fs.existsSync(dirMaterial + "ngủ.gif")) request("https://i.pinimg.com/originals/0f/e1/16/0fe1161b019a6d11f39d267c284ec67d.gif").pipe(fs.createWriteStream(dirMaterial + "ngủ.gif"))
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let AutoUnSend = 60;// theo giây
  let { get } = require("axios");
  let { threadID, body, senderID } = event;
  let r = await get('https://apiurl.miraiofficials123.repl.co');
  let m = r.data.url;
  let cc = (await get(m, {
			responseType: "stream"
		})).data;
  let moment = require("moment-timezone");
  let hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
  let data2 = [
    "tốt lành =)",
    "vui vẻ 😄",
    "hạnh phúc ❤",
    "yêu đời 😘"
  ];
  let text = data2[Math.floor(Math.random() * data2.length)]
  let session = (
    hours > 0001 && hours <= 400 ? "sáng tinh mơ" : 
    hours > 401 && hours <= 700 ? "sáng sớm" :
    hours > 701 && hours <= 1000 ? "sáng" :
    hours > 1001 && hours <= 1200 ? "trưa" : 
    hours > 1201 && hours <= 1700 ? "chiều" : 
    hours > 1701 && hours <= 1800 ? "chiều tà" : 
    hours > 1801 && hours <= 2100 ? "tối" : 
    hours > 2101 && hours <= 2400 ? "tối muộn" : 
    "lỗi")
  let name = await Users.getNameUser(senderID)
  let msg = {body: `Xin chào ${name}, chúc bạn một buổi ${session} ${text}`, attachment: cc}
  let msg2 = {body: `𝐏𝐚𝐢 𝐛𝐚̣𝐧 ${name}, 𝐒𝐞𝐞 𝐲𝐨𝐮 𝐧𝐞𝐱𝐭 𝐭𝐢𝐦𝐞❤️`, attachment: fs.createReadStream(__dirname + `/noprefix/bai.gif`)}
  let msg3 = {body: `Chúc ${name} ngủ ngon nhé 😘`, attachment: fs.createReadStream(__dirname + `/noprefix/ngủ.gif`)}
  if (config.autoSend == true) {
    if (body.toLowerCase() == "hi") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "hii") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "hí") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "hì") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "híí"){
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "hello") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "chào") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "chao"){
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "lô") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "2") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "hê nhô") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "hê lô") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
          }
    if (body.toLowerCase() == "helo") {
      return api.sendMessage(msg, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "pai") {
        return api.sendMessage(msg2, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "bye") {
        return api.sendMessage(msg2, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "bai") {
        return api.sendMessage(msg2, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "đi ngủ đây") {
        return api.sendMessage(msg3, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "ngủ") {
        return api.sendMessage(msg3, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "đi ngủ nha") {
        return api.sendMessage(msg3, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "ngủ") {
    return api.sendMessage(msg3, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
    if (body.toLowerCase() == "ngủ ngon") {
        return api.sendMessage(msg3, threadID, (error, info) => {
        setTimeout(() => {
          api.unsendMessage(info.messageID) 
        }, AutoUnSend * 1000) 
      })
    }
  } 
}

module.exports.run = async function ({ event, api, args, Threads }) {
  let fs = require('fs-extra');
  let { configPath } = global.client;
  let { threadID } = event;
  let threadSetting = (await Threads.getData(String(threadID))).data || {};		 
  let prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  if (!args[0]) return api.sendMessage(`Bạn có thể dùng\n==> ${prefix}${this.config.name} on/o để bật thông báo\n==> ${prefix}${this.config.name} off/of để tắt thông báo`, threadID);
  if (args[0].toLowerCase() != 'on' && args[0].toLowerCase() != 'off' && args[0].toLowerCase() != 'o' && args[0].toLowerCase() != 'of') return api.sendMessage(`Chỉ xài on/off hoặc o/of`, threadID);
  switch (args[0]) {
    case 'o':
    case 'on': {
      if (config.autoSend == false) {
          config.autoSend = true;
        api.sendMessage(`[⚜️] Bật thành công gửi lời chào đến thành viên`, threadID);
      }
      fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
      break;
    }
    case 'of':
    case 'off': {
      if (config.autoSend == true) { 
          config.autoSend = false;
        api.sendMessage(`[⚜️] Tắt thành công gửi lời chào đến thành viên`, threadID);
      }
      fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
      break;
    }
    default: {
      return global.utils.throwError(this.config.name, threadID)
    }
  }
}
