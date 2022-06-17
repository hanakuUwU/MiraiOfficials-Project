module.exports.config = {
    name: "taixiu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Chơi tài xỉu",
    commandCategory: "Trò chơi",
    usages: "[tài/xỉu]",
    cooldowns: 5
};
module.exports.run = async function ({
    api,
    event,
    args,
    Currencies,
    Users
}) {
    const axios = global.nodemodule['axios'];
    const fs = global.nodemodule["fs-extra"];
    const dataMoney = await Currencies.getData(event.senderID);
    const moneyUser = dataMoney.money
    if (!args[0]) {
        return api.sendMessage("Bạn phải cược tài hoặc xỉu...", event.threadID, event.messageID)
    }
    const choose = args[0]
    if (choose != 'tài' && choose != 'xỉu') {
        api.sendMessage("Chỉ đặt cược tài hoặc xỉu!", event.threadID, event.messageID)
    }
	const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const money = args[1]
    if (money < 50 || isNaN(money)) return api.sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 50$!!!", event.threadID, event.messageID);
    if (moneyUser < money) api.sendMessage(`⚡️Số dư bạn không đủ ${money}$ để có thể chơi`, event.threadID, event.messageID);
    else {
    try {
        const res = await axios.get(`https://APITaiXiu.miraiofficials123.repl.co`);
        var data = res.data;
        var ketqua = data.ketqua
        var ketquaGame = ketqua.slice(0, 3)
        if (choose == ketquaGame) {
            pathus = __dirname + `/cache/${event.senderID}.png`
            var img = (await axios.get(`${data.image}`, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(pathus, Buffer.from(img, "utf-8"));
            await Currencies.increaseMoney(event.senderID, parseInt(money * 2))
            return api.sendMessage({
                body: `‌⠀🏮───「𝐓𝐚𝐢𝐱𝐢𝐮」───🏮\n𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐭𝐡𝐚̆́𝐧𝐠 𝐯𝐢̀ 𝐦𝐚𝐲 𝐦𝐚̆́𝐧\n𝐋𝐮̣𝐦 𝐯𝐞̂̀: ${money*2} 𝐕𝐍𝐃\n𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉: ${ketqua.charAt(0).toUpperCase() + ketqua.slice(1)}\n🏮───「${gio}」───🏮`,
                attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.png`), event.messageID)
        } else {
            pathus = __dirname + `/cache/${event.senderID}.png`
            var img = (await axios.get(`${data.image}`, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(pathus, Buffer.from(img, "utf-8"));
            await Currencies.decreaseMoney(event.senderID, parseInt(money))
            return api.sendMessage({
                body: `⠀🏮───「𝐓𝐚𝐢𝐱𝐢𝐮」───🏮\n𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐭𝐡𝐮𝐚 𝐬𝐦𝐥\n𝐁𝐚𝐲 𝐦𝐚̂́𝐭 𝐦𝐞̣: ${money} 𝐕𝐍𝐃\n𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉: ${ketqua.charAt(0).toUpperCase() + ketqua.slice(1)}\n🏮───「${gio}」───🏮`,
                attachment: fs.createReadStream(__dirname + `/cache/${event.senderID}.png`)
            }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/${event.senderID}.png`), event.messageID)
        }
    } catch {
        return api.sendMessage('Đã có lỗi xảy ra, vui lòng thử lại sau!!!', event.threadID, event.messageID);
    }
}
  }
