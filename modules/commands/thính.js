module.exports.config = {
  name: "thính",
  version: "1.0.7",
  hasPermssion: 0,
  credits: "TrúcCute",//chính chủ xin đừng hiểu nhầm thay credits
  description: "Xem ca dao Việt Nam",
  commandCategory: "bổ ích",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
}

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const res = await axios.get('https://APIThinh.miraiofficials123.repl.co');
  const data = res.data.data;
  const data2 = res.data.url;
  let cc = (await axios.get(data2, {responseType: "stream"})).data;
  return api.sendMessage({body: `Thính: ` + data, attachment: cc}, event.threadID, event.messageID)
}
