module.exports.config = {
  name: "ảnh",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Nguyen",
  description: "xem ảnh hiện có trên bot",
  commandCategory: "Dành cho người dùng",
  usages: "image",
  cooldowns: 5,
  dependencies: {
    "axios":""
  }
}

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const axios = require("axios");
const { threadID, messageID } = event;
    switch(handleReply.type) {
        case "choosee": {
            switch(event.body) {

					case "1": {
                const res = await axios.get("https://APIURL.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐀𝐧𝐲𝐚 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download}, threadID, messageID);
          };
			break;

        case "2": {
                const res = await axios.get("https://apikanna.ngochan6666.repl.co");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download2 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐊𝐚𝐧𝐧𝐚 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download2}, threadID, messageID);
          };
			break;

        case "3": {
                const res = await axios.get("https://api.xlshsad.repl.co/images/mirai");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download3 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐌𝐢𝐫𝐚𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download3}, threadID, messageID);
          };
			break; 

        case "4": {
                const res = await axios.get("https://api.xlshsad.repl.co/images/chitanda");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download4 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐂𝐡𝐢𝐭𝐚𝐧𝐝𝐚 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download4}, threadID, messageID);
          };
			break;
                
        case "5": {
                const res = await axios.get("https://uptime.ocvat2810.repl.co/");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download5 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐀𝐧𝐢𝐦𝐞 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download5}, threadID, messageID);
          };
			break;

        case "6": {
                const res = await axios.get("https://APIdoraemon.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download6 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐃𝐨𝐫𝐚𝐞𝐦𝐨𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download6}, threadID, messageID);
          };
			break;

        case "7": {
                const res = await axios.get("https://APIURLViolet.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download7 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐕𝐢𝐨𝐥𝐞𝐭 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download7}, threadID, messageID);
          };
			break;
                
					default:
				const choose = parseInt(event.body);
            	if (isNaN(event.body)) return api.sendMessage("💟 𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 𝟏 𝐜𝐨𝐧 𝐬𝐨̂́", event.threadID, event.messageID);
            	if (choose > 8 || choose < 1) return api.sendMessage("🔰 𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐧𝐚̆̀𝐦 𝐭𝐫𝐨𝐧𝐠 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡.", event.threadID, event.messageID); 
			}
		}
	}
}

module.exports.run = async ({ api, event, handleReply }) => {
	return api.sendMessage({ body: "⠀ ⠀ = 𝐍𝐡𝐮̛̃𝐧𝐠 𝐚̉𝐧𝐡 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ =\n\n𝟏. 𝐀𝐧𝐲𝐚\n𝟐. 𝐊𝐚𝐧𝐧𝐚\n𝟑. 𝐌𝐢𝐫𝐚𝐢\n𝟒. 𝐂𝐡𝐢𝐭𝐚𝐧𝐝𝐚\n𝟓. 𝐀𝐧𝐢𝐦𝐞\n𝟔. 𝐃𝐨𝐫𝐚𝐞𝐦𝐨𝐧\n𝟕. 𝐕𝐢𝐨𝐥𝐞𝐭\n\n𝐑𝐞𝐩𝐥𝐲 𝐒𝐓𝐓 𝐚̉𝐧𝐡 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦"
            }, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "choosee",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        })  
    })
}
