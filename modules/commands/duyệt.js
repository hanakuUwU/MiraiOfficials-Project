const fs = require("fs-extra");
module.exports.config = {
  name: "duyệt",
  version: "1.1.0",
  credits: "CatalizCS mod by Kadeer",
  hasPermssion: 2,
  description: "Quản lý tin nhắn chờ của bot",
  commandCategory: "admin",
  usages: "[u] [t] [a]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "request": ""
  }
}

module.exports.onLoad = () => {
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "rankup.mp4")) request("https://i.imgur.com/Ivwedgp.mp4").pipe(fs.createWriteStream(dirMaterial + "rankup.mp4"));
}
module.exports.handleReply = async function({ api, event, handleReply, getText }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;
    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`❯ ${singleIndex} 𝐊𝐡𝐨̂𝐧𝐠 𝐏𝐡𝐚̉𝐢 𝐋𝐚̀ 𝐌𝐨̣̂𝐭 𝐂𝐨𝐧 𝐒𝐨̂́ 𝐇𝐨̛̣𝐩 𝐋𝐞̣̂`, threadID, messageID);
        }
        return api.sendMessage(`❯ 𝐓𝐮̛̀ 𝐂𝐡𝐨̂́𝐢 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠`, threadID, messageID);
    }
    else {
        const index = body.split(/\s+/);  
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`❯ ${singleIndex} Không Phải Là Một Con Số Hợp Lệ`, threadID, messageID);
            api.unsendMessage(handleReply.messageID);
            api.changeNickname(`『 ${global.config.PREFIX} 』 ♡ ${(!global.config.BOTNAME) ? "This bot is made by GK" : global.config.BOTNAME}`, handleReply.pending[singleIndex - 1].threadID, api.getCurrentUserID());
            api.sendMessage("", event.threadID, () => api.sendMessage({body:`🔱🪂𝗣𝗵𝗲̂ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴✅\n\n❯ 𝑩𝒂̂𝒚 𝑯 𝑩𝒐𝒙 𝑪𝒖̉𝒂 𝑩𝒂̣𝒏 𝑪𝒐́ 𝑻𝒉𝒆̂̉ 𝑺𝒖̛̉ 𝑫𝒖̣𝒏𝒈 𝑩𝒐𝒕\n❯ 𝑺𝒖̛̉ 𝒅𝒖̣𝒏𝒈 ${global.config.PREFIX}𝙢𝙚𝙣𝙪 𝒉𝒐𝒂̣̆𝒄 ${global.config.PREFIX}𝙝𝙚𝙡𝙥 đ𝒆̂̉ 𝒃𝒊𝒆̂́𝒕 𝒕𝒐𝒂̀𝒏 𝒃𝒐̣̂ 𝒍𝒆̣̂𝒏𝒉 𝒄𝒐́ 𝒎𝒂̣̆𝒕 𝒕𝒓𝒆̂𝒏 𝒃𝒐𝒕 𝒏𝒂̀𝒚\n『 𝐃𝐮̀𝐧𝐠 𝐜𝐚𝐥𝐥𝐚𝐝 𝐛𝐚́𝐨 𝐜𝐡𝐨 𝐀𝐝𝐦𝐢𝐧𝐁𝐨𝐭 𝐧𝐞̂́𝐮 𝐜𝐨́ 𝐥𝐨̂̃𝐢 』`, attachment: fs.createReadStream(__dirname + "/noprefix/rankup.mp4")} ,handleReply.pending[singleIndex - 1].threadID));
            count+=1;
        }
        return api.sendMessage(`❯ 𝐏𝐡𝐞̂ 𝐃𝐮𝐲𝐞̣̂𝐭 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠`, threadID, messageID);
    }
}
module.exports.run = async function({ api, event, args, permission, handleReply }) {
        if (args.join() == "") {api.sendMessage("❯ 𝐁𝐚̣𝐧 𝐂𝐨́ 𝐓𝐡𝐞̂̉ 𝐃𝐮̀𝐧𝐠 𝐃𝐮𝐲𝐞̣̂𝐭:\n❯ 𝐃𝐮𝐲𝐞̣̂𝐭 𝐮𝐬𝐞𝐫: 𝐇𝐚̀𝐧𝐠 𝐂𝐡𝐨̛̀ 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠\n❯ 𝐃𝐮𝐲𝐞̣̂𝐭 𝐭𝐡𝐫𝐞𝐚𝐝: 𝐇𝐚̀𝐧𝐠 𝐂𝐡𝐨̛̀ 𝐍𝐡𝐨́𝐦\n❯ 𝐃𝐮𝐲𝐞̣̂𝐭 𝐚𝐥𝐥: 𝐓𝐚̂́𝐭 𝐂𝐚̉ 𝐓𝐡𝐫𝐞𝐚𝐝 & 𝐔𝐬𝐞𝐫 𝐃𝐚𝐧𝐠 𝐂𝐡𝐨̛̀ 𝐃𝐮𝐲𝐞̣̂𝐭",event.threadID, event.messageID);
    }
        const content = args.slice(1, args.length);   
     switch (args[0]) {
    case "user":
    case "u":
    case "-u":
    case "User": {
    const permission = ["100036947774673", "100056953105174"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
    const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("❯ 𝐊𝐡𝐨̂𝐧𝐠 𝐓𝐡𝐞̂̉ 𝐋𝐚̂́𝐲 𝐃𝐚𝐧𝐡 𝐒𝐚́𝐜𝐡 𝐂𝐡𝐨̛̀", threadID, messageID) }
      const list = [...spam, ...pending].filter(group => group.isGroup == false);
    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;
    if (list.length != 0) return api.sendMessage(`❯ 𝐓𝐨̂̉𝐧𝐠 𝐒𝐨̂́ 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠 𝐂𝐚̂̀𝐧 𝐃𝐮𝐲𝐞̣̂𝐭: ${list.length} 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠\n\n${msg}\n❯ 𝐑𝐞𝐩𝐥𝐲 𝐒𝐨̂́ 𝐓𝐡𝐮̛́ 𝐓𝐮̛̣ 𝐂𝐚̂̀𝐧 𝐃𝐮𝐲𝐞̣̂𝐭`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("❯ 𝐇𝐢𝐞̣̂𝐧 𝐓𝐚̣𝐢 𝐊𝐡𝐨̂𝐧𝐠 𝐂𝐨́ 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠 𝐍𝐚̀𝐨 𝐓𝐫𝐨𝐧𝐠 𝐇𝐚̀𝐧𝐠 𝐂𝐡𝐨̛̀", threadID, messageID);
}
    case "thread":
    case "-t":
    case "t":
    case "Thread": {
   const permission = ["100036947774673", "100056953105174"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("❯ 𝐊𝐡𝐨̂𝐧𝐠 𝐓𝐡𝐞̂̉ 𝐋𝐚̂́𝐲 𝐃𝐚𝐧𝐡 𝐒𝐚́𝐜𝐡 𝐂𝐡𝐨̛̀", threadID, messageID) }
    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;
    if (list.length != 0) return api.sendMessage(`❯ 𝐓𝐨̂̉𝐧𝐠 𝐒𝐨̂́ 𝐍𝐡𝐨́𝐦 𝐂𝐚̂̀𝐧 𝐃𝐮𝐲𝐞̣̂𝐭: ${list.length} 𝐍𝐡𝐨́𝐦 \n${msg}\n❯ 𝐑𝐞𝐩𝐥𝐲 𝐒𝐨̂́ 𝐓𝐡𝐮̛́ 𝐓𝐮̛̣ 𝐂𝐚̂̀𝐧 𝐃𝐮𝐲𝐞̣̂𝐭`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("❯ 𝐇𝐢𝐞̣̂𝐧 𝐓𝐚̣𝐢 𝐊𝐡𝐨̂𝐧𝐠 𝐂𝐨́ 𝐍𝐡𝐨́𝐦 𝐍𝐚̀𝐨 𝐓𝐫𝐨𝐧𝐠 𝐇𝐚̀𝐧𝐠 𝐂𝐡𝐨̛̀", threadID, messageID);
        }
    case "all":
    case "a":
    case "-a":
    case "al": {
    const permission = ["100036947774673", "100056953105174"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("❯ 𝐊𝐡𝐨̂𝐧𝐠 𝐓𝐡𝐞̂̉ 𝐋𝐚̂́𝐲 𝐃𝐚𝐧𝐡 𝐒𝐚́𝐜𝐡 𝐂𝐡𝐨̛̀", threadID, messageID) }
            const listThread = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
        const listUser = [...spam, ...pending].filter(group => group.isGroup == false)
    const list = [...spam, ...pending].filter(group => group.isSubscribed);
    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;
    if (list.length != 0) return api.sendMessage(`❯ 𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐔𝐬𝐞𝐫 & 𝐓𝐡𝐫𝐞𝐚𝐝 𝐂𝐚̂̀𝐧 𝐃𝐮𝐲𝐞̣̂𝐭: ${list.length} 𝐔𝐬𝐞𝐫 & 𝐓𝐡𝐫𝐞𝐚𝐝 \n${msg}\n❯ 𝐑𝐞𝐩𝐥𝐲 𝐒𝐨̂́ 𝐓𝐡𝐮̛́ 𝐓𝐮̛̣ 𝐂𝐚̂̀𝐧 𝐃𝐮𝐲𝐞̣̂𝐭`, threadID, (error, info) => {
        global.client.handleReply.push({
            name: commandName,
            messageID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("❯ 𝐇𝐢𝐞̣̂𝐧 𝐓𝐚̣𝐢 𝐊𝐡𝐨̂𝐧𝐠 𝐂𝐨́ 𝐔𝐬𝐞𝐫 & 𝐓𝐡𝐫𝐞𝐚𝐝 𝐍𝐚̀𝐨 𝐓𝐫𝐨𝐧𝐠 𝐇𝐚̀𝐧𝐠 𝐂𝐡𝐨̛̀", threadID, messageID);
        }
    }       
}
