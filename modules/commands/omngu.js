const request = require("request");
const fs = require("fs")
const axios = require("axios");
module.exports.config = {
  name: "omngu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "huy hoàng và hoàng mod by Kaiser",
  description: "Ôm ny bạn đi ngủ",
  commandCategory: "Giải Trí",
  usages: "[Tag]",
  cooldowns: 5,
};

module.exports.run = async ({
  api,
  event,
  args,
  client,
  Users,
  Threads,
  __GLOBAL,
  Currencies
}) => {
  const request = require("request");

  const fs = require("fs");

  var mention = Object.keys(event.mentions)[0];

  let tag = event.mentions[mention].replace("@", "");

  var link = ["https://i.imgur.com/YfyVp3P.gif"];

  var callback = () =>
    api.sendMessage(
      {
        body: `${tag} , 𝐧𝐠𝐮̉ 𝐧𝐠𝐨𝐧 𝐧𝐡𝐚 𝐛𝐛𝐢 💕`,

        attachment: fs.createReadStream(__dirname + "/cache/omngu.gif")
      },
      event.threadID,
      () => fs.unlinkSync(__dirname + "/cache/omngu.gif")
    );

  return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
    .pipe(fs.createWriteStream(__dirname + "/cache/omngu.gif"))
    .on("close", () => callback());
};
