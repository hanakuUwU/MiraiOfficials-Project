module.exports.config = {
  name: "duyetbox",
  version: "1.8.0",
  hasPermssion: 2,
  credits: "DungUwU mod by Nam mod full reply + gọn by TrúcCute",
  description: "quản lí box & user",
  commandCategory: "Bổ não",
  usages: "[help]",
  cooldowns: 5,
  dependencies: {
    "fs": ""
  }
}

let dataPath = __dirname + "/cache/approvedThreads.json";
let dataPending = __dirname + "/cache/pendingdThreads.json";
let fs = require("fs");

module.exports.onLoad = async ({ api, event }) => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}

module.exports.run = async ({ api, event, handleReply, Threads, args, Users }) => {
  let { threadID, senderID } = event;
  if (senderID != `100036947774673`) return
  if (this.config.credits != "DungUwU mod by Nam mod full reply + gọn by TrúcCute") return api.sendMessage(`Phát hiện thay credits`, threadID)
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let msg = "", count = 0;
  if (args[0] == "list") {
    if (data.length != 0) {
      msg = `Có ${data.length} Box & User đã được duyệt\n`;
      for (e of data) {
        let threadInfo = await api.getThreadInfo(e);
        let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
        msg += `\n[ ${count+=1} ] - ${threadName}\nID: ${e}\n`
      } api.sendMessage(`${msg}\nReply STT để gỡ khỏi danh sách đã duyệt`, threadID, (e, info) => {
        global.client.handleReply.push({
          type: "Delete",
          name: this.config.name,
          author: senderID,
          messageID: info.messageID,
          delete: data
        })
      })
    } else {
      api.sendMessage(`Không có Box & User nào được duyệt`, threadID)
    }
  }
  if (args[0] == "duyệt") {
    if (dataP.length != 0) {
      msg = `Có ${dataP.length} Box & User chưa được duyệt\n`;
      for (e of dataP) {
        let threadInfo = await api.getThreadInfo(e);
        let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
        msg += `\n[ ${count+=1} ] - ${threadName}\nID: ${e}\n`
      } api.sendMessage(`${msg}\nReply STT để duyệt`, threadID, (e, info) => {
        global.client.handleReply.push({
          type: "Pending",
          name: this.config.name,
          author: senderID,
          messageID: info.messageID,
          pending: dataP
        })
      })
    } else {
      api.sendMessage(`Không có Box & User nào chưa được duyệt`, threadID)
    }
  }
  if (args[0] == "help") {
    let threadSetting = (await Threads.getData(String(threadID))).data || {};
    let prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    api.sendMessage(`Bạn có thể dùng:\n1. ${prefix}${this.config.name} list để xem danh sách đã duyệt\n2. ${prefix}${this.config.name} duyệt để xem danh sách chưa duyệt\n3. ${prefix}${this.config.name} help để xem cách xài\n4. ${prefix}${this.config.name} trống để duyệt chính mình hoặc box`, threadID)
  }
  if (args[0] == "del") {
    idBox = args[1] || threadID;
    if (isNaN(parseInt(idBox))) return api.sendMessage("Không phải một con số", threadID);
    if (!data.includes(idBox)) return api.sendMessage("Box không được duyệt từ trước!", threadID);
    let threadInfo = await api.getThreadInfo(idBox);
    let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(idBox);
    api.sendMessage(`Đã xóa ${threadName} khỏi danh sách duyệt`, threadID)
    api.sendMessage(`Box đã bị gỡ khỏi danh sách được phép dùng bot`, idBox, () => {
      data.splice(data.indexOf(idBox), 1);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
    })
  } else if (args[0]) {
    let threadInfo = await api.getThreadInfo(args[0]);
    let ID = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(args[0]);
    if (isNaN(parseInt(args[0]))) api.sendMessage("ID bạn nhập không hợp lệ", threadID)
    if (data.includes(args[0])) {
      api.sendMessage(`${ID} đã được phê duyệt từ trước!`, threadID)
    } else {
      api.sendMessage(`Nhóm bạn đã được admin phê duyệt!`, args[0])
      api.sendMessage(`Đã thêm ${ID} vào danh sách đã duyệt`, threadID)
      api.changeNickname(`『 ${global.config.PREFIX} 』 ♡ ${(!global.config.BOTNAME) ? "This bot is made by GK" : global.config.BOTNAME}`, args[0], api.getCurrentUserID())
        data.push(args[0]);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      dataP.splice(dataP.indexOf(args[0]), 1);
      fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2))
    }
  } else if (!args[0]) {
    let threadInfo = await api.getThreadInfo(threadID);
    let ID = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(threadID);
    if (isNaN(parseInt(threadID))) api.sendMessage("ID bạn nhập không hợp lệ", threadID)
    if (data.includes(threadID)) {
      api.sendMessage(`${ID} đã được phê duyệt từ trước!`, threadID)
    } else {
      api.sendMessage(`Đã thêm ${ID} vào danh sách đã duyệt`, threadID)
      api.changeNickname(`『 ${global.config.PREFIX} 』 ♡ ${(!global.config.BOTNAME) ? "This bot is made by GK" : global.config.BOTNAME}`, threadID, api.getCurrentUserID())
        data.push(threadID);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      dataP.splice(dataP.indexOf(threadID), 1);
      fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2))
    }
  }
}

module.exports.handleReply = async function ({ event, api, handleReply, Users }) {
  let { body, threadID, senderID } = event;
  if (handleReply.author != senderID) return;
  let args = body.split(/\s+/);
  let { type, messageID } = handleReply;
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  switch(type) {
    case "Pending": {
      data.push(handleReply.pending[args[0] - 1]);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      let threadInfo = await api.getThreadInfo(handleReply.pending[args[0] - 1]);
    let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(handleReply.pending[args[0] - 1]);
      let msg = ``
        msg = `${threadName}\n`
          api.sendMessage(`» Phê duyệt thành công box: ${msg}`, threadID, () => {
          dataP.splice(dataP.indexOf(handleReply.pending[args[0] - 1]), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
        })
          api.unsendMessage(messageID)
          api.sendMessage(`Nhóm bạn đã được admin phê duyệt`, handleReply.pending[args[0] - 1])
          api.changeNickname(`『 ${global.config.PREFIX} 』 ♡ ${(!global.config.BOTNAME) ? "This bot is made by GK" : global.config.BOTNAME}`, handleReply.pending[args[0] - 1], api.getCurrentUserID())
    }
    case "Delete": {
      api.unsendMessage(messageID)
      let threadInfo = await api.getThreadInfo(handleReply.delete[args[0] - 1]);
      let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(handleReply.delete[args[0] - 1]);
      api.sendMessage(`Đã xóa ${threadName} khỏi danh sách duyệt`, threadID)
      api.sendMessage(`Box đã bị gỡ khỏi danh sách được phép dùng bot`, handleReply.delete[args[0] - 1], () => {
        data.splice(data.indexOf(handleReply.delete[args[0] - 1]), 1);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
      })
    }
  }
}
