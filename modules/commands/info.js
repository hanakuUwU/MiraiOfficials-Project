module.exports.config = {
  name: "info",
  version: "18.0.7",
  hasPermssion: 0,
  credits: "Hung Cho mod Nguyen",
  description: "Xem thông tin thread/user",
  commandCategory: "Tiện ích",
  usages: "[thread/user]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs-extra": "",
    "request": ""
  }
}

module.exports.run = async function ({ api, event, args, Users}) {
  const { threadID, messageID, senderID, type, mentions } = event;
  const fs = require("fs-extra");
  const request = require("request");
  const axios = require("axios")
  if (args.length == 0) return api.sendMessage(`Vui lòng dùng\n=> ${global.config.PREFIX}${this.config.name} thread\n=> ${global.config.PREFIX}${this.config.name} user`, threadID);

  if (args[0] == "thread") {
    let threadInfo = await api.getThreadInfo(threadID);
	var memLength = threadInfo.participantIDs.length;
	let threadMem = threadInfo.participantIDs.length;
	var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];
     for (let z in threadInfo.userInfo) {
     	var gioitinhone = threadInfo.userInfo[z].gender;
     	var nName = threadInfo.userInfo[z].name;
        if(gioitinhone == "MALE"){gendernam.push(z+gioitinhone)}
        else if(gioitinhone == "FEMALE"){gendernu.push(gioitinhone)}
            else{nope.push(nName)}
    };
	var nam = gendernam.length;
    var nu = gendernu.length;
  let adminIDs = threadInfo.adminIDs;  
	let qtv = threadInfo.adminIDs.length;
	let sl = threadInfo.messageCount;
	let u = threadInfo.nicknames;
	let icon = threadInfo.emoji;
	let threadName = threadInfo.threadName;
	let sex = threadInfo.approvalMode;
			var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'Kh';
			var callback = () =>
				api.sendMessage(
					{
						body: `⭐️Tên: ${threadName}\n👨‍💻 ID Box: ${threadID}\n👀 Phê duyệt: ${pd}\n🧠 Emoji: ${icon}\n👉 Thông tin: gồm ${threadMem} thành viên và ${qtv} quản trị viên\n🤷‍♀️Gồm ${nam} và ${nu} nữ\n🕵️‍♀️ Tổng số tin nhắn: ${sl} tin.`,
						attachment: fs.createReadStream(__dirname + '/cache/1.png')
					},
					threadID,
					() => fs.unlinkSync(__dirname + '/cache/1.png'),
					messageID
				);
			return request(encodeURI(`${threadInfo.imageSrc}`))
				.pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
				.on('close', () => callback());
  }

  if (args[0] == "user") {
    if (type == "message_reply") {
      uid = event.messageReply.senderID
    } else if (args.join().indexOf('@') !== -1) {
        var uid = Object.keys(mentions)[0]
    }  else {
        var uid = senderID
  } 
     let data = await api.getUserInfo(uid),
       { profileUrl, gender } = data[uid];
    let name = await Users.getNameUser(uid)
    var callback = () => api.sendMessage({body:
      `💦Tên: `+ name +
      `\n🐧UID: `+ uid +
      `\n🏝Profile:\n `+ profileUrl +
      `\n🦋Giới Tính: `+ (gender == 2 ? 'Nam' : gender == 1 ? 'Nữ' : 'UNKNOWN'),attachment: fs.createReadStream(__dirname + "/cache/1.png")}, threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), messageID);   
       return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
  }
}
