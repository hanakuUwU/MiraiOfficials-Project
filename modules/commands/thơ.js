module.exports.config = {
	name: "thơ",
	version: "1.0.5",
	hasPermssion: 0,
	credits: "TrúcCute",// convert từ MạnhG
	description: "random cadao",
	commandCategory: "Bổ não",
	usages: "[trống]",
	cooldowns: 5,
  dependencies: {
    "axios": ""
  }
}

module.exports.run = async ({ api, event }) => {
  const axios = require('axios');
  const res = await axios.get(`https://raw.githubusercontent.com/KhangGia1810/gbanmirai/main/cadao.json`);
  const data = res.data.data;
  const data2 = Object.values(data);
  const data3 = data2[Math.floor(Math.random() * data2.length)]
  const cc = await axios.get('https://APIURL.miraiofficials123.repl.co');
  const cc1 = cc.data.url;
  let cc2 = (await axios.get(cc1, {
    responseType: "stream"
  })).data;
  return api.sendMessage({body: 
    `♡Ca dao Việt Nam♡\n` + data3,
    attachment: cc2}, event.threadID, event.messageID)
}
