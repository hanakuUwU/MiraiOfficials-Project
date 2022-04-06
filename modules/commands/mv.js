module.exports.config = {
  name: "mv",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Kaneki",
  description: "xem ảnh hiện có trên bot",
  commandCategory: "Dành cho người dùng",
  usages: "image",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
}

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies,getText}) => {
   
   const axios = require('axios');
    const request = require('request');
    const fs = require('fs-extra');

     if (args.length == 0) return api.sendMessage(` 🎭 𝐃𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐜𝐚́𝐜 𝐯𝐢𝐝𝐞𝐨 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́  🎭 \n\n𝟏. 𝐦𝐯 𝐠𝐚́𝐢 \n𝟐. 𝐦𝐯 𝐬𝐞𝐱\n\n𝐃𝐮̀𝐧𝐠 𝐩𝐫𝐞𝐟𝐢𝐱 + 𝐦𝐯  < 𝐯𝐢𝐝𝐞𝐨 𝐛𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐱𝐞𝐦 >\n
`, event.threadID, event.messageID);

     if (args[0] == "gái") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/videogaixinh').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐕𝐢𝐝𝐞𝐨 𝐠𝐚́𝐢 𝐱𝐢𝐧𝐡 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -1000$`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
    if (args[0] == "sex") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/videosex').then(res => {
  var video = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐕𝐢𝐝𝐞𝐨 𝐬𝐞𝐱 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -1000$`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.mp4`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.mp4`), event.messageID);
        };
        request(video).pipe(fs.createWriteStream(__dirname + `/cache/boobs.mp4`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
}
