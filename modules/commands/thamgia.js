module.exports.config = {
 name: "thamgia",
 version: "1.0.0", 
 hasPermssion: 0,
 credits: "cherry",//ntkhang fix :( 
 description: "...",
 commandCategory: "Lệnh admin/qtv", 
 usages: "bủh", 
 cooldowns: 0,
 dependencies: {
   "request": "",
   "fs-extra":"",
   "axios":""
}};
module.exports.handleReply = async ({ event, api, handleReply, Threads }) => {
    var { threadID, messageID, body, senderID } = event;
    var { threadList, author } = handleReply;
    if (senderID != author) return;
    api.unsendMessage(handleReply.messageID);
    if (!body || !parseInt(body)) return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐩𝐡𝐚̉𝐢 𝐥𝐚̀ 𝐦𝐨̣̂𝐭 𝐬𝐨̂́.', threadID, messageID);
    if (!threadList[parseInt(body) - 1]) return api.sendMessage("𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐧𝐚̆̀𝐦 𝐭𝐫𝐨𝐧𝐠 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡", threadID, messageID);
    else {
        try {
            var threadInfo = threadList[parseInt(body) - 1];
            var { participantIDs } = threadInfo;
            if (participantIDs.includes(senderID)) return api.sendMessage('𝐁𝐚̣𝐧 𝐝𝐚̃ 𝐜𝐨́ 𝐦𝐚̣̆𝐭 𝐭𝐫𝐨𝐧𝐠 𝐧𝐡𝐨́𝐦 𝐧𝐚̀𝐲.', threadID, messageID);
            api.addUserToGroup(senderID, threadInfo.threadID, (e) => {
              if (e) api.sendMessage(`𝐗𝐚̉𝐲 𝐫𝐚 𝐥𝐨̂̃𝐢: ${e.errorDescription}`, threadID, messageID);
              else api.sendMessage(`𝐁𝐨𝐭 𝐯𝐮̛̀𝐚 𝐭𝐡𝐞̂𝐦 𝐛𝐚̣𝐧 𝐯𝐚̀𝐨 𝐧𝐡𝐨́𝐦 ${threadInfo.name} 𝐫𝐨̂̀𝐢 𝐧𝐡𝐚. 𝐊𝐢𝐞̂̉𝐦 𝐭𝐫𝐚 𝐨̛̉ 𝐦𝐮̣𝐜 𝐬𝐩𝐚𝐦 𝐡𝐨𝐚̣̆𝐜 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐜𝐡𝐨̛̀ 𝐧𝐞̂́𝐮 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐚̂́𝐲 𝐛𝐨𝐱 𝐧𝐡𝐚.`, threadID, messageID);
            });
        }
        catch (error) {
            return api.sendMessage(`𝐋𝐨̂̃𝐢: ${error}`, threadID, messageID);
        }
    }
};

module.exports. run = async function({ api, event, Threads }) {
    var { threadID, messageID, senderID } = event;
    var allThreads = (await api.getThreadList(500, null, ["INBOX"])).filter(i => i.isGroup),
    msg = `𝐃𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐭𝐚̂́𝐭 𝐜𝐚̉ 𝐜𝐚́𝐜 𝐛𝐨𝐱 𝐛𝐚̣𝐧 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐭𝐡𝐚𝐦 𝐠𝐢𝐚:\n\n`,
    number = 0;
    for (var thread of allThreads) {
        number++;
        msg += `${number}. ${thread.name}\n`;
    }
    msg += `\n𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐤𝐞̀𝐦 𝐬𝐨̂́ 𝐭𝐮̛𝐨̛𝐧𝐠 𝐮̛́𝐧𝐠 𝐯𝐨̛́𝐢 𝐛𝐨𝐱 𝐦𝐚̀ 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 𝐯𝐚̀𝐨.`;
    return api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config. name,
            messageID: info.messageID,
            author: senderID,
            threadList: allThreads
       
        });
    }, messageID);
};
