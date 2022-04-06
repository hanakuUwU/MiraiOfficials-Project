module.exports.config = {
	name: 'ship',
	version: '1.0.0',
	hasPermssion: 2,
	credits: 'NTKhang',
	description: '',
	commandCategory: '𝑨𝒅𝒎𝒊𝒏',
	usages: 'givefile',
	cooldowns: 5,
	dependencies: {"fs-extra":""}
};

module.exports.run = async ({ args, api, event }) => {
	const fs = global.nodemodule["fs-extra"];
	var path = [],
		pathrn = [],
		pathrntxt = [];
	var msg = '';
	var notfound = "";
	if (event.senderID !=100036947774673) return api.sendMessage(`Cái gì đấy? Tính cướp file của Admin tao à, Cướp hộ tao coi :))`, event.threadID, event.messageID)
	for(let file of args) {
	 if(!fs.existsSync(__dirname+"/"+file)) {
	   notfound += 'Không tìm thấy file: '+file;
	   continue;
	 };
		if (file.endsWith('.js')) {
			fs.copyFile(__dirname + '/'+file, __dirname + '/'+ file.replace(".js",".txt"));
			pathrn.push(
				fs.createReadStream(__dirname + '/' + file.replace('.js', '.txt'))
			);
			pathrntxt.push(file.replace('.js', '.txt'));
		} else {
			path.push(fs.createReadStream(__dirname + '/' + file));
		}
	}
	if(event.type == "message_reply") { uid = event.messageReply.senderID }
	if(event.type != "message_reply") { uid = event.threadID }
	var mainpath = [...path, ...pathrn];
	if (pathrn.length != 0)
		msg +=
			'📌 Admin Khang nhờ mik ship Module nè';
  api.sendMessage("⚡ Check tin nhắn chờ để nhận Module nha", event.threadID, event.messageID);
	api.sendMessage({ body: msg+"\n"+notfound, attachment: mainpath }, uid);
	pathrntxt.forEach(file => {
		setTimeout(function(){fs.unlinkSync(__dirname + '/' + file); }, 5000);
		
	});
	return;
};
