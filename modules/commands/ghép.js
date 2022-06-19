const fs = require('fs-extra');
module.exports.config = {
  name: "ghép",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "tdunguwu mod lại by TrúcCute",
  description: "Ghép đôi với những người trong nhóm",
  commandCategory: "bổ não",
  usages: "trống",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "jimp": "",
    "path": ""
    }
}
module.exports.onLoad = async() => {
    const { resolve } = require("path");
    const { existsSync, mkdirSync } = require("fs-extra");
    const { downloadFile } = global.utils;
    const dirMaterial = __dirname + `/cache/canvas/`;
    const path = resolve(__dirname, 'cache/canvas', 'hi.png');
    if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
    if (!existsSync(path)) await downloadFile("https://i.imgur.com/HzvO3Yv.png", path);
}

async function makeImage({ one, two }) {
  var token = `6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    const path = require("path");
    const axios = require("axios"); 
    const jimp = require("jimp");
    const __root = path.resolve(__dirname, "cache", "canvas");

    let pairing_img = await jimp.read(__root + "/hi.png");
    let pathImg = __root + `/${one}_${two}.png`;
    let avatarOne = __root + `/${one}.png`;
    let avatarTwo = __root + `/${two}.png`;
    
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=`+token, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarOne, Buffer.from(getAvatarOne, 'utf-8'));
    
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=`+token, { responseType: 'arraybuffer' })).data;
    fs.writeFileSync(avatarTwo, Buffer.from(getAvatarTwo, 'utf-8'));
    
    let circleOne = await jimp.read(await circle(avatarOne));
    let circleTwo = await jimp.read(await circle(avatarTwo));
    pairing_img.composite(circleOne.resize(95, 95), 345, 90).composite(circleTwo.resize(85, 85), 250, 140);
    
    let raw = await pairing_img.getBufferAsync("image/png");
    
    fs.writeFileSync(pathImg, raw);
    fs.unlinkSync(avatarOne);
    fs.unlinkSync(avatarTwo);
    
    return pathImg;
}
async function circle(image) {
    const jimp = require("jimp");
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
}
module.exports.run = async function({ api, event, args, Users }) {
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

  let mung = [
    "Chúc 2 bạn trăm năm hạnh phút",
    "Chúc 2 bạn xây dựng được 1 tổ ấm hạnh phúc",
    "Chúc 2 bạn cùng nhau nương tựa đến cuối đời",
    "Chúc 2 bạn hạnh phúc"
  ]
  let chuc = mung[Math.floor(Math.random() * mung.length)]

  let id = data[Math.floor(Math.random() * data.length)]
    let tile = Math.floor(Math.random() * 101)
  var name = await Users.getNameUser(senderID);
  var name2 = await Users.getNameUser(id)
  
var one = senderID, two = id;
    return makeImage({ one, two }).then(path => api.sendMessage({ body: `💖Ghép thành công\n${chuc}\nTỉ lệ hợp nhau là: ${tile}%\n${name} ❤\n${name2} ❤️`, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID));
    }
