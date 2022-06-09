module.exports.config = {
  name: "bot",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "Lmao tủn tủn",
  description: "nhắc bot cái ầu uồi:)))",
  commandCategory: "Bổ não",
  usages: "[trống]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ api, event, Users }) => {
  const cc = [
    "kêu tui là yêu tui đó nhá <3", 
    "kêu tui chuyện gì vậy <3", 
    "có yêu admin tui hong mà kêu tui😾", 
    "donate cho admin tui có kinh phí nuôi bồ đi><", 
    "gọi nữa tui ban đó nha><",
    "donate 20k cho admin tui đi 🥺",
    "bạn có biết admin tui rất đẹp trai=))"
  ];
  let name = await Users.getNameUser(event.senderID)
  if (event.body.toLowerCase() == "bot"){ 
    return api.sendMessage(
      name + ` ${cc[Math.floor(Math.random() * cc.length)]}`
      , event.threadID, event.messageID)
  }
  if (event.body.toLowerCase() == "đmm bot") {
    return api.sendMessage("Không thích xài thì đừng tag ok?", event.threadID, () =>    api.removeUserFromGroup(api.getCurrentUserID(), event.threadID));
  }
  if (event.body.toLowerCase() == "bot như cặc") {
    return api.sendMessage("Không thích xài thì đừng tag ok?", event.threadID, () =>    api.removeUserFromGroup(api.getCurrentUserID(), event.threadID));
    }
  if (event.body.toLowerCase() == "kích bot") {
    return api.sendMessage("Không thích xài thì đừng tag ok?", event.threadID, () =>    api.removeUserFromGroup(api.getCurrentUserID(), event.threadID));
  }
  if (event.body.toLowerCase() == "bot cặc") {
    return api.sendMessage("Không thích xài thì đừng tag ok?", event.threadID, () =>    api.removeUserFromGroup(api.getCurrentUserID(), event.threadID));
  }
  if (event.body.toLowerCase() == "bot như lồn") {
    return api.sendMessage("Không thích xài thì đừng tag ok?", event.threadID, () =>    api.removeUserFromGroup(api.getCurrentUserID(), event.threadID));
  }
}

module.exports.run = async ({ api, event, Users }) => {
  let name = await Users.getNameUser(event.senderID)
  return api.sendMessage(name + ' biết xài không hả', event.threadID, event.messageID)
}
