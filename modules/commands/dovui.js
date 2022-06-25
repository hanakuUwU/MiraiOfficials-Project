let timeout = 120;
let moneydown = 1000;
let axios = require('axios');
module.exports.config = {
  name: "dovui",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Đố vui, hong vui thì thôi",   
  commandCategory: "game",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
}

module.exports.handleReply = async function ({ event, Users, api, handleReply, Currencies }) {
  let { dataGame, dapan, nameUser } = handleReply;
  let { threadID, messageID, senderID, body } = event;
  if (handleReply.author != senderID) return api.sendMessage(`Để ngta trả lời -.-`, event.threadID); 
  switch (handleReply.type) {
    case "reply": {
      let aw = body
      let dapanUser = dataGame
      let checkTrue = dapan
      let mon = parseInt(moneydown) + 500;
      if (aw.toLowerCase() == 'a' && dataGame.a == checkTrue) {
        await Currencies.increaseMoney(senderID, mon);
        api.unsendMessage(handleReply.messageID)
          return api.sendMessage({body: `✔${nameUser} đã trả lời chính xác!\nSố tiền thu về là ${mon} VNĐ\nĐáp án: ${checkTrue}`}, threadID, messageID)   
      } else if (aw.toLowerCase() == 'b' && dataGame.b == checkTrue) { 
        await Currencies.increaseMoney(senderID, mon);
                api.unsendMessage(handleReply.messageID)
         return api.sendMessage({body: `✔${nameUser} đã trả lời chính xác!\nSố tiền thu về là ${mon} VNĐ\nĐáp án: ${checkTrue}`}, threadID, messageID)
      } else if (aw.toLowerCase() == 'c' && dataGame.c == checkTrue) {
        await Currencies.increaseMoney(senderID, mon);
                api.unsendMessage(handleReply.messageID)
         return api.sendMessage({body: `✔${nameUser} đã trả lời chính xác!\nSố tiền thu về là ${mon} VNĐ\nĐáp án: ${checkTrue}`}, threadID, messageID)
      } else if (aw.toLowerCase() == 'd' && dataGame.d == checkTrue) {
        await Currencies.increaseMoney(senderID, mon);
                api.unsendMessage(handleReply.messageID)
         return api.sendMessage({body: `✔${nameUser} đã trả lời chính xác!\nSố tiền thu về là ${mon} VNĐ\nĐáp án: ${checkTrue}`}, threadID, messageID)
      } else {
        await Currencies.decreaseMoney(senderID, moneydown);
            api.unsendMessage(handleReply.messageID)
              api.sendMessage(`✘Tiếc quá! ${nameUser} trả lời sai rồi!!!\nĐáp án chính xác là: ${dapan}\nBị trừ mất ${moneydown} VNĐ!!`, threadID);
      }
    }
  }
}

module.exports.handleReaction = async function ({ Users, api, event, handleReaction, Currencies }) {
  let { threadID, senderID, reaction, userID } = event;
  let { dataGame, dapan, author, nameUser } = handleReaction;
  if (userID != author) return api.sendMessage(`Để ngta trả lời -.-`, threadID);
  let mon = parseInt(moneydown) + 500;
  if (reaction != "👍" && reaction != "😆"&& reaction != "😮"&& reaction != "😀") return;
    let response = "";
    if (reaction == "👍") response = dataGame.a
    else if (reaction == "😀") response = dataGame.b
    else if (reaction == "😆") response = dataGame.c
    else if (reaction == "😮") response = dataGame.d

    if (response == handleReaction.dapan) { 
        await Currencies.increaseMoney(senderID, mon);
        api.unsendMessage(handleReaction.messageID)
        api.sendMessage(`✔Hay quá! ${nameUser} trả lời đúng rồi.\nSố tiền thu về là ${mon} VNĐ\nĐáp án: ${dapan}`, threadID) 
    } else {
    await Currencies.decreaseMoney(senderID, moneydown);
    api.unsendMessage(handleReaction.messageID)
    api.sendMessage(`✘Tiếc quá! ${nameUser} trả lời sai rồi!!!\nĐáp án chính xác là: ${dapan}\nBị trừ mất ${moneydown} VNĐ!!`, threadID);
    }
}

module.exports.run = async function ({ api, event, Users, Currencies }) {
  let { threadID, messageID, senderID } = event;
  let dataMoney = await Currencies.getData(senderID);
  let money = dataMoney.money;
  if (money < moneydown) return api.sendMessage(`Bạn không có đủ ${moneydown} VNĐ để đăng kí, vui lòng theo thầy Huấn làm ăn bươn chải!`, threadID, messageID);
  let res = await axios.get(`https://apidovui.miraiofficials123.repl.co/`);
  let dataGame = res.data
  let namePlayer_react = await Users.getData(senderID)
    return api.sendMessage({body: `❔Câu hỏi dành cho bạn: ${dataGame.questions}\n\n👍/A. ${dataGame.a}\n😀/B. ${dataGame.b}\n😆/C. ${dataGame.c}\n😮/D. ${dataGame.d}\n\n🌻Reply tin nhắn hoặc thả cảm xúc để trả lời`}, threadID, (error, info) => {
        global.client.handleReaction.push({
          type: "reply",
          name: this.config.name,
          author: senderID,
          messageID: info.messageID,
          dataGame: res.data,
          dapan: dataGame.dapan,
          nameUser: namePlayer_react.name
        })
        global.client.handleReply.push({
          type: "reply",
          name: this.config.name,
          author: senderID,
          messageID: info.messageID,
          dataGame: res.data,
          dapan: dataGame.dapan,
          nameUser: namePlayer_react.name
        })
setTimeout(function(){ 
        api.unsendMessage(info.messageID)
}, timeout * 1000);
    }) 
}
