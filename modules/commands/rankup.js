module.exports.config = {
	name: "rankup",
	version: "1.0.1",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "Thông báo rankup cho từng nhóm, người dùng",
	commandCategory: "system",
	dependencies: {
		"fs-extra": ""
	},
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		unsendMessageAfter: 5
	}
};

module.exports.handleEvent = async function({ api, event, Currencies, Users, getText }) {
	var {threadID, senderID } = event;
	const { createReadStream, existsSync, mkdirSync } = global.nodemodule["fs-extra"];

	threadID = String(threadID);
	senderID = String(senderID);

	const thread = global.data.threadData.get(threadID) || {};

	let exp = (await Currencies.getData(senderID)).exp;
	exp = exp += 1;

	if (isNaN(exp)) return;

	if (typeof thread["rankup"] != "undefined" && thread["rankup"] == false) {
		await Currencies.setData(senderID, { exp });
		return;
	};

	const curLevel = Math.floor((Math.sqrt(1 + (4 * exp / 3) + 1) / 2));
	const level = Math.floor((Math.sqrt(1 + (4 * (exp + 1) / 3) + 1) / 2));

	if (level > curLevel && level != 1) {
		const name = global.data.userName.get(senderID) || await Users.getNameUser(senderID);
		var messsage = (typeof thread.customRankup == "undefined") ? msg = getText("levelup") : msg = thread.customRankup,
			arrayContent;

		messsage = messsage
			.replace(/\{name}/g, name)
			.replace(/\{level}/g, level);
			
		if (existsSync(__dirname + "/rankup/")) mkdirSync(__dirname + "/rankup/", { recursive: true });
		if (existsSync(__dirname + `/rankup/received_507463547525629.gif`)) arrayContent = { body: messsage, attachment: createReadStream(__dirname + `/rankup/received_507463547525629.gif`), mentions: [{ tag: name, id: senderID }] };
		else arrayContent = { body: messsage, mentions: [{ tag: name, id: senderID }] };
		const moduleName = this.config.name;
		api.sendMessage(arrayContent, threadID, async function (error, info){
			if (global.configModule[moduleName].autoUnsend) {
				await new Promise(resolve => setTimeout(resolve, global.configModule[moduleName].unsendMessageAfter * 1000));
				return api.unsendMessage(info.messageID);
			} else return;
		});
	}

	await Currencies.setData(senderID, { exp });
	return;
}

module.exports.languages = {
	"vi": {
		"off": "tắt",
		"on": "bật",
		"successText": "thành công thông báo rankup!",
		"levelup": "𝑂̂𝑖, 𝑇𝑟𝑖̀𝑛ℎ 𝐷𝑜̣̂ 𝑁𝑜́𝑖 𝑁ℎ𝑎̉𝑚 𝐶𝑢̉𝑎 𝐵𝑎̣𝑛 {name} 𝐷𝑎̃ 𝐿𝑒̂𝑛 𝐷𝑒̂́𝑛 𝐿𝑒𝑣𝑒𝑙 {level} 𝑅𝑜̂̀𝑖\n𝑇𝑖́𝑐ℎ 𝐶𝑢̛̣𝑐 𝑁𝑜́𝑖 𝑁ℎ𝑎̉𝑚 𝐻𝑜̛𝑛 𝑁ℎ𝑒́ <3"
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": "success notification rankup!",
		"levelup": "{name}, your keyboard hero level has reached level {level}",
	}
}

module.exports.run = async function({ api, event, Threads, getText }) {
	const { threadID, messageID } = event;
	let data = (await Threads.getData(threadID)).data;
	
	if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
	else data["rankup"] = false;
	
	await Threads.setData(threadID, { data });
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
    }
