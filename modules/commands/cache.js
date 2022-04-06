module.exports.config = {
	name: "cache",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "NTKhang",
	description: "Xóa file trong thư mục cache",
	commandCategory: "Admin",
	usages: "\ncache start <text>\ncache ext <text>\ncache <text>\ncache [để trống]\ncache help\nNOTE: <text> là ký tự bạn điền vào tùy ý",
	cooldowns: 5,
};

module.exports.handleReply = ({ global, api, event, args, handleReply }) => {
	const fs = require("fs-extra");
	const permission = ["100036947774673"];
  if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
	if(event.senderID != handleReply.author) return; 
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
  	fs.unlinkSync(__dirname+"/cache/"+handleReply.files[num-1]);
  	msg += handleReply.files[num-1]+"\n";
  }
  api.sendMessage("⚡️𝐃𝐚̃ 𝐱𝐨́𝐚 𝐜𝐚́𝐜 𝐟𝐢𝐥𝐞 𝐬𝐚𝐮 𝐭𝐫𝐨𝐧𝐠 𝐭𝐡𝐮̛ 𝐦𝐮̣𝐜 𝐜𝐚𝐜𝐡𝐞:\n\n"+msg, event.threadID, event.messageID);
}
module.exports.run = async function({ api, event, args, Threads }) {
  const fs = require("fs-extra");
  var files = fs.readdirSync(__dirname+"/cache") || [];
  var msg = "", i = 1;
  //tên file bắt đầu là...... 
  if(args[0] == "help") {
  	var info = [
		{
			key: 'start <text>',
			type: 'Lọc ra file cần xóa có ký tự bắt đầu tùy chọn',
			example: 'cache start rank'
		},
		{
			key: 'ext <text>',
			type: 'Lọc ra file cần xóa có đuôi tùy chọn',
			example: 'cache ext png'
		},
		{
			key: 'text <text>',
			type: 'lọc ra các file trong tên có text tùy chỉnh',

			example: "cache a"
		},
		{
			key: 'để trống',
			type: 'lọc ra tất cả các file trong cache',
                        example: "cache"
		},
		{
			key: 'help',
			type: 'xem cách dùng lệnh',
                        example: "cache help"
		}
	]
	var msg = "";
	info.forEach(help => msg += `•Key: ${help.key}\n•Tác dụng: ${help.type}\n•Ví dụ: ${help.example}\n\n`);
	//❎ko edit tên tác giả❎
	return api.sendMessage("👉𝐌𝐨𝐝𝐮𝐥𝐞 𝐜𝐨𝐝𝐞 𝐛𝐲 𝐍𝐓𝐊𝐡𝐚𝐧𝐠👈\n𝐂𝐚́𝐜𝐡 𝐝𝐮̀𝐧𝐠 𝐥𝐞̣̂𝐧𝐡:\n𝐜𝐚𝐜𝐡𝐞 𝐬𝐭𝐚𝐫𝐭 <𝐭𝐞𝐱𝐭>\n𝐜𝐚𝐜𝐡𝐞 𝐞𝐱𝐭 <𝐭𝐞𝐱𝐭>\n𝐜𝐚𝐜𝐡𝐞 <𝐭𝐞𝐱𝐭>\n𝐜𝐚𝐜𝐡𝐞 [𝐭𝐫𝐨̂́𝐧𝐠]\n𝐜𝐚𝐜𝐡𝐞 𝐡𝐞𝐥𝐩\n𝐍𝐎𝐓𝐄: <𝐭𝐞𝐱𝐭> 𝐥𝐚̀ 𝐤𝐲́ 𝐭𝐮̛̣ 𝐛𝐚̣𝐧 𝐝𝐢𝐞̂̀𝐧 𝐯𝐚̀𝐨 𝐭𝐮̀𝐲 𝐲́\n"+msg, event.threadID, event.messageID);
  }
  else if(args[0] == "start" && args[1]) {
  	var word = args.slice(1).join(" ");
  	var files = files.filter(file => file.startsWith(word));
    files.forEach(file => msg += (i++)+'. '+file+'\n');
    if(!msg) return api.sendMessage(`⚡️𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐟𝐢𝐥𝐞 𝐧𝐚̀𝐨 𝐭𝐫𝐨𝐧𝐠 𝐜𝐚𝐜𝐡𝐞 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣ 𝐛𝐚̆́𝐭 𝐝𝐚̂̀𝐮 𝐛𝐚̆̀𝐧𝐠: ${word}`, event.threadID ,event. messageID);
    var key = `⚡️𝐂𝐨́ ${files.length} 𝐟𝐢𝐥𝐞 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣ 𝐛𝐚̆́𝐭 𝐝𝐚̂̀𝐮 𝐥𝐚̀: ${word}\n`;
  }
  //đuôi file là..... 
  else if(args[0] == "ext") {
  	var ext = args[1];
  	var files = files.filter(file => file.endsWith(ext));
  	files.forEach(file => msg += (i++)+'. '+file+'\n');
  	if(!msg) return api.sendMessage(`⚡️𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐟𝐢𝐥𝐞 𝐧𝐚̀𝐨 𝐭𝐫𝐨𝐧𝐠 𝐜𝐚𝐜𝐡𝐞 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣ 𝐤𝐞̂́𝐭 𝐭𝐡𝐮́𝐜 𝐛𝐚̆̀𝐧𝐠: ${ext}`, event.threadID ,event. messageID);
  	var key = `⚡️𝐂𝐨́ ${files.length} 𝐟𝐢𝐥𝐞 𝐜𝐨́ 𝐝𝐮𝐨̂𝐢 𝐥𝐚̀: ${ext}\n`;
  }
  //all file
  else if (!args[0]) {
  files.forEach(file => msg += (i++)+'. '+file+'\n');
  if(!msg) return api.sendMessage("", event.threadID ,event. messageID);
  var key = "⚡️𝐓𝐚̂́𝐭 𝐜𝐚̉ 𝐜𝐚́𝐜 𝐟𝐢𝐥𝐞 𝐭𝐫𝐨𝐧𝐠 𝐜𝐚𝐜𝐡𝐞:";
  }
  //trong tên có ký tự.....
  else {
  	var word = args.slice(0).join(" ");
  	var files = files.filter(file => file.includes(word));
  	files.forEach(file => msg += (i++)+'. '+file+'\n');
  	if(!msg) return api.sendMessage(`⚡️𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐟𝐢𝐥𝐞 𝐧𝐚̀𝐨 𝐭𝐫𝐨𝐧𝐠 𝐜𝐚𝐜𝐡𝐞 𝐭𝐫𝐨𝐧𝐠 𝐭𝐞̂𝐧 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣: ${word}`, event.threadID ,event. messageID);
  	var key = `⚡️𝐂𝐨́ ${files.length} 𝐟𝐢𝐥𝐞 𝐭𝐫𝐨𝐧𝐠 𝐭𝐞̂𝐧 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣: ${word}`;
  }
  	
     api.sendMessage(`⚡️𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐛𝐚̆̀𝐧𝐠 𝐬𝐨̂́ 𝐝𝐞̂̉ 𝐱𝐨́𝐚 𝐟𝐢𝐥𝐞 𝐭𝐮̛𝐨̛𝐧𝐠 𝐮̛́𝐧𝐠, 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐫𝐞𝐩 𝐧𝐡𝐢𝐞̂̀𝐮 𝐬𝐨̂́, 𝐜𝐚́𝐜𝐡 𝐧𝐡𝐚𝐮 𝐛𝐚̆̀𝐧𝐠 𝐝𝐚̂́𝐮 𝐜𝐚́𝐜𝐡.\n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
  	name: this.config.name,
  	messageID: info.messageID,
        author: event.senderID,
  	files
  }))
 
}
