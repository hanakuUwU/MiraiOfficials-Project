const axios = require("axios");
module.exports.config = {
    name: "hi",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Kanichi mod time by TrúcCute",
    description: "noprefix",
    commandCategory: "bổ não",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "axios": "",
        "moment-timezone": ""
    }
}

module.exports.handleEvent = async ({ event, api, Users }) => {
  const res = await axios.get('https://apiurl.miraiofficials123.repl.co');
  const data = res.data.url;
  let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
  const moment = require("moment-timezone");
  const hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
  const session = (hours > 0001 && hours <= 400 ? "sớm tinh mơ" : hours > 401 && hours <= 700 ? "sáng sớm" : hours > 701 && hours <= 1000 ? "sáng" : hours > 1001 && hours <= 1200 ? "trưa" : hours > 1201 && hours <= 1700 ? "chiều" : hours > 1701 && hours <= 1800 ? "chiều tà" : hours > 1801 && hours <= 2100 ? "tối" : hours > 2101 && hours <= 2400 ? "tối muộn" : "lỗi")
  let name = await Users.getNameUser(event.senderID)
  var msg = {body: `Xin chào ${name}, chúc bạn một buổi ${session} vui vẻ ❤️`, attachment: download}
  if (event.body.toLowerCase() == "hi"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "hii"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "hí"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "hì"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "híí"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "hello"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "chào"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "chao"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "lô"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "2"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "hê nhô"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
        };
module.exports.run = async ({ event, api }) => {
  return api.sendMessage(`Dùng sai rồi lêu lêu`, event.threadID, event.messageID)
}
