const request = require("request");
const fs = require("fs-extra");
module.exports.config = {
  name: "ôm",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Lê Định mod thêm by TrúcCute",
  description: "ôm người Bạn Muốn",
  commandCategory: "Tình yêu",
  usages: "[id/tag/reply]",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": ""
  }
}

module.exports.run = async ({ api, event, Users, args }) => {
  const { threadID, messageID, senderID, type, mentions, messageReply } = event;
   if (type == "message_reply") {
      uid = messageReply.senderID
   } else if (args.join().indexOf('@') !== -1) {
        var uid = Object.keys(mentions)[0]
   } else if (args.join().indexOf('1000') !== -1) {
        uid = `${args[0]}`
   } else {
     var uid = senderID
   }
    let name = await Users.getNameUser(uid)
        var link = [
          "https://i.imgur.com/HvJmLSI.gif",
             ];
   var callback = () => api.sendMessage({body: `${name} à 💌, 𝐈 𝐥𝐨𝐯𝐞 𝐘𝐨𝐮 💗` , 
  attachment: fs.createReadStream(__dirname + "/cache/omngu.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/omngu.gif"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/omngu.gif")).on("close",() => callback());
}
