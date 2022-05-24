module.exports.config = {
	name: "uid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Lấy ID người dùng.",
	commandCategory: "other",
	cooldowns: 5
};

module.exports.run = function({ api, event }) {
  const { threadID, messageID, mentions, type, senderID, messageReply  } = event;
  if(type == "message_reply"){ 
    id = messageReply.senderID
    return api.sendMessage(id, threadID, messageID)
}
	if (Object.keys(mentions) == 0) return api.sendMessage(`${senderID}`, threadID, messageID);
	else {
		for (var i = 0; i < Object.keys(mentions).length; i++) api.sendMessage(`${Object.values(mentions)[i].replace('@', '')}: ${Object.keys(mentions)[i]}`, threadID);
		return;
	}
}
