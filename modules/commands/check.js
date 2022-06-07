const axios = require("axios");
module.exports.config = {
	name: "check",
	version: "0.0.1-beta",
	hasPermssion: 0,
	credits: "Adonis",
	description: "",
	commandCategory: "Tiện ích",
	usages: "check",
	cooldowns: 5,
    dependencies: {
        "axios": "",
        "fs-extra": ""
    }
};

module.exports.run = async ({ args, api, event, Currencies, client }) => {
   const { threadID, senderID, messageID, type, mentions } = event;
   const moment = require("moment-timezone");
    var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
   if (args.length == 0) return api.sendMessage(
     ` ===  Bạn có thể dùng  === \n` + 
     `--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} luotdung => Check số lượt dùng còn lại của bạn` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} ndfb => Lọc thành viên bị bay acc khỏi nhóm` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} del => Lọc thành viên khỏi nhóm theo số tin nhắn` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} onl => Xem thời gian hoạt động bot onl` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} tt => Check độ tương tác của bạn` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} box => Lọc nhóm dưới 4 thành viên` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} all => Check tất cả độ tương tác các thành viên trong box` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} covid => Xem thông tin covid` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} mayman => Xem Tỉ lệ % may mắn của bạn?` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} nude => Check những ảnh gợi cảm` +
     `\n--------\n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => ${global.config.PREFIX}${this.config.name} ip => check ip web minecraft` +
     `\n--------\n    === 「${timeNow}」 ===`, event.threadID, event.messageID);
    var arr = [];
    var mention = Object.keys(event.mentions);
    const data = await api.getThreadInfo(event.threadID);
    if (args[0] == "ndfb") {// kick người dùng fb
    const find = data.adminIDs.find(el => el.id == event.senderID && api.getCurrentUserID());

    if (!find) return api.sendMessage(`[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => Bạn và bot cần là quản trị viên!`,event.threadID);
      let storage = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "gender": value.gender});
        for (const user of storage) {
            if (user.gender == undefined) api.removeUserFromGroup(user.id,event.threadID)
        }return;
    }  else if (args[0] == "del") {// lọc thành viên theo số tin nhắn bạn cần
    const find = data.adminIDs.find(el => el.id == event.senderID && api.getCurrentUserID());
    if (!find) return api.sendMessage(`[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => Bạn và bot cần là quản trị viên!`,event.threadID);
    if (!args[1]) return api.sendMessage(`[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => HDSD: check del => số tin nhắn cần lọc `,event.threadID);
      let storage = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = (await Currencies.getData(user.id)).exp;
            if (typeof countMess == "undefined") await Currencies.setEXP(mention, parseInt(0))
           // if (countMess ==  undefined) api.removeUserFromGroup(user.id,event.threadID)
            if (countMess <= args[1]) setTimeout(function() { api.removeUserFromGroup(user.id,event.threadID) }, 2000);
        } return;
    }else if (args[0] == "covid") {
      const axios_1 = require("axios");
  const moment = require("moment-timezone");
  var time = moment.tz("Asia/Ho_Chi_Minh").format("YYYY");
   let fetchdata = await axios_1.get("https://static.pipezero.com/covid/data.json");
  var jsondata = (await fetchdata.data).total;
  var vn = (await fetchdata.data).overview[6];
  var year = vn.date + '-' + time;
  var world = jsondata.world,
    nhiemtg = world.cases,
    chettg = world.death,
    hoiphuctg = world.recovered,
    //////////////////////////////
    nhiemvn = vn.cases,
    chetvn = vn.death,
    hoiphucvn = vn.recovered,
    dieutrivn = vn.treating,
    //////////////////////////////
    nhiemvn7days = vn.avgCases7day,
    hoiphucvn7days = vn.avgRecovered7day,
    chetvn7days = vn.avgDeath7day,
    //////////////////////////////
    ptchetvn = Math.round((chetvn * 100) / nhiemvn),
    pthoiphucvn = Math.round((hoiphucvn * 100) / nhiemvn),
    ptchettg = Math.round((chettg * 100) / nhiemtg),
    pthoiphuctg = Math.round((hoiphuctg * 100) / nhiemtg),
    pthoiphucvn = pthoiphucvn.toString().split(".")[0],
    ptdieutrivn = (100 - pthoiphucvn - ptchetvn).toString().split(".")[0];
  /////////////////////////////////
  ptchetvn = ptchetvn.toString().split(".")[0];
  pthoiphuctg = pthoiphuctg.toString().split(".")[0];
  ptchettg = ptchettg.toString().split(".")[0];
  return api.sendMessage(
    "====== Thế Giới ======\n" +
    `😷 Nhiễm: ${nhiemtg}\n` +
    `💚 Hồi phục: ${hoiphuctg} (${pthoiphuctg}%)\n` +
    `💀 Tử vong: ${chettg} (${ptchettg}%)\n` +
    "====== Việt Nam ======\n" +
    `😷 Nhiễm: ${nhiemvn}\n` +
    `💉 Đang điều trị: ${dieutrivn} (${ptdieutrivn}%)\n` +
    `💚 Hồi phục: ${hoiphucvn} (${pthoiphucvn}%)\n` +
    `💀 Tử vong: ${chetvn} (${ptchetvn}%)\n` +
    `🤨 Nhiễm 7 ngày: ${nhiemvn7days}\n` +
    `❤ Hồi phục 7 ngày: ${hoiphucvn7days}\n` +
    `☠️ Tử vong 7 ngày: ${chetvn7days}\n\n` +
    //`Tin tức: ${news.vietnam}\n` +
    `Cập nhật: ${year}`,
    event.threadID, event.messageID
  );
}
    else if (args[0] == "box") {
      if (event.senderID != 100036947774673) return api.sendMessage(`Bạn làm gì vậy :>`, event.threadID, event.messageID)
            let number = [];
            api.getThreadList(50, null, ["INBOX"], (err, list) => getInfo({ list }))
            api.getThreadList(50, null, ["OTHER"], (err, list) => getInfo({ list }))
            api.getThreadList(50, null, ["PENDING"], (err, list) => getInfo({ list }))
            api.getThreadList(50, null, ["unread"], (err, list) => getInfo({ list }))
            var getInfo = ({ list }) => {
              list.forEach(info => {
                if (info.name == "" || info.participants < 8 || info.imageSrc == null) { 
                  number.push(info);
                  api.removeUserFromGroup(api.getCurrentUserID(),info.threadID);
                  api.deleteThread(info.threadID, (err) => {
                    Threads.delData(info.threadID)
                    if(err) return console.error(err);
                    });
                }
              })
            }
           return api.sendMessage(`[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => Đang tiến hành lọc những nhóm không tên và dưới 4 thành viên.`,threadID)
    }

    else if (args[0] == "onl") {
      	let time = process.uptime();
	let hours = Math.floor(time / (60 * 60));
	let minutes = Math.floor((time % (60 * 60)) / 60);
	let seconds = Math.floor(time % 60);
      const timeStart = Date.now();
       return api.sendMessage('[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => Đang kiểm tra kết nối vui lòng chờ⏳... !████████████ 99%', event.threadID, (err, info) => {
    setTimeout(() => {
      api.sendMessage(`[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => Ping: ${(Date.now() - timeStart)}ms \n[ 𝐂𝐡𝐚𝐭𝐁𝐨𝐭 ] => TimeOn: ${hours} Giờ ${minutes} Phút ${seconds} Giây`, event.threadID, event.messageID);
    }, 200);
  }, event.messageID);
} else if (args[0] == "mayman") {
const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var tile = Math.floor(Math.random() * 101); 
    var link = ["https://i.imgur.com/gWACvcO.jpg",
    "https://i.imgur.com/mpHit7i.jpg",
    "https://i.imgur.com/glHFetf.jpg",
    "https://i.imgur.com/CxwzNMv.png",
    "https://i.imgur.com/RVerKnc.jpg"
    ];
var callback = () => api.sendMessage({body:`⚜Tỉ lệ may mắn của bạn là ${tile}% ⚜`, attachment: fs.createReadStream(__dirname + "/cache/tile.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tile.jpg")); 
       return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/tile.jpg")).on("close",() => callback());
 }
    else if (args[0] == "nude") {
  var linkanh =  event.messageReply.attachments[0].url || args.join(" ");
	if(!linkanh) return api.sendMessage('Vui lòng reply hoặc nhập link 1 hình ảnh!!!', event.threadID, event.messageID)
const res = await axios.get(`https://manhict.tech/checknude?key=mzk_G8D0BIPFX70FXUYEUL5&link=${encodeURIComponent(linkanh)}`);    
var img = res.data.NSFW_Prob;
    return api.sendMessage(`tỷ lệ nude của ảnh là: ${img}`, event.threadID, event.messageID);
	
} else if (args[0] == "all") {
      let threadInfo = await api.getThreadInfo(event.threadID);
        let number = 0, msg = "", storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            if (user.name != null) exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
        });
         let rank = exp.findIndex(info => parseInt(info.uid) == parseInt(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`)) + 1;
        let infoUser = exp[rank - 1];
        for (const lastData of exp) {
            number++;
            msg += `『${number}』: ${(lastData.name) == null || undefined  ? "Không tên" : lastData.name} với ${lastData.exp} tin nhắn \n`;
        }
        return api.sendMessage(`==「KIỂM TRA TƯƠNG TÁC」==\n\n` + msg +`\n» 💹Tỉ lệ tương tác: ${(exp[rank].exp).toFixed(0)}%\n» 💬 Tổng số tin nhắn: ${threadInfo.messageCount}\n    === 「${timeNow}」 ===`, threadID, messageID);
    }
    
    else if (args[0] == "tt") {
        let storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            if (a.id > b.id) return 1;
		    if (a.id < b.id) return -1;
        });
        let rank = exp.findIndex(info => parseInt(info.uid) == parseInt(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`)) + 1;
        let infoUser = exp[rank - 1];
        return api.sendMessage(`\n» Bạn`+` đứng hạng ${rank} với ${infoUser.exp} tin nhắn\n» 👤Tên: ${infoUser.name}\n» ⬛Hạng: ${rank} \n» 💬Tin nhắn: ${infoUser.exp}\n» 🏆Rank: ${rank + 1}\n» 💹Tỉ lệ tương tác: ${(exp[rank].exp).toFixed(0)}%\n» ⏰Time: ${timeNow}`, event.threadID,event.messageID);
    }
  else if (args[0] == "()") {
        let storage = [], exp = [];
        for (const value of data.userInfo) storage.push({"id" : value.id, "name": value.name});
        for (const user of storage) {
            const countMess = await Currencies.getData(user.id);
            exp.push({"name" : user.name, "exp": (typeof countMess.exp == "undefined") ? 0 : countMess.exp, "uid": user.id});
        }
        exp.sort((a, b) => {
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            if (a.id > b.id) return 1;
		    if (a.id < b.id) return -1;
        });
        let rank = exp.findIndex(info => parseInt(info.uid) == parseInt(`${(event.type == "message_reply") ? event.messageReply.senderID : event.senderID}`)) + 1;
        let infoUser = exp[rank - 1];
        return api.sendMessage(`\n» Bạn`+` đứng hạng ${rank} với ${infoUser.exp} tin nhắn\n» 👤Tên: ${infoUser.name}\n» ⬛Hạng: ${rank} \n» 💬Tin nhắn: ${infoUser.exp}\n» 🏆Rank: ${rank + 1}\n» 💹Tỉ lệ tương tác: ${(exp[rank].exp).toFixed(0)}%\n» ⏰Time: ${timeNow}`, event.threadID,event.messageID);
    }
  else if (args[0] == "luotdung") {
  var usages = JSON.parse(require("fs").readFileSync(__dirname + '/../../includes/handle/usages.json'));
  if (args[1] == "all") {
    let storage = [], sl = [];
    for (const value of data.userInfo) storage.push({ "id": value.id, "name": value.name });
    let getDay = require("moment-timezone").tz("Asia/Ho_Chi_Minh").day();
    for (const user of storage) {
      if (!(user.id in usages)) usages[user.id] = {
        day: getDay,
        usages: 20
      }
      sl.push({ "name": user.name, "sl": (typeof usages[user.id].usages == "undefined") ? 0 : usages[user.id].usages, "uid": user.id });
    }
    sl.sort((a, b) => {
      if (a.sl > b.sl) return -1;
      if (a.sl < b.sl) return 1;
      if (a.id > b.id) return 1;
      if (a.id < b.id) return -1;
      a.name.localeCompare(b.name, undefined, { numeric: true });
    });
    msg = "==「KIỂM TRA LƯỢT DÙNG」==\n";
    let countsl = 0
    for (let e of sl) {
      msg += `\n${countsl += 1}. ${e.name} - ${e.sl} lượt.`
    }
    msg += `\n=== 「${timeNow}」 ===`;
    require("fs").writeFileSync(__dirname + '/../../includes/handle/usages.json', JSON.stringify(usages, null, 4));
    return api.sendMessage(msg, threadID);
  }
  api.sendMessage(`Bạn còn ${usages[senderID].usages} lượt dùng bot.`, threadID, messageID);
     }
  else if (args[0] == "ip") {
    if(!args[1]){ 
    return api.sendMessage(`Vui lòng nhập ip or link sever minecraft `,event.threadID, event.messageID)
  }
  const res = await axios.get(`https://api.mcsrvstat.us/2/${args[1]}`);
  const onl = res.data.online;
  const ip = res.data.ip;
  const port = res.data.port;
  const host = res.data.hostname;
    return api.sendMessage({body: 
    `= MÁY CHỦ MINECRAFT JAVA =` +
    `\nHostName: ` + host +
    `\nTrạng Thái: ` + (onl == true ? 'premium' : onl == false ? 'crack' : 'UNKNOWN') +
    `\nĐịa chỉ IP: ` + ip +
    `\nPort: ` + port
    }, event.threadID, event.messageID)
  }
}
