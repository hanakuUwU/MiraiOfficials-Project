module.exports.config = {
	name: "id",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Lấy id box", 
	commandCategory: "box",
	usages: "uidbox",
	cooldowns: 5, 
	dependencies: '',
};

module.exports.run = async function({ api, event }) {
  api.sendMessage(event.threadID, event.threadID);
};
