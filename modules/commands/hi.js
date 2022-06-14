const axios = require("axios");
module.exports.config = {
    name: "hi",
    version: "1.0.2",
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

module.exports.handleEvent = async ({ event, api,Users }) => {
  const res = await axios.get('https://apiurl.miraiofficials123.repl.co');
  const data = res.data.url;
  let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
  const moment = require("moment-timezone");
  const hours = moment.tz('Asia/Ho_Chi_Minh').format('HH');
  const session = (hours <= 10 ? "sáng" : hours > 10 && hours <= 12 ? "trưa" : hours > 12 && hours <= 18 ? "chiều" : "tối")
  let name = await Users.getNameUser(event.senderID)
  var msg = {body: `chào buổi ${session}, chúc ${name} 1 ngày vui vẻ`, attachment: download}
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
        };
module.exports.run = async ({ event, api }) => {
return api.sendMessage("𝐃𝐮̀𝐧𝐠 𝐬𝐚𝐢 𝐜𝐚́𝐜𝐡 𝐫𝐨̂̀𝐢 𝐥𝐞̂𝐮 𝐥𝐞̂𝐮",event.threadID)
    }
