module.exports.config = {
  name: "getfb",
  versions: "1.0.0",
  hasPermssion: 0,
  credits: "MiraiTeam",// mod reply by NguyenKhang
  description: "Lấy link fb",
  commandCategory: "tiện ích",
  usages: "[Trống] or [Tag]/[reply]",
  cooldowns: 5
}
module.exports.run = function({ api, event }) {
  if (event.type == "message_reply") {
    id = event.messageReply.senderID
    return api.sendMessage(`https://facebook.com/` + id,event.threadID, event.messageID)
  }
	if (Object.keys(event.mentions) == 0) return api.sendMessage(`https://facebook.com/${event.senderID}`, event.threadID, event.messageID);
  else {
		for (var i = 0; i < Object.keys(event.mentions).length; i++) api.sendMessage(`https://facebook.com/${Object.keys(event.mentions)[i]}`, event.threadID, event.messageID);
		return;
  }
}

  
