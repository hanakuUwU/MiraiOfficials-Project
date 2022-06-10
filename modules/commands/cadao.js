module.exports.config = {
  name: "cadao",
  version: "1.0.7",
  hasPermssion: 0,
  credits: "TrúcCute",// chính chủ xin đừng hiểu nhầm thay credits 
  description: "Xem ca dao Việt Nam",
  commandCategory: "Bổ não",
  usages: "",
  cooldowns: 5,
  dependencies:{
    "axios": ""
  }
}

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const res = await axios.get('https://apicadaovn.miraiofficials123.repl.co/');
  const data = res.data.data;
  const data1 = res.data.url;
  let cc = (await axios.get(data1, {responseType: "stream"})).data;
  return api.sendMessage({body: `♡ Ca Dao Việt Nam ♡\n` + data,attachment: cc}, event.threadID, event.messageID)
}
