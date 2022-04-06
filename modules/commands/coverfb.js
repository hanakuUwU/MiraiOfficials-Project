module.exports.config = {
	name: "coverfb", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.0", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "DungUwU", // Công nhận module sở hữu là ai
	description: "blah blah blha", // Thông tin chi tiết về lệnh
	commandCategory: "𝑻𝒂̣𝒐 𝒂̉𝒏𝒉", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "",
	cooldowns: 5
};

module.exports.handleReply = async ({ api, event, handleReply }) => {
	const { threadID, messageID, senderID, body } = event;
	if (handleReply.content.id != senderID) return;
	const input = body.trim();
	const sendC = (msg, step, content) => api.sendMessage(msg, threadID, (err, info) => {
		global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
		api.unsendMessage(handleReply.messageID);
		global.client.handleReply.push({
			step: step,
			name: this.config.name,
			messageID: info.messageID,
			content: content
		})
	}, messageID);
	const send = async (msg) => api.sendMessage(msg, threadID, messageID);

	let content = handleReply.content;
	switch (handleReply.step) {
		case 1:
			content.name = input;
			sendC("🍄 𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 𝒏𝒂̀𝒚 𝒏𝒉𝒂̣̂𝒑 𝒃𝒊𝒆̣̂𝒕 𝒅𝒂𝒏𝒉 𝒄𝒖̉𝒂 𝒃𝒂̣𝒏", 2, content);
			break;
		case 2:
			content.subname = input;
			sendC("📱𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 𝒏𝒂̀𝒚 𝒔𝒐̂́ 𝒏𝒉𝒂̣̂𝒑 𝒔𝒐̂́ đ𝒊𝒆̣̂𝒏 𝒕𝒉𝒐𝒂̣𝒊 𝒄𝒖̉𝒂 𝒃𝒂̣𝒏", 3, content);
			break;
		case 3:
			content.number = input;
			sendC("💌 𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 𝒏𝒂̀𝒚 𝒏𝒉𝒂̣̂𝒑 𝒆𝒎𝒂𝒊𝒍 𝒄𝒖̉𝒂 𝒃𝒂̣𝒏", 4, content);
			break;
		case 4:
			content.email = input;
			sendC("🕌 𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 𝒏𝒂̀𝒚 𝒏𝒉𝒂̣̂𝒑 đ𝒊̣𝒂 𝒄𝒉𝒊̉ 𝒄𝒖̉𝒂 𝒃𝒂̣𝒏", 5, content);
			break;
		case 5:
			content.address = input;
			sendC("🎨 𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 𝒏𝒂̀𝒚 𝒄𝒉𝒐̣𝒏 𝒎𝒂̀𝒖 𝒃𝒂̣𝒏 𝒎𝒖𝒐̂́𝒏", 6, content);
			break;
		case 6:
			content.color = input;
			const axios = require("axios");
			const fs = require("fs");
			send("♻️ 𝑻𝒉𝒐̂𝒏𝒈 𝒕𝒊𝒏 đ𝒂̃ đ𝒖̛𝒐̛̣𝒄 𝒈𝒉𝒊 𝒏𝒉𝒂̣̂𝒏, 𝒗𝒖𝒊 𝒍𝒐̀𝒏𝒈 đ𝒐̛̣𝒊 𝒕𝒓𝒐𝒏𝒈 𝒈𝒊𝒂̂𝒚 𝒍𝒂́𝒕!");
			global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
			api.unsendMessage(handleReply.messageID);
			let c = content;
			let res = await axios.get(encodeURI(`https://www.phamvandienofficial.xyz/fbcover/v1?name=${c.name}&uid=${c.id}&address=${c.address}&email=${c.email}&subname=${c.subname}&sdt=${c.number}&color=${c.color}`), { responseType: "arraybuffer" })
				.catch(e => { return send("⚡Đ𝒂̃ 𝒄𝒐́ 𝒍𝒐̂̃𝒊 𝒔𝒂̉𝒚 𝒓𝒂, 𝑳𝒊𝒆̂𝒏 𝒉𝒆̣̂ 𝒂𝒅𝒎𝒊𝒏 đ𝒆̂̉ 𝒇𝒊𝒙") });
			if (res.status != 200) return send("⚡Đ𝒂̃ 𝒄𝒐́ 𝒍𝒐̂̃𝒊 𝒙𝒂̉𝒚 𝒓𝒂, 𝒗𝒖𝒊 𝒍𝒐̀𝒏𝒈 𝒕𝒉𝒖̛̉ 𝒍𝒂̣𝒊 𝒔𝒂𝒖!");
			let path = __dirname + `/cache/fbcoverv1__${senderID}.png`;
			fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
			send({
				body: '',
				attachment: fs.createReadStream(path)
			}).then(fs.unlinkSync(path));
			break;
		default:
			break;
	}
}

module.exports.run = ({ api, event, args, }) => {
	const { threadID, messageID, senderID } = event;
	return api.sendMessage("🌺 𝑹𝒆𝒑𝒍𝒚 𝒕𝒊𝒏 𝒏𝒉𝒂̆́𝒏 𝒏𝒂̀𝒚 𝒏𝒉𝒂̣̂𝒑 𝒕𝒆̂𝒏 𝒄𝒖̉𝒂 𝒃𝒂̣𝒏", event.threadID, (err,info) => {
		global.client.handleReply.push({
			step: 1,
			name: this.config.name,
			messageID: info.messageID,
			content: {
				id: senderID,
				name: "",
				subname: "",
				number: "",
				email: "",
				address: "",
				color: ""
			}
		})
		console.log(global.client.handleReply)
	}, event.messageID);
}
