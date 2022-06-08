module.exports.config = {
  name: "ảnh",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "TrúcCute",// chính chủ xin đừng hiểu nhầm thay credits
  description: "xem ảnh hiện có trên bot",
  commandCategory: "Dành cho người dùng",
  usages: "trống",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
}

module.exports.handleReply = async ({ api, event, handleReply }) => {
  const axios = require("axios");
const { threadID, messageID, body } = event;
    switch(handleReply.type) {
        case "reply": {
            switch(body) {

					case "1": {
                const res = await axios.get("https://APIURL.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
            api.unsendMessage(handleReply.messageID);
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
    api.unsendMessage(handleReply.messageID);
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
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐌𝐢𝐫𝐚𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download3}, threadID, messageID);
          };
			break; 

        case "4": {
                const res = await axios.get("https://APIURLChitanda.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download4 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐂𝐡𝐢𝐭𝐚𝐧𝐝𝐚 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download4}, threadID, messageID);
          };
			break;
                
        case "5": {
                const res = await axios.get("https://APIURLLoLi.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download5 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐥𝐨𝐥𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download5}, threadID, messageID);
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
          api.unsendMessage(handleReply.messageID);
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
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐕𝐢𝐨𝐥𝐞𝐭 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download7}, threadID, messageID);
          };
			break;

        case "8": {
                const res = await axios.get("https://api.apidata.repl.co/gentle");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download8 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐠𝐚́𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download8}, threadID, messageID);
          };
			break;     

        case "9": {
                const res = await axios.get("https://apiboy.thanhduongtran465.repl.co/");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download9 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐭𝐫𝐚𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download9}, threadID, messageID);
          };
			break;         

        case "10": {
              const res = await axios.get("https://APIURLHG.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download10 = (await axios.get(data, {
			responseType: "stream"
		})).data;
          api.unsendMessage(handleReply.messageID);
          return api.sendMessage({body: `𝐀̉𝐧𝐡 𝐇𝐆 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀ <3`, attachment: download10}, threadID, messageID);
          };
			break;       
                
					default:
				const choose = parseInt(body);
            	if (isNaN(body)) return api.sendMessage("💟 𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 𝟏 𝐜𝐨𝐧 𝐬𝐨̂́", threadID, messageID);
            	if (choose > 10 || choose < 1) return api.sendMessage("🔰 𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐧𝐚̆̀𝐦 𝐭𝐫𝐨𝐧𝐠 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡.", threadID, messageID); 
			}
		}
	}
}

module.exports.run = async ({ api, event, handleReply }) => {
	return api.sendMessage({ body: 
    "⠀ ⠀ = 𝐍𝐡𝐮̛̃𝐧𝐠 𝐚̉𝐧𝐡 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ =" +
    "\n\n𝟏. 𝐀𝐧𝐲𝐚" +
    "\n𝟐. 𝐊𝐚𝐧𝐧𝐚" +
    "\n𝟑. 𝐌𝐢𝐫𝐚𝐢" +
    "\n𝟒. 𝐂𝐡𝐢𝐭𝐚𝐧𝐝𝐚" +
    "\n𝟓. 𝐥𝐨𝐥𝐢" +
    "\n𝟔. 𝐃𝐨𝐫𝐚𝐞𝐦𝐨𝐧" +
    "\n𝟕. 𝐕𝐢𝐨𝐥𝐞𝐭" +
    "\n𝟖. 𝐆𝐚́𝐢" +
    "\n𝟗. 𝐓𝐫𝐚𝐢" +
    "\n𝟏𝟎. 𝐇𝐆" +
    "\n\n𝐑𝐞𝐩𝐥𝐲 𝐒𝐓𝐓 𝐚̉𝐧𝐡 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦\n=> 𝐂𝐨́ 𝐭𝐡𝐞̂̉ 𝐠𝐨́𝐩 𝐭𝐡𝐞̂𝐦 𝐚̉𝐧𝐡 𝐜𝐡𝐨 𝐚𝐝𝐦𝐢𝐧 𝐛𝐚̆̀𝐧𝐠 𝐜𝐚𝐥𝐥𝐚𝐝, 𝐠𝐢𝐮́𝐩 𝐚̉𝐧𝐡 𝐭𝐡𝐞̂𝐦 𝐩𝐡𝐨𝐧𝐠 𝐩𝐡𝐮́"
            }, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "reply",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        })  
    })
}
