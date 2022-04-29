module.exports.config = {
	name: "send",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "Mirai mod by HĐGN",
	description: "Gửi tin nhắn tới các nhóm(reply vào ảnh/video cần gửi kèm)!\nPhiên bản xịn hơn của sendnotiUwU",
	commandCategory: "system",
	usages: "[Text]",
	cooldowns: 5
};

module.exports.languages = {
	"vi": {
		"sendSuccess": "𝐓𝐡𝐨̂𝐧𝐠 𝐛𝐚́𝐨 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 𝐓𝐨̛́𝐢 %1 𝐍𝐡𝐨́𝐦!",
		"sendFail": "[!] 𝐊𝐡𝐨̂𝐧𝐠 𝐓𝐡𝐞̂̉ 𝐆𝐮̛̉𝐢 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐓𝐨̛́𝐢 %1 𝐍𝐡𝐨́𝐦"
	},
	"en": {
		"sendSuccess": "Sent message to %1 thread!",
		"sendFail": "[!] Can't send message to %1 thread"
	}
}

module.exports.run = async ({ api, event, args, getText }) => {
if (event.type == "message_reply") {
const request = global.nodemodule["request"];
const fs = require('fs')
const axios = require('axios')
        var path = __dirname + `/cache/snoti.png`;
        var path = __dirname + `/cache/snoti.mp4`;
	      var path = __dirname + `/cache/snoti.mp3`;
var abc = event.messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;

  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));


	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage({body:"»𝐓𝐍 𝐓𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧 𝐁𝐨𝐭«\n\n" + args.join(` `),attachment: fs.createReadStream(path) }, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID);

}
else {
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage("»𝐓𝐍 𝐓𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧 𝐁𝐨𝐭«\n\n" + args.join(` `), idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID); }
  }
