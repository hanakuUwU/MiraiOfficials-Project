module.exports.config = {
	name: "send",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "Mirai mod by HĐGN",
	description: "Gửi tin nhắn tới các nhóm(reply vào ảnh/video cần gửi kèm)!\nPhiên bản xịn hơn của sendnotiUwU",
	commandCategory: "Admin",
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

module.exports.run = async ({ api, event, args, getText, Users }) => {
  const name = await Users.getNameUser(event.senderID)
const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");  
if (event.type == "message_reply") {
const request = global.nodemodule["request"];
const fs = require('fs')
const axios = require('axios')
			var getURL = await request.get(event.messageReply.attachments[0].url);
			
					var pathname = getURL.uri.pathname;
var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
			
					var path = __dirname + `/cache/snoti`+`.${ext}`;


var abc = event.messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;

  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));


	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage({body: `====== [ 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 ] ======\n\n𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${gio}\n𝐆𝐮̛̉𝐢 𝐭𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧: ${name}\n𝐍𝐨̣̂𝐢 𝐝𝐮𝐧𝐠:\n` + args.join(` `) + ``,attachment: fs.createReadStream(path) }, idThread, (error, info) => {
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
			api.sendMessage(`====== [ 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 ] ======\n\n𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${gio}\n𝐆𝐮̛̉𝐢𝐭𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧: ${name}\n𝐍𝐨̣̂𝐢 𝐝𝐮𝐧𝐠:\n` + args.join(` `) + ``, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID); }
  }
