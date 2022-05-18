module.exports.config = {
	name: "leaveNoti",
	eventType: ["log:unsubscribe"],
	version: "1.0.0",
	credits: "Mirai team",
	description: "Thông báo bot hoặc người rời khỏi nhóm có random gif/ảnh/video",
	dependencies: {
		"fs-extra": "",
		"path": ""
	}
};

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

	const path = join(__dirname, "cache", "leaveGif");
	if (existsSync(path)) mkdirSync(path, { recursive: true });	

	const path2 = join(__dirname, "cache", "leaveGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });

    return;
}

module.exports.run = async function({ api, event, Users, Threads }) {
	const moment = require("moment-timezone");
	const ngay = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY");
	const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
	const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
	if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
	const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
	const { join } =  global.nodemodule["path"];
	const { threadID } = event;
	const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
	const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
	const type = (event.author == event.logMessageData.leftParticipantFbId) ? "do không chịu được nghiệp của nhóm nên đã tự bốc hơi khỏi nhóm" : "do cố thanh tẩy nhóm nhưng bị quản trị viên phát hiện nên đã bị cho ra đảo tu";
	const path = join(__dirname, "cache", "leaveGif");
	const gifPath = join(path, `${threadID}.gif`);
	var msg, formPush

	if (existsSync(path)) mkdirSync(path, { recursive: true });

	(typeof data.customLeave == "undefined") ? msg = `Buổi {session}, ngày ${ngay}\nLúc: {gio}\n{name} {type} ` : msg = data.customLeave;
	msg = msg.replace(/\{name}/g, name).replace(/\{type}/g, type).replace(/\{session}/g, hours <= 10 ? "sáng" : hours > 10 && hours <= 12 ? "trưa" : hours > 12 && hours <= 18 ? "chiều" : "tối").replace(/\{gio}/g, gio); ;

	const randomPath = readdirSync(join(__dirname, "cache", "leaveGif", "random"));

	if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) }
	else if (randomPath.length != 0) {
		const pathRandom = join(__dirname, "cache", "leaveGif", "random", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
		formPush = { body: msg, attachment: createReadStream(pathRandom) }
	}
	else formPush = { body: msg }
	
	return api.sendMessage(formPush, threadID);
}
