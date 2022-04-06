module.exports.config = {
    name: "file",
    version: "1.0.1",
    hasPermssion: 2,
    credits: "NTKhang mod lại tí by Dyy",
    description: "Xóa file hoặc folder trong thư mục commands",
    commandCategory: "admin",
    usages: "\ncommands start <text>\ncommands ext <text>\ncommands <text>\ncommands [để trống]\ncommands help\nNOTE: <text> là ký tự bạn điền vào tùy ý",
    cooldowns: 5
};

module.exports.handleReply = ({ api, event, args, handleReply }) => {
    if(event.senderID != handleReply.author) return; 
    const fs = require("fs-extra");
  var arrnum = event.body.split(" ");
  var msg = "";
  var nums = arrnum.map(n => parseInt(n));

  for(let num of nums) {
    var target = handleReply.files[num-1];
    var fileOrdir = fs.statSync(__dirname+'/'+target);
        if(fileOrdir.isDirectory() == true) {
          var typef = "[𝐅𝐨𝐥𝐝𝐞𝐫🗂️]";
          fs.rmdirSync(__dirname+'/'+target, {recursive: true});
        }
        else if(fileOrdir.isFile() == true) {
          var typef = "[𝐅𝐢𝐥𝐞📄]";
          fs.unlinkSync(__dirname+"/"+target);
        }
        msg += typef+' '+handleReply.files[num-1]+"\n";
  }
  api.sendMessage("⚡️𝐃𝐚̃ 𝐱𝐨́𝐚 𝐜𝐚́𝐜 𝐟𝐢𝐥𝐞 𝐬𝐚𝐮 𝐭𝐫𝐨𝐧𝐠 𝐭𝐡𝐮̛ 𝐦𝐮̣𝐜 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬:\n\n"+msg, event.threadID, event.messageID);
}


module.exports.run = async function({ api, event, args, Threads }) {
const permission = ["100036947774673"];
    if (!permission.includes(event.senderID)) return api.sendMessage("Bạn làm gì vậy :>", event.threadID, event.messageID);
  const fs = require("fs-extra");
  var files = fs.readdirSync(__dirname+"/") || [];
  var msg = "", i = 1;
  
//

  if(args[0] == 'help') {
    var msg = `
𝐂𝐚́𝐜𝐡 𝐝𝐮̀𝐧𝐠 𝐥𝐞̣̂𝐧𝐡:
•𝐊𝐞𝐲: 𝐬𝐭𝐚𝐫𝐭 <𝐭𝐞𝐱𝐭>
•𝐓𝐚́𝐜 𝐝𝐮̣𝐧𝐠: 𝐋𝐨̣𝐜 𝐫𝐚 𝐟𝐢𝐥𝐞 𝐜𝐚̂̀𝐧 𝐱𝐨́𝐚 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣ 𝐛𝐚̆́𝐭 𝐝𝐚̂̀𝐮 𝐭𝐮̀𝐲 𝐜𝐡𝐨̣𝐧
•𝐕𝐢́ 𝐝𝐮̣: 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐫𝐚𝐧𝐤
•𝐊𝐞𝐲: 𝐞𝐱𝐭 <𝐭𝐞𝐱𝐭>
•𝐓𝐚́𝐜 𝐝𝐮̣𝐧𝐠: 𝐋𝐨̣𝐜 𝐫𝐚 𝐟𝐢𝐥𝐞 𝐜𝐚̂̀𝐧 𝐱𝐨́𝐚 𝐜𝐨́ 𝐝𝐮𝐨̂𝐢 𝐭𝐮̀𝐲 𝐜𝐡𝐨̣𝐧
•𝐓𝐚́𝐜 𝐝𝐮̣𝐧𝐠: 𝐥𝐨̣𝐜 𝐫𝐚 𝐜𝐚́𝐜 𝐟𝐢𝐥𝐞 𝐭𝐫𝐨𝐧𝐠 𝐭𝐞̂𝐧 𝐜𝐨́ 𝐭𝐞𝐱𝐭 𝐭𝐮̀𝐲 𝐜𝐡𝐢̉𝐧𝐡
•𝐕𝐢́ 𝐝𝐮̣: 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐚
•𝐊𝐞𝐲: 𝐝𝐞̂̉ 𝐭𝐫𝐨̂́𝐧𝐠
•𝐓𝐚́𝐜 𝐝𝐮̣𝐧𝐠: 𝐥𝐨̣𝐜 𝐫𝐚 𝐭𝐚̂́𝐭 𝐜𝐚̉ 𝐜𝐚́𝐜 𝐟𝐢𝐥𝐞 𝐭𝐫𝐨𝐧𝐠 𝐜𝐚𝐜𝐡𝐞
•𝐕𝐢́ 𝐝𝐮̣: 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬
•𝐊𝐞𝐲: 𝐡𝐞𝐥𝐩
•𝐓𝐚́𝐜 𝐝𝐮̣𝐧𝐠: 𝐱𝐞𝐦 𝐜𝐚́𝐜𝐡 𝐝𝐮̀𝐧𝐠 𝐥𝐞̣̂𝐧𝐡
•𝐕𝐢́ 𝐝𝐮̣: 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐡𝐞𝐥𝐩`;
    
    return api.sendMessage(msg, event.threadID, event.messageID);
  }
  else if(args[0] == "start" && args[1]) {
    var word = args.slice(1).join(" ");
    var files = files.filter(file => file.startsWith(word));
    
    if(files.length == 0) return api.sendMessage(`⚡️𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐟𝐢𝐥𝐞 𝐧𝐚̀𝐨 𝐭𝐫𝐨𝐧𝐠 𝐜𝐚𝐜𝐡𝐞 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣ 𝐛𝐚̆́𝐭 𝐝𝐚̂̀𝐮 𝐛𝐚̆̀𝐧𝐠: ${word}`, event.threadID ,event. messageID);
    var key = `⚡️𝐂𝐨́ ${files.length} 𝐟𝐢𝐥𝐞 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣ 𝐛𝐚̆́𝐭 𝐝𝐚̂̀𝐮 𝐥𝐚̀: ${word}`;
  }
  
  //đuôi file là..... 
  else if(args[0] == "ext" && args[1]) {
    var ext = args[1];
    var files = files.filter(file => file.endsWith(ext));
    
    if(files.length == 0) return api.sendMessage(`⚡️𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐟𝐢𝐥𝐞 𝐧𝐚̀𝐨 𝐭𝐫𝐨𝐧𝐠 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣ 𝐤𝐞̂́𝐭 𝐭𝐡𝐮́𝐜 𝐛𝐚̆̀𝐧𝐠: ${ext}`, event.threadID ,event. messageID);
    var key = `⚡️𝐂𝐨́ ${files.length} 𝐟𝐢𝐥𝐞 𝐜𝐨́ 𝐝𝐮𝐨̂𝐢 𝐥𝐚̀: ${ext}`;
  }
  //all file
  else if (!args[0]) {
  if(files.length == 0) return api.sendMessage("⚡️𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐟𝐢𝐥𝐞 𝐡𝐨𝐚̣̆𝐜 𝐟𝐨𝐥𝐝𝐞𝐫 𝐧𝐚̀𝐨", event.threadID ,event. messageID);
  var key = "⚡️𝐓𝐚̂́𝐭 𝐜𝐚̉ 𝐜𝐚́𝐜 𝐟𝐢𝐥𝐞 𝐭𝐫𝐨𝐧𝐠 𝐭𝐡𝐮̛ 𝐦𝐮̣𝐜 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬:";
  }
  //trong tên có ký tự.....
  else {
    var word = args.slice(0).join(" ");
    var files = files.filter(file => file.includes(word));
    if(files.length == 0) return api.sendMessage(`⚡️𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐟𝐢𝐥𝐞 𝐧𝐚̀𝐨 𝐭𝐫𝐨𝐧𝐠 𝐭𝐞̂𝐧 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣: ${word}`, event.threadID ,event. messageID);
    var key = `⚡️𝐂𝐨́ ${files.length} 𝐟𝐢𝐥𝐞 𝐭𝐫𝐨𝐧𝐠 𝐭𝐞̂𝐧 𝐜𝐨́ 𝐤𝐲́ 𝐭𝐮̛̣: ${word}`;
  }
  
    files.forEach(file => {
        var fileOrdir = fs.statSync(__dirname+'/'+file);
        if(fileOrdir.isDirectory() == true) var typef = "[𝐅𝐨𝐥𝐝𝐞𝐫🗂️]";
        if(fileOrdir.isFile() == true) var typef = "[𝐅𝐢𝐥𝐞📄]";
        msg += (i++)+'. '+typef+' '+file+'\n';
    });
    
     api.sendMessage(`⚡️𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐛𝐚̆̀𝐧𝐠 𝐬𝐨̂́ 𝐝𝐞̂̉ 𝐱𝐨́𝐚 𝐟𝐢𝐥𝐞 𝐭𝐮̛𝐨̛𝐧𝐠 𝐮̛́𝐧𝐠, 𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐫𝐞𝐩 𝐧𝐡𝐢𝐞̂̀𝐮 𝐬𝐨̂́, 𝐜𝐚́𝐜𝐡 𝐧𝐡𝐚𝐮 𝐛𝐚̆̀𝐧𝐠 𝐝𝐚̂́𝐮 𝐜𝐚́𝐜𝐡.\n${key}\n\n`+msg, event.threadID, (e, info) => global.client.handleReply.push({
    name: this.config.name,
    messageID: info.messageID,
    author: event.senderID,
    files
  }))
 
}
