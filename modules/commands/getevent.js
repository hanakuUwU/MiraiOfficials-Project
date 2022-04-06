module.exports.config = {
	name: 'getevent',
	version: '1.0.0',
	hasPermssion: 3,
	credits: 'NTKhang',
	description: '',
	commandCategory: 'Dành cho admin',
	usages: '',
	cooldowns: 5
};

module.exports.run = async({args,api,event}) => {
	const permission = ["100036947774673"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
	const fs = require("fs-extra");
	var path = [],
		pathrn = [],
		pathrntxt = [];
	var msg = '';
	var notfound = "";
	for (let file of args) {
		if (!fs.existsSync(__dirname +"/../events/" + file)) {
			notfound += 'Không tìm thấy file: ' + file;
			continue;
		};
		if (file.endsWith('.js')) {
			fs.copyFile(__dirname + '/../events/' + file, __dirname +'/../events/' + file.replace(".js", ".txt"));
			pathrn.push(
				fs.createReadStream(__dirname + '/../events/' + file.replace('.js', '.txt'))
			);
			pathrntxt.push(file.replace('.js', '.txt'));
		} else {
			path.push(fs.createReadStream(__dirname + '/../events/' + file));
		}
	}

	var mainpath = [...path, ...pathrn];
	if (pathrn.length != 0)
		msg +=
		'File của bạn đây';
	api.sendMessage({
		body: msg + "\n" + notfound,
		attachment: mainpath
	}, event.threadID);
	pathrntxt.forEach(file => {
		fs.unlinkSync(__dirname + '/../events/' + file);
	});
    
};
