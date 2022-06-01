module.exports.config = {
	name: "busy",
	version: "1.0.0",
	permissions: 1,
	credits: "Henry",
	description: "Bật hoặc tắt chế độ busy",
  usages: "[lí do]",
  commandCategory: "Tiện ích",
  cooldowns: 5
};

const busyPath = __dirname + '/cache/busy.json';
const fs = require('fs');

module.exports.onLoad = () => {
  if (!fs.existsSync(busyPath)) fs.writeFileSync(busyPath, JSON.stringify({}));
}

module.exports.handleEvent = async function({ api, event, Users }) {
    let busyData = JSON.parse(fs.readFileSync(busyPath));
    var { senderID, threadID, messageID, mentions } = event;
    if (senderID in busyData) {
        var info = busyData[senderID];
        delete busyData[senderID];
        fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
        return api.sendMessage(`𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐁𝐚𝐜𝐤!! 🥰`, threadID, () => {
            if (info.tag.length == 0) api.sendMessage("𝐓𝐫𝐨𝐧𝐠 𝐥𝐮́𝐜 𝐛𝐚̣𝐧 𝐯𝐚̆́𝐧𝐠 𝐦𝐚̣̆𝐭 𝐤𝐡𝐨̂𝐧𝐠 𝐚𝐢 𝐧𝐡𝐚̆́𝐜 𝐛𝐚̣𝐧 𝐜𝐚̉", threadID);
            else {
                var msg = "";
                for (var i of info.tag) {
                    msg += `${i}\n`
                }
                api.sendMessage("𝐃𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐧𝐡𝐮̛̃𝐧𝐠 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐧𝐡𝐚̆́𝐜 𝐛𝐚̣𝐧 𝐭𝐫𝐨𝐧𝐠 𝐥𝐮́𝐜 𝐛𝐚̣𝐧 𝐯𝐚̆́𝐧𝐠 𝐦𝐚̣̆𝐭:\n\n" + msg, threadID)
            }
        }, messageID);
    }

    if (!mentions || Object.keys(mentions).length == 0) return;
    
    for (const [ID, name] of Object.entries(mentions)) {
        if (ID in busyData) {
            var infoBusy = busyData[ID], mentioner = await Users.getNameUser(senderID), replaceName = event.body.replace(`${name}`, "");
            infoBusy.tag.push(`${mentioner}: ${replaceName == "" ? "𝐕𝐮̛̀𝐚 𝐭𝐚𝐠 𝐛𝐚̣𝐧 𝟏 𝐥𝐚̂̀𝐧" : replaceName}`)
            busyData[ID] = infoBusy;
            fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
            return api.sendMessage(`${name.replace("@", "")} hiện đang bận ${infoBusy.lido ? ` với lí do: ${infoBusy.lido}.` : "."}`, threadID, messageID);
        }
    }
}

module.exports.run = async function({ api, event, args, Users }) {
	await new Promise(resolve => setTimeout(resolve, 1000));
    let busyData = JSON.parse(fs.readFileSync(busyPath));
  const axios = require("axios")
	const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const { threadID, senderID, messageID, body } = event;
  const res = await axios.get("https://APIURL.miraiofficials123.repl.co");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
    var content = args.join(" ") || "";
    if (!(senderID in busyData)) {
        busyData[senderID] = {
            lido: content,
            tag: []
        }
        fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
       var msg = (content.length == 0) ? `🌺──── •𝐁𝐮𝐬𝐲• ────🌺\n\n》𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐛𝐚̣̂𝐭 𝐛𝐮𝐬𝐲\n》𝐋𝐢́ 𝐝𝐨: 𝐈𝐧𝐯𝐢𝐬𝐢𝐛𝐥𝐞\n\n🌺───「${timeNow}」───🌺` : `🌺──── •𝐁𝐮𝐬𝐲• ────🌺\n\n》𝐁𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐛𝐚̣̂𝐭 𝐛𝐮𝐬𝐲\n》𝐋𝐢́ 𝐝𝐨: ${content}\n\n🌺───「${timeNow}」───🌺`;
        return api.sendMessage({body: msg, attachment: download}, threadID, messageID);
    }
}
