module.exports.config = {
    name: "tx",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Chơi tài xỉu",
    commandCategory: "Giải trí",
    usages: "[tài/xỉu]",
    cooldowns: 5
};
module.exports.run = async function ({ api, event, args, Currencies, Users }) {
    const { senderID, messageID, threadID } = event;
    const axios = require('axios');
    const fs = require("fs-extra");
	  const gai = ["Người không chơi là người thắng",
				   "Đen tình nhưng dell đỏ bạc=))",
				   "Cờ bạc là bác thằng bần",
				   "Cờ bạc có thể giúp bạn đổi đời và ngược lại=))",
                   "Đen tình đỏ bạc",
                   "Cờ bạc là nguyên tắc vốn có của bản chất con người.",
                   "Cờ bạc là con đẻ của sự ham tiền, anh em của bất công và cha của điều hại.",
                   "Đánh bạc quen tay, ngủ ngày quen mắt, ăn vặt quen mồm.",
                   "Nhỏ mà cờ bạc, lớn lên chỉ có ăn mày.",
                   "Cờ bạc ai thua, ai thắng, ai không thắng để rồi lại sẽ thua.",
                 "Mày ngu, mày chết mẹ mày đi",
                 "Suốt ngày chỉ biết cờ bạc",
                   "Tiền bán, tiền buôn thì cất trong nhà. Còn tiền cờ bạc thì ra ngoài đường.",
                   "Không có người nào luôn thua trong đánh bài, chỉ có những người chưa biết cách để chiến thắng mà thôi."
                  ];
    const dataMoney = await Currencies.getData(senderID);
    const moneyUser = dataMoney.money;
    if (!args[0]) return api.sendMessage("Bạn phải cược tài hoặc xỉu...", threadID, messageID);
    const choose = args[0]
    if (choose.toLowerCase() != 'tài' && choose.toLowerCase() != 'xỉu') return api.sendMessage("Chỉ đặt cược tài hoặc x���u!", threadID, messageID)
    const money = args[1]
    if (money < 50 || isNaN(money)) return api.sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 50$!!!", threadID, messageID);
    if (moneyUser < money) return api.sendMessage(`⚡️Số dư bạn không đủ ${money}$ để có thể chơi`, threadID, messageID);
    try {
        const res = (await axios.get(`https://manhict.tech/game/v1/taixiu`)).data
        const image = [];
        const result = res.result;
        if(result == false) result = '3 mặt cùng loại';
        for (let i in res.images) {
            var path = __dirname + `/cache/${i}.png`;
            var img = (await axios.get(`${res.images[i]}`, { responseType: "arraybuffer" })).data;
            fs.writeFileSync(path, Buffer.from(img, "utf-8"));
            image.push(fs.createReadStream(path));
        }
        if (choose.toLowerCase() == result) {
            await Currencies.increaseMoney(senderID, parseInt(money * 1));
            api.sendMessage({ body: `🏮──── •🎲• ────🏮\n🎋𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐭𝐡𝐚̆́𝐧𝐠 𝐥𝐨̛́𝐧\n🧧𝐆𝐨𝐦 𝐯𝐞̂̀: ${money*1} 𝐕𝐍𝐃\n🍀𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉: ${result}\n🏮──── •🎲• ────🏮\n[⚜️] ${gai[Math.floor(Math.random() * gai.length)]}`, attachment: image }, threadID, messageID);
        } else {
            await Currencies.decreaseMoney(senderID, parseInt(money));
            api.sendMessage({ body: `🏮──── •🎲• ────🏮\n🎋𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐭𝐡𝐮𝐚 𝐬𝐚̂́𝐩 𝐦𝐚̣̆𝐭\n🧨𝐁𝐚𝐲 𝐦𝐞̣: ${money} 𝐕𝐍𝐃\n🍀𝐊𝐞̂́𝐭 𝐪𝐮𝐚̉: ${result}\n🏮──── •🎲• ────🏮\n[⚜️] ${gai[Math.floor(Math.random() * gai.length)]}`, attachment: image}, threadID, messageID);
        }
        for(var i = 0; i < image.length; i++) {
            fs.unlinkSync(__dirname + `/cache/${i}.png`);
        }
    } catch(e) {
        console.log(e);
        return api.sendMessage('😌Vui lòng chờ!\n🎋lỗi không mong muốn, bot sẽ được thay api sớm nhất có thể để không ngắt sự trải nghiệm của bạn ', threadID, messageID);
    }
}
