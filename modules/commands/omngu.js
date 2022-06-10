const request = require("request");
const fs = require("fs");
module.exports.config = {
  name: "omngu",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "huy hoàng và hoàng mod by Kaiser mod thêm by TrúcCute",
  description: "Ôm ny bạn đi ngủ",
  commandCategory: "Giải Trí",
  usages: "[Tag/reply/id]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "request": ""
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
  var link = ["https://i.imgur.com/YfyVp3P.gif"];
  var callback = () =>
    api.sendMessage(
      {
        body: `${name} , 𝐧𝐠𝐮̉ 𝐧𝐠𝐨𝐧 𝐧𝐡𝐚 𝐛𝐛𝐢 💕`,
        attachment: fs.createReadStream(__dirname + "/cache/omngu.gif")
      }, threadID,
      () => fs.unlinkSync(__dirname + "/cache/omngu.gif")
    );
  return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
    .pipe(fs.createWriteStream(__dirname + "/cache/omngu.gif"))
    .on("close", () => callback());
}
