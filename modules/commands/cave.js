const fs = require("fs-extra");
module.exports.config = {
    name: "cave",
    version: "1.0.2",
    hasPermssion: 0,
    credits: "⚡D-Jukie", 
    description: "Làm việc để có tiền, có làm thì mới có ăn",
    commandCategory: "Economy",
    cooldowns: 5,
    envConfig: {
        cooldownTime: 1000000
    }
};
module.exports.onLoad = () => {
    const request = require("request");
    const dirMaterial = __dirname + `/cache/`;
    if (!fs.existsSync(dirMaterial + "cache")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "work.jpeg")) request("https://i.imgur.com/pPw9hY9.jpeg").pipe(fs.createWriteStream(dirMaterial + "work.jpeg"));
}
module.exports.languages = {
    "vi": {
        "cooldown": "⚡️Bạn vừa đjt xong để tránh mệt, hãy quay lại sau: %1 phút %2 giây nữa"      
    },
    "en": {
        "cooldown": "⚡️You're done, come back later: %1 minute(s) %2 second(s)."
    }
}
module.exports.handleReply = async ({ event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    let data = (await Currencies.getData(senderID)).data || {};
var coinsdd1 = Math.floor(Math.random() * 801) + 50000; //random coins khi đào đá

//random công việc cần làm
var rddd1 = ['khách vip', 'khách quen', 'người lạ', 'thằng ngu tầm 23 tuổi', 'anh lạ mặt', 'khách quen', 'đại gia 92 tuổi', 'thằng nhóc 12 tuổi']; //random công việc khi đào đá
var work6 = rddd1[Math.floor(Math.random() * rddd1.length)];


var msg = "";
    switch(handleReply.type) {
        case "choosee": {
            
            switch(event.body) {
                case "1": msg = `⚡️Bạn được ${work6} cho ${coinsdd1}$ nếu xxx 1 đêm, thế là bạn đồng ý ngay :)))` ; Currencies.increaseMoney(event.senderID, coinsdd1); break;             
                case "2": msg = `⚡️Bạn được ${work6} cho ${coinsdd1}$ nếu xxx 1 đêm, thế là bạn đồng ý ngay :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "3": msg = `⚡️Bạn được ${work6} cho ${coinsdd1}$ nếu xxx 1 đêm, thế là bạn đồng ý ngay :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "4": msg = `⚡️Bạn được ${work6} cho ${coinsdd1}$ nếu xxx 1 đêm, thế là bạn đồng ý ngay :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "5": msg = `⚡️Bạn được ${work6} cho ${coinsdd1}$ nếu xxx 1 đêm, thế là bạn đồng ý ngay :)))` ; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "6": msg = `⚡️Bạn được ${work6} cho ${coinsdd1}$ nếu xxx 1 đêm, thế là bạn đồng ý ngay :)))`; Currencies.increaseMoney(event.senderID, coinsdd1); break;
                case "7": msg = "⚡️Chưa update..."; break; //thêm case nếu muốn 
                default: break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return api.sendMessage("⚡️Vui lòng nhập 1 con số", event.threadID, event.messageID);
            if (choose > 7 || choose < 1) return api.sendMessage("⚡️Lựa chọn không nằm trong danh sách.", event.threadID, event.messageID); //thay số case vào số 7
            api.unsendMessage(handleReply.messageID);
            if (msg == "⚡️Chưa update...") {
                msg = "⚡️Update soon...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            data.work2Time = Date.now();
            await Currencies.setData(senderID, { data });
            
        });

    };
}
}
module.exports.run = async ({  event, api, handleReply, Currencies, getText }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = global.configModule[this.config.name].cooldownTime;
    let data = (await Currencies.getData(senderID)).data || {};
    //cooldownTime cho mỗi lần nhận 
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.work2Time) > 0) {

        var time = cooldown - (Date.now() - data.work2Time),
            minutes = Math.floor(time / 600000),
            seconds = ((time % 600000) / 10000).toFixed(0); 
        return api.sendMessage(getText("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage({body:
        "🏮===𝐏𝐇𝐎̂́ 𝐇𝐎𝐀 𝐊𝐈𝐄̂̀𝐔===🏮" +
        "\n\n𝟏. 𝐏𝐡𝐨̂́ 𝐓𝐫𝐚̂̀𝐧 𝐃𝐮𝐲 𝐇𝐮̛𝐧𝐠 🎀" +
        "\n𝟐. 𝐂𝐚̂̀𝐮 𝐓𝐡𝐢̣ 𝐍𝐠𝐡𝐞̀ 💦" +
        "\n𝟑. 𝐇𝐨̂̀ 𝐇𝐨𝐚̀𝐧 𝐊𝐢𝐞̂́𝐦 🍄" +
        "\n𝟒. 𝐓𝐢̣𝐧𝐡 𝐓𝐡𝐚̂́𝐭 𝐁𝐨̂̀𝐧𝐠 𝐋𝐚𝐢" +
        "\n𝟓. 𝐏𝐡𝐨̂́ 𝐓𝐚𝐦 𝐓𝐫𝐢𝐧𝐡 🐥" +
        "\n𝟔. 𝐊𝐡𝐚́𝐜𝐡 𝐒𝐚̣𝐧 𝐘 𝐍𝐮 💈" +
        "\n\n𝐇𝐚̃𝐲 𝐑𝐞𝐩𝐥𝐚𝐲 𝐒𝐓𝐓 𝐂𝐡𝐨̣𝐧 𝐊𝐡𝐮 𝐕𝐮̛̣𝐜 𝐇𝐚̀𝐧𝐡 𝐍𝐠𝐡𝐞̂̀ ❤️"
        ,attachment: fs.createReadStream(__dirname + `/cache/work.jpeg`)}, event.threadID, (error, info) => {
                data.work2Time = Date.now();
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}
