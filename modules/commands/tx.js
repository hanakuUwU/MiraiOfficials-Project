module.exports.config = {
  name: "tx",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Chơi tài xỉu",
  commandCategory: "Giải trí",
  usages: "[tài/xỉu]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": ""
  }
}

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
  const { senderID, messageID, threadID } = event;
  const axios = require('axios');
  const fs = require("fs-extra");
  const dataMoney = await Currencies.getData(senderID);
  const moneyUser = dataMoney.money;
  if (!args[0]) return api.sendMessage("Bạn phải cược tài hoặc xỉu...", threadID, messageID);
  const choose = args[0]
  if (choose.toLowerCase() != 'tài' && choose.toLowerCase() != 'xỉu') return api.sendMessage("Chỉ đặt cược tài hoặc xỉu!", threadID, messageID)
  const money = args[1]
  if (money < 50 || isNaN(money)) return api.sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 50$!!!", threadID, messageID);
  if (moneyUser < money) return api.sendMessage(`⚡️Số dư bạn không đủ ${money}$ để có thể chơi`, threadID, messageID);
  try {
    const res = (await axios.get(`https://apitaixiu2.miraiofficials123.repl.co/`)).data
    const image = [];
    const result = res.result;
    if(result == false) result = '3 mặt cùng loại';
    for (let i in res.images) {
      var path = __dirname + `/cache/${i}.jpg`;
      var img = (await axios.get(`${res.images[i]}`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(path, Buffer.from(img, "utf-8"));
      image.push(fs.createReadStream(path));
      }
    if (choose.toLowerCase() == result) {
      await Currencies.increaseMoney(senderID, parseInt(money * 1));
      api.sendMessage({ body: `🏮──── •🎲• ────🏮\n🎋𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐭𝐡𝐚̆́𝐧𝐠 𝐥𝐨̛́𝐧\n🧧𝐆𝐨𝐦 𝐯𝐞̂̀: ${money*1} 𝐕𝐍𝐃\n🍀𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉: ${result}\n🏮──── •🎲• ────🏮`, attachment: image }, threadID, messageID);
      } else {
      await Currencies.decreaseMoney(senderID, parseInt(money));
      api.sendMessage({ body: `🏮──── •🎲• ────🏮\n🎋𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐭𝐡𝐮𝐚 𝐬𝐚̂́𝐩 𝐦𝐚̣̆𝐭\n🧨𝐁𝐚𝐲 𝐦𝐞̣: ${money} 𝐕𝐍𝐃\n🍀𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉: ${result}\n🏮──── •🎲• ────🏮`, attachment: image}, threadID, messageID);
      }
    for(var i = 0; i < image.length; i++) {
      fs.unlinkSync(__dirname + `/cache/${i}.jpg`);
      }
    } catch(e) {
    console.log(e);
    return api.sendMessage(`🎋lỗi không mong muốn, bot sẽ được sửa chữa sớm nhất có thể để không ngắt sự trải nghiệm của bạn\nDùng callad gửi lỗi về admin để được sửa nhanh nhất\n${e}`, threadID, messageID);
    }
  }
