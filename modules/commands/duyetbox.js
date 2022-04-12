module.exports.config = {
	name: "duyetbox",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "DungUwU mod by Nam",
	description: "duyệt box dùng bot xD",
	commandCategory: "Admin",
    cooldowns: 5
};


const dataPath = __dirname + "/cache/approvedThreads.json";
const dataPending = __dirname + "/cache/pendingdThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
	if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Users, args }) {
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type } = handleReply;
    let data = JSON.parse(fs.readFileSync(dataPath));
    let dataP = JSON.parse(fs.readFileSync(dataPending));
    let idBox = (args[0]) ? args[0] : threadID;
  switch (type) {
        case "pending": {
          switch (body) {
                case `A`: {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`» Phê duyệt thành công box:\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    	}, messageID)
        }
        }
      }
    }
  }
module.exports.run = async  ({ event, api, args, Threads, Users, handleReply  }) => {
	const { threadID, messageID, senderID } = event;
	let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let msg = "";
  var lydo = args.splice(2).join(" ");
  let idBox = (args[0]) ? args[0] : threadID;
        if (args[0] == "list" || args[0] == "l") {
    	msg = `=====「 Các Box: ${data.length} 」 ====`;
    	let count = 0;
    	for (e of data) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
    		msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
    	}
    	api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "a",
        })
    }, messageID);
        }
     else if (args[0] == "pending" || args[0] == "p") {
    	msg = `=====「 DS BOX CHƯA DUYỆT: ${dataP.length} 」 ====`;
    	let count = 0;
    	for (e of dataP) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
    		msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
    	}
    	api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "pending",
        })
    }, messageID);
     }
       else if (args[0] == "help" || args[0] == "h") {
         const tst = (await Threads.getData(String(event.threadID))).data || {};
  const pb = (tst.hasOwnProperty("PREFIX")) ? tst.PREFIX : global.config.PREFIX;
  const nmdl = this.config.name
  const cre = this.config.credits
        return api.sendMessage(`=====「 DUYỆT 」=====\n\n${pb}${nmdl} l/list => xem danh sách box được duyệt\n\n${pb}${nmdl} p/pending => xem danh sách box chưa duyệt\n\n${pb}${nmdl} d/del => kèm theo ID để xóa khỏi danh sách được dùng bot\n\n${pb}${nmdl} => kèm theo ID để duyệt box đó\n\n⇒ ${cre} ⇐`, threadID, messageID);
       }
      
    else if (args[0] == "del" || args[0] == "d") {
    	idBox = (args[1]) ? args[1] : event.threadID;
      if (isNaN(parseInt(idBox))) return api.sendMessage("Không phải một con số", threadID, messageID);
    	if (!data.includes(idBox)) return api.sendMessage("Box không được duyệt từ trước!", threadID, messageID);
      api.sendMessage(`Nhóm bạn đã bị admin gỡ khỏi danh sách duyệt với lý do: ${lydo}`, idBox);
    	api.sendMessage(`Box đã bị gỡ khỏi danh sách được phép dùng bot`, threadID, () => {
    		data.splice(data.indexOf(idBox), 1);
    		fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    	}, messageID)
    }
    else if (isNaN(parseInt(idBox))) api.sendMessage("ID bạn nhập không hợp lệ", threadID, messageID);
    else if (data.includes(idBox)) api.sendMessage(`ID ${idBox} đã được phê duyệt từ trước!`, threadID, messageID);
   	else api.sendMessage("Nhóm bạn đã được admin phê duyệt", idBox, (error, info) => {
   		api.changeNickname(` 〖 ${global.config.PREFIX} 〗 ➺ ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, idBox, global.data.botID);
      const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
      
      axios.get('https://api.xlshsad.repl.co/images/mirai').then(res => {
	var image = res.data.url;
	let callback = function () {
      api.sendMessage({body: `🔱🪂𝗣𝗵𝗲̂ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴✅\n\n❯ 𝑩𝒂̂𝒚 𝑯 𝑩𝒐𝒙 𝑪𝒖̉𝒂 𝑩𝒂̣𝒏 𝑪𝒐́ 𝑻𝒉𝒆̂̉ 𝑺𝒖̛̉ 𝑫𝒖̣𝒏𝒈 𝑩𝒐𝒕\n❯ 𝑺𝒖̛̉ 𝒅𝒖̣𝒏𝒈 ,𝙢𝙚𝙣𝙪 𝒉𝒐𝒂̣̆𝒄 ,𝙝𝙚𝙡𝙥 đ𝒆̂̉ 𝒃𝒊𝒆̂́𝒕 𝒕𝒐𝒂̀𝒏 𝒃𝒐̣̂ 𝒍𝒆̣̂𝒏𝒉 𝒄𝒐́ 𝒎𝒂̣̆𝒕 𝒕𝒓𝒆̂𝒏 𝒃𝒐𝒕 𝒏𝒂̀𝒚\n『𝐂𝐨𝐧𝐭𝐚𝐜𝐭: fb.me/100036947774673』`,
						attachment: fs.createReadStream(__dirname + `/cache/duyet.jpg`)
					}, event.threadID,() => fs.unlinkSync(__dirname + `/cache/duyet.jpg`), event.messageID, idBox);
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/duyet.jpg`)).on("close", callback);
			}) 
   		if (error) return api.sendMessage("Đã có lỗi xảy ra, đảm bảo rằng id bạn nhập hợp lệ và bot đang ở trong box!", threadID, messageID);
   		else {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`» Phê duyệt thành công box:\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    	}, messageID)
        }
   	});
							}
