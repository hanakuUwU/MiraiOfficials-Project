module.exports.config = {
 name: "thamgia",
 version: "1.0.0", 
 hasPermssion: 0,
 credits: "cherry",//ntkhang fix :( 
 description: "...",
 commandCategory: "Lแปnh admin/qtv", 
 usages: "bแปงh", 
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
    if (!body || !parseInt(body)) return api.sendMessage('๐๐ฎฬฬฃ๐ ๐๐ก๐จฬฃ๐ง ๐๐ฎฬ๐ ๐๐ฬฃ๐ง ๐ฉ๐ก๐ฬ๐ข ๐ฅ๐ฬ ๐ฆ๐จฬฃฬ๐ญ ๐ฌ๐จฬฬ.', threadID, messageID);
    if (!threadList[parseInt(body) - 1]) return api.sendMessage("๐๐ฎฬฬฃ๐ ๐๐ก๐จฬฃ๐ง ๐๐ฎฬ๐ ๐๐ฬฃ๐ง ๐ค๐ก๐จฬ๐ง๐  ๐ง๐ฬฬ๐ฆ ๐ญ๐ซ๐จ๐ง๐  ๐๐๐ง๐ก ๐ฌ๐ฬ๐๐ก", threadID, messageID);
    else {
        try {
            var threadInfo = threadList[parseInt(body) - 1];
            var { participantIDs } = threadInfo;
            if (participantIDs.includes(senderID)) return api.sendMessage('๐๐ฬฃ๐ง ๐๐ฬ ๐๐จฬ ๐ฆ๐ฬฃฬ๐ญ ๐ญ๐ซ๐จ๐ง๐  ๐ง๐ก๐จฬ๐ฆ ๐ง๐ฬ๐ฒ.', threadID, messageID);
            api.addUserToGroup(senderID, threadInfo.threadID, (e) => {
              if (e) api.sendMessage(`๐๐ฬ๐ฒ ๐ซ๐ ๐ฅ๐จฬฬ๐ข: ${e.errorDescription}`, threadID, messageID);
              else api.sendMessage(`๐๐จ๐ญ ๐ฏ๐ฎฬฬ๐ ๐ญ๐ก๐ฬ๐ฆ ๐๐ฬฃ๐ง ๐ฏ๐ฬ๐จ ๐ง๐ก๐จฬ๐ฆ ${threadInfo.name} ๐ซ๐จฬฬ๐ข ๐ง๐ก๐. ๐๐ข๐ฬฬ๐ฆ ๐ญ๐ซ๐ ๐จฬฬ ๐ฆ๐ฎฬฃ๐ ๐ฌ๐ฉ๐๐ฆ ๐ก๐จ๐ฬฃฬ๐ ๐ญ๐ข๐ง ๐ง๐ก๐ฬฬ๐ง ๐๐ก๐จฬฬ ๐ง๐ฬฬ๐ฎ ๐ค๐ก๐จฬ๐ง๐  ๐ญ๐ก๐ฬฬ๐ฒ ๐๐จ๐ฑ ๐ง๐ก๐.`, threadID, messageID);
            });
        }
        catch (error) {
            return api.sendMessage(`๐๐จฬฬ๐ข: ${error}`, threadID, messageID);
        }
    }
};

module.exports. run = async function({ api, event, Threads }) {
    var { threadID, messageID, senderID } = event;
    var allThreads = (await api.getThreadList(500, null, ["INBOX"])).filter(i => i.isGroup),
    msg = `๐๐๐ง๐ก ๐ฌ๐ฬ๐๐ก ๐ญ๐ฬฬ๐ญ ๐๐ฬ ๐๐ฬ๐ ๐๐จ๐ฑ ๐๐ฬฃ๐ง ๐๐จฬ ๐ญ๐ก๐ฬฬ ๐ญ๐ก๐๐ฆ ๐ ๐ข๐:\n\n`,
    number = 0;
    for (var thread of allThreads) {
        number++;
        msg += `${number}. ${thread.name}\n`;
    }
    msg += `\n๐๐๐ฉ๐ฅ๐ฒ ๐ญ๐ข๐ง ๐ง๐ก๐ฬฬ๐ง ๐ง๐ฬ๐ฒ ๐ค๐ฬ๐ฆ ๐ฌ๐จฬฬ ๐ญ๐ฎฬ๐จฬ๐ง๐  ๐ฎฬฬ๐ง๐  ๐ฏ๐จฬฬ๐ข ๐๐จ๐ฑ ๐ฆ๐ฬ ๐๐ฬฃ๐ง ๐ฆ๐ฎ๐จฬฬ๐ง ๐ฏ๐ฬ๐จ.`;
    return api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config. name,
            messageID: info.messageID,
            author: senderID,
            threadList: allThreads
       
        });
    }, messageID);
};
