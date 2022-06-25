module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "CatalizCS",
	description: "Thông báo bot hoặc người vào nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": "",
		"pidusage": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync , mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
  
	const path = join(__dirname, "cache", "joinMp4");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Threads }) {
  const { threadID } = event;
  const moment = require("moment-timezone");
	var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
  const hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm'); 
  let { threadName, participantIDs } = await api.getThreadInfo(threadID);
  const session = (hours > 0001 && hours <= 400 ? "𝐬𝐨̛́𝐦 𝐭𝐢𝐧𝐡 𝐦𝐨̛" : hours > 401 && hours <= 700 ? "𝐬𝐚́𝐧𝐠 𝐬𝐨̛́𝐦" : hours > 701 && hours <= 1000 ? "𝐬𝐚́𝐧𝐠" : hours > 1001 && hours <= 1200 ? "𝐭𝐫𝐮̛𝐚" : hours > 1201 && hours <= 1700 ? "𝐜𝐡𝐢𝐞̂̀𝐮" : hours > 1701 && hours <= 1800 ? "𝐜𝐡𝐢𝐞̂̀𝐮 𝐭𝐚̀" : hours > 1801 && hours <= 2100 ? "𝐭𝐨̂́𝐢" : hours > 2101 && hours <= 2400 ? "𝐭𝐨̂́𝐢 𝐦𝐮𝐨̣̂𝐧" : "lỗi")
	const { join } = global.nodemodule["path"];
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`『 ${global.config.PREFIX} 』 ♡ ${(!global.config.BOTNAME) ? "This bot is made by GK" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		const fs = require("fs-extra");
		return api.sendMessage("", event.threadID, () => api.sendMessage({body:`⫸ 𝐊𝐞̂́𝐭 𝐍𝐨̂́𝐢 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 𝐁𝐨𝐱 ${threadName}\n𝐋𝐮́𝐜: ${gio}\n𝐂𝐡𝐮́𝐜 𝐜𝐚́𝐜 𝐛𝐚̣𝐧 𝐱𝐚̀𝐢 𝐛𝐨𝐭 𝐯𝐮𝐢 𝐯𝐞̉ =)`}, threadID));
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      const threadSetting = (await Threads.getData(String(threadID))).data || {};		 
      const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinMp4");
			const pathGif = join(path, `${threadID}.mp4`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = `🇻🇳𝐖𝐞𝐥𝐜𝐨𝐦𝐞 {name}\n🔰{type} 𝐬𝐞̃ 𝐥𝐚̀ 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐜𝐮̉𝐚 𝐛𝐨𝐱 {threadName} 𝐭𝐮̛̀ 𝐠𝐢𝐨̛̀\n👤𝐁𝐚̣𝐧 𝐥𝐚̀ 𝐭𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧 𝐭𝐡𝐮̛́ {soThanhVien} 𝐜𝐮̉𝐚 𝐛𝐨𝐱\n📌𝐃𝐮̀𝐧𝐠 𝐥𝐞̣̂𝐧𝐡 ${prefix}𝐦𝐞𝐧𝐮 𝐡𝐨𝐚̣̆𝐜 ${prefix}𝐡𝐞𝐥𝐩 đ𝐞̂̉ 𝐛𝐢𝐞̂́𝐭 𝐭𝐡𝐞̂𝐦 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 💖♥\n𝐂𝐡𝐮́𝐜 𝐛𝐚̣𝐧 𝟏 𝐛𝐮𝐨̂̉𝐢 ${session} 𝐯𝐮𝐢 𝐯𝐞̉ =)\n⠀=[ ${gio} ]=` : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  '𝐂𝐚́𝐜 𝐁𝐚̣𝐧' : '𝐁𝐚̣𝐧')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			const randomPath = readdirSync(join(__dirname, "cache", "joinMp4" ));

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else if (randomPath.length != 0) {
				const pathRandom = join(__dirname, "cache", "joinMp4", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
				formPush = { body: msg, mentions }
			}
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
}
