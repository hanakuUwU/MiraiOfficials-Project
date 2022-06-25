module.exports.config = {
    name: "hi",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Kanichi mod time by TrúcCute",
    description: "noprefix",
    commandCategory: "bổ não",
    usages: "",
    cooldowns: 10,
    denpendencies: {
        "axios": "",
        "moment-timezone": ""
    }
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  let { get } = require("axios");
  let { threadID, body, senderID } = event;
  let res = await get('https://apiurl.miraiofficials123.repl.co');
  let data = res.data.url;
  let download = (await get(data, {
			responseType: "stream"
		})).data;
  let moment = require("moment-timezone");
  let hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
  let data2 = [
    "tốt lành =)",
    "vui vẻ 😄",
    "hạnh phúc ❤",
    "yêu đời 😘"
  ];
  let text = data2[Math.floor(Math.random() * data2.length)]
  let session = (
    hours > 0001 && hours <= 400 ? "sáng tinh mơ" : 
    hours > 401 && hours <= 700 ? "sáng sớm" :
    hours > 701 && hours <= 1000 ? "sáng" :
    hours > 1001 && hours <= 1200 ? "trưa" : 
    hours > 1201 && hours <= 1700 ? "chiều" : 
    hours > 1701 && hours <= 1800 ? "chiều tà" : 
    hours > 1801 && hours <= 2100 ? "tối" : 
    hours > 2101 && hours <= 2400 ? "tối muộn" : 
    "lỗi")
  let name = await Users.getNameUser(senderID)
  let msg = {body: `Xin chào ${name}, chúc bạn một buổi ${session} ${text}`, attachment: download}
    if (body.toLowerCase() == "hi") {
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "hii") {
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "hí") {
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "hì") {
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "híí"){
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "hello") {
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "chào") {
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "chao"){
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "lô") {
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "2") {
      return api.sendMessage(msg, threadID)
    }
    if (body.toLowerCase() == "hê nhô") {
      return api.sendMessage(msg, threadID)
    }
}

module.exports.run = async ({ event, api }) => {
  return api.sendMessage(`Dùng sai rồi lêu lêu`, event.threadID)
}
