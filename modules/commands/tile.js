module.exports.config = {
  name: "tile",
  version: "1.1.0",
  hasPermssion: 0,
  credits: "D-Jukie mod reply by TrúcCute",//làm lại code cho dễ nhìn by TrúcCute
  description: "xem tile",
  commandCategory: "bổ não",
  usages: "tag/reply",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  }
}

module.exports.run = async ({ api, event, Users, args }) => {
  let axios = require('axios');
  let fs = require('fs-extra');
  let request = require('request');
  let { threadID, messageID, senderID, mentions, messageReply, type } = event;
  if (type == "message_reply") {
    uid = messageReply.senderID
  } else {
    uid = Object.keys(mentions)[0]
  }
  if (!uid) {
    return api.sendMessage('Vui tag hoặc reply để xem tile', threadID, messageID)
  }
  let name = await Users.getNameUser(senderID);
  let name2 = await Users.getNameUser(uid);
  let tile = Math.floor(Math.random() * 101);
  let avt1 = (await axios.get(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {responseType: "arraybuffer"})).data;
  fs.writeFileSync(__dirname+ '/cache/1.png', Buffer.from(avt1, 'utf-8'));
  let avt2 = (await axios.get(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, {responseType: "arraybuffer"})).data;
  fs.writeFileSync(__dirname+ '/cache/2.png', Buffer.from(avt2, 'utf-8'));
  let tim = (await axios.get(`https://i.imgur.com/0lgB4WG.png`, {responseType: "arraybuffer"})).data;
  fs.writeFileSync(__dirname+ '/cache/3.png', Buffer.from(tim, 'utf-8'));
  let c = [];
  c.push(fs.createReadStream(__dirname+ '/cache/1.png'));
  c.push(fs.createReadStream(__dirname+ '/cache/3.png'));
  c.push(fs.createReadStream(__dirname+ '/cache/2.png'));
  return api.sendMessage({body: `💟===💟Tỉ lệ hợp nhau💟===💟\nBạn: ${name} ❤️\n⠀⠀⠀⠀ ⠀⠀⠀ 😘\nNgười ấy: ${name2} ❤️\nLà: ${tile}%\n======🔥=========🔥======`, attachment: c}, threadID)
    }
