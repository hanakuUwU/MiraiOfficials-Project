module.exports.config = {
  name: "thathinh",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "",
  description: "Thả thính",
  commandCategory: "bổ não",
  usages: "[tag/reply/trống]",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
}

module.exports.run = async ({ api, event, args, Users }) => {
  let { type, messageReply, mentions, senderID, threadID, messageID } = event;
  if (type == "message_reply") {
    uid = messageReply.senderID
  } else if (args.join().indexOf('@') !== -1) {
      uid = Object.keys(mentions)[0]
  }
  let data = await api.getUserInfo(senderID),
  { gender } = data[senderID];
  let name = await Users.getNameUser(uid)
  let { get } = require('axios');
  let res = await get(`https://apithinhgender.miraiofficials123.repl.co`);
  let nam = res.data.nam;
  let nữ = res.data.nữ;
  if (type == "message_reply") {
    if (gender == 2) {
      api.sendMessage(`Gửi ${name} vài lời thính:\n${nam}`,threadID, messageID)
    }
    if (gender == 1) {
      api.sendMessage(`Gửi ${name} vài lời thính:\n${nữ}`, threadID, messageID)
    }
  } else if (args.join().indexOf('@') !== -1) {
    if (gender == 2) {
      api.sendMessage(`Gửi ${name} vài lời thính:\n${nam}`,threadID, messageID)
    }
    if (gender == 1) {
      api.sendMessage(`Gửi ${name} vài lời thính:\n${nữ}`, threadID, messageID)
    }
  } else {
     if (gender == 2) {
       api.sendMessage(`${nam}`,threadID, messageID);
     }
    if (gender == 1) {
      api.sendMessage(`${nữ}`, threadID, messageID);
    }
  }
}
