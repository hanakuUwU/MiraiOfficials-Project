module.exports.config = {
  name: "ghep",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TrúcCute",
  description: "Tìm Kiếm Nửa Kia Của Bạn",
  commandCategory: "bổ não",
  usages: "trống",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  }
}

module.exports.run = async ({ api, event, args, Users }) => {
  var token = `6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const axios = require(`axios`);
  const fs = require('fs-extra');
  const request = require('request');
  let { threadID, senderID, messageID } = event;

  let data2 = await api.getUserInfo(senderID),
    { gender } = data2[senderID];
  
    var ThreadInfo = await api.getThreadInfo(threadID);
    var all = ThreadInfo.userInfo
      let data = [];
  if(gender == 1){
    for (let u of all) {
      if (u.gender == "MALE") {
        if (u != senderID) data.push(u.id)   
      }
    }
  } else if(gender == 2){
    for (let u of all) {
      if (u.gender == "FEMALE") {
        if (u != senderID) data.push(u.id)  
      }
    }
  }
  //console.log(data)
                     
  if (data.length == 0) return api.sendMessage("⚡️Rất tiếc! Không tìm thấy nửa đời của bạn :(‌", threadID, messageID);
  let uid = data[Math.floor(Math.random() * data.length)]
    let tile = Math.floor(Math.random() * 101)
  let mung = [
    "Chúc 2 bạn trăm năm hạnh phút",
    "Chúc 2 bạn xây dựng được 1 tổ ấm hạnh phúc",
    "Chúc 2 bạn cùng nhau nương tựa đến cuối đời",
    "Chúc 2 bạn hạnh phúc"
  ]
  let chuc = mung[Math.floor(Math.random() * mung.length)]
      var name2 = (await Users.getData(uid)).name
        let name = await Users.getNameUser(senderID)
          let avt1 = (await axios.get(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=`+token, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(__dirname+ `/cache/${senderID}.png`, Buffer.from(avt1, 'utf-8'));
  
  let avt2 = (await axios.get(`https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=`+token, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(__dirname+ `/cache/${uid}.png`, Buffer.from(avt2, 'utf-8'));
  
  let tim = (await axios.get(`https://i.imgur.com/0lgB4WG.png`, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(__dirname+ '/cache/3.png', Buffer.from(tim, 'utf-8'));
  
  let c = [];
  c.push(fs.createReadStream(__dirname+ `/cache/${senderID}.png`));
  c.push(fs.createReadStream(__dirname+ '/cache/3.png'));
  c.push(fs.createReadStream(__dirname+ `/cache/${uid}.png`));
  
  return api.sendMessage({body: `💖Ghép thành công\n${chuc}\nTỉ lệ hợp nhau là: ${tile}%\n${name} ❤\n${name2} ❤️`, attachment: c}, threadID, () => 
    fs.unlinkSync(__dirname+ `/cache/${senderID}.png`), 
    fs.unlinkSync(__dirname+ `/cache/${uid}.png`), 
    fs.unlinkSync(__dirname+ `/cache/3.png`))
}
