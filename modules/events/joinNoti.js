module.exports.config = {
	name: "joinNoti",
	eventType: ["log:subscribe"],
	version: "1.0.1",
	credits: "Mirai Team",
	description: "Thông báo bot hoặc người vào nhóm",
	dependencies: {
		"fs-extra": ""
	}
};

module.exports.run = async function({ api, event }) {
	const { join } = global.nodemodule["path"];
	const { threadID } = event;
	if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
		api.changeNickname(`👉 ${global.config.PREFIX} 👈 💖 ${(!global.config.BOTNAME) ? "ChatBot Cre By GK" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		return api.sendMessage(`⫸ 𝐊𝐞̂́𝐭 𝐍𝐨̂́𝐢 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 ⫷
 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 𝐁𝐲 𝐆𝐊
●▬▬▬▬▬๑⇩⇩๑▬▬▬▬▬●
 ▷ 𝐋𝐮𝐚̣̂𝐭 ◁
⏩ 𝐁𝐨𝐭 𝐊𝐡𝐨̂𝐧𝐠 𝐎𝐧𝐥𝐢𝐧𝐞 𝟐𝟒/𝟐𝟒 𝐍𝐡𝐚
⏩ 𝐒𝐩𝐚𝐦 𝐁𝐨𝐭 = 𝐁𝐚𝐧
⏩ 𝐂𝐡𝐮̛̉𝐢 𝐁𝐨𝐭 = 𝐁𝐚𝐧 + 𝐎𝐮𝐭 𝐁𝐨𝐱
⏩ 𝐊𝐢𝐜𝐤 𝐁𝐨𝐭 = 𝐁𝐚𝐧 𝐁𝐨𝐱 + 𝐎𝐮𝐭
⏩ 𝐇𝐚̣𝐧 𝐂𝐡𝐞̂́ 𝐒𝐩𝐚𝐦 🔞+...
⏩ 𝐓𝐡𝐚𝐧𝐤 𝐂𝐚́𝐜 𝐁𝐚̣𝐧 𝐃𝐚̃ 𝐒𝐮̛̉ 𝐃𝐮̣𝐧𝐠 𝐁𝐨𝐭 𝐂𝐮̉𝐚 𝐌𝐢̀𝐧𝐡 <𝟑
⏩ 𝐋𝐮̛𝐮 𝐲́ 𝐧𝐠𝐡𝐞 𝐧𝐡𝐚̣𝐜 𝐫𝐞𝐦𝐢𝐱 𝐯𝐬 𝐧𝐡𝐚̣𝐜 𝐧𝐮̛𝐨̛́𝐜 𝐧𝐠𝐨𝐚̀𝐢 𝐭𝐡𝐢̀ 𝐝𝐮̀𝐧𝐠 𝐬𝐢𝐧𝐠𝟐 𝐧𝐡𝐞́!
●▬▬▬▬▬๑⇧⇧๑▬▬▬▬▬●
❛━━･❪ 𝐏𝐫𝐞𝐟𝐢𝐱 [ , ] ❫･━━❜
📲 𝐌𝐨̣𝐢 𝐓𝐡𝐚̆́𝐜 𝐌𝐚̆́𝐜 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐀𝐝𝐦𝐢𝐧!
⚡fb.me/100036947774673`, threadID);
	}
	else {
		try {
			const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];
			let { threadName, participantIDs } = await api.getThreadInfo(threadID);

			const threadData = global.data.threadData.get(parseInt(threadID)) || {};
			const path = join(__dirname, "cache", "joinMp4");
			const pathGif = join(path,`hi.mp4`);

			var mentions = [], nameArray = [], memLength = [], i = 0;
			
			for (id in event.logMessageData.addedParticipants) {
				const userName = event.logMessageData.addedParticipants[id].fullName;
				nameArray.push(userName);
				mentions.push({ tag: userName, id });
				memLength.push(participantIDs.length - i++);
			}
			memLength.sort((a, b) => a - b);
			
			(typeof threadData.customJoin == "undefined") ? msg = "🇻🇳 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 {name} \n🔰Đ𝒂̃ đ𝒆̂́𝒏 𝒗𝒐̛́𝒊 𝒃𝒐𝒙 {threadName}\n👤𝑩𝒂̣𝒏 𝒍𝒂̀ 𝒕𝒉𝒂̀𝒏𝒉 𝒗𝒊𝒆̂𝒏 𝒕𝒉𝒖̛́  {soThanhVien} \n⚡𝑽𝒖𝒊 𝒍𝒐̀𝒏𝒈 đ𝒐̣𝒄 𝒏𝒉𝒖̛̃𝒏𝒈 đ𝒊𝒆̂̀𝒖 𝒍𝒆̣̂𝒏𝒉 𝒔𝒂𝒖 đ𝒂̂𝒚 𝒏𝒉𝒆́ \n📌𝑫𝒖̀𝒏𝒈 𝒍𝒆̣̂𝒏𝒉 ,𝒔𝒆𝒕𝒏𝒂𝒎𝒆 + 𝑻𝒆̂𝒏 𝒄𝒂̂̀𝒏 đ𝒐̂̉𝒊 \n💞𝑮𝒊𝒐̛́𝒊 𝒕𝒉𝒊𝒆̣̂𝒖 𝑯𝒐̣ 𝒕𝒆̂𝒏... \n👼𝑵𝒂̆𝒎 𝒔𝒊𝒏𝒉... \n🏘️𝑵𝒐̛𝒊 𝒐̛̉... \n💟𝑻𝒖̛̀ 𝒈𝒊𝒐̛̀ 𝒃𝒂̣𝒏 𝒔𝒆̃ 𝒍𝒂̀ 𝒎𝒐̣̂𝒕 𝒕𝒉𝒂̀𝒏𝒉 𝒗𝒊𝒆̂𝒏 𝒄𝒖̉𝒂 𝒃𝒐𝒙 𝒎𝒊̀𝒏𝒉 💖♥" : msg = threadData.customJoin;
			msg = msg
			.replace(/\{name}/g, nameArray.join(', '))
			.replace(/\{type}/g, (memLength.length > 1) ?  'các bạn' : 'bạn')
			.replace(/\{soThanhVien}/g, memLength.join(', '))
			.replace(/\{threadName}/g, threadName);

			if (existsSync(path)) mkdirSync(path, { recursive: true });

			if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
			else formPush = { body: msg, mentions }

			return api.sendMessage(formPush, threadID);
		} catch (e) { return console.log(e) };
	}
        }
