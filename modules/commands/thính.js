module.exports.config = {
  name: "thính",
  version: "18.9.7",
  hasPermssion: 0,
  credits: "Nguyen",
  description: "Xem ca dao Việt Nam",
  commandCategory: "bổ ích",
  usages: "",
  cooldowns: 5
}

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const res = await axios.get('https://APIThinh.miraiofficials123.repl.co');
  const data = res.data.data;
  const qq = await axios.get(`https://APIURL.MIRAIOFFICIALS123.REPL.CO`);
  const data2 = qq.data.url;
  let cc = (await axios.get(data2, {			responseType: "stream"})).data;
  return api.sendMessage({body: `Ca dao: `+data, attachment: cc}, event.threadID, event.messageID)
}
