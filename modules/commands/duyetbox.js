module.exports.config = {
  name: "duyetbox",
  version: "1.9.2",
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

module.exports.onLoad = () => {
  if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}

module.exports.run = async ({ api, event, handleReply, Threads, args, Users }) => {
  let { threadID, senderID, type, messageReply } = event;
  if (senderID != `100036947774673` && senderID != `100056953105174`) return
  if (this.config.credits != "DungUwU mod by Nam mod full reply + gọn by TrúcCute") return api.sendMessage(`Phát hiện thay credits`, threadID)
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let msg = "", count = 0;
  if (args[0] == "list") {
    try {
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
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  }
  if (args[0] == "duyệt") {
    try {
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
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  }
  if (args[0] == "help") {
    let threadSetting = (await Threads.getData(String(threadID))).data || {};
    let prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    api.sendMessage(`Bạn có thể dùng:\n1. ${prefix}${this.config.name} list để xem danh sách đã duyệt\n2. ${prefix}${this.config.name} duyệt để xem danh sách chưa duyệt\n3. ${prefix}${this.config.name} help để xem cách xài\n4. ${prefix}${this.config.name} trống để duyệt chính mình hoặc box`, threadID)
  }
  if (args[0] == "del") {
    try {
      idBox = args[1] || threadID;
      if (type == "message_reply") {
        idBox = messageReply.senderID
      }
      if (isNaN(idBox)) return api.sendMessage("Không phải một con số", threadID);
      if (!data.includes(idBox)) return api.sendMessage("Box không được duyệt từ trước!", threadID);
      let threadInfo = await api.getThreadInfo(idBox);
      let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(idBox);
      api.sendMessage(`Đã xóa ${threadName} khỏi danh sách duyệt`, threadID)
      api.sendMessage(`Box đã bị gỡ khỏi danh sách được phép dùng bot`, idBox, () => {
    data.splice(data.indexOf(idBox), 1);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
      })
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  } else if (args[0]) {
    try {
      let threadInfo = await api.getThreadInfo(args[0]);
      let ID = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(args[0]);
      if (isNaN(args[0])) api.sendMessage("ID bạn nhập không hợp lệ", threadID)
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
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  } else if (!args[0]) {
    try {
      if (type == "message_reply") {
        uid = messageReply.senderID
      } else {
       uid = threadID
      }
      let threadInfo = await api.getThreadInfo(uid);
      let ID = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(uid);
      if (isNaN(parseInt(uid))) api.sendMessage("ID bạn nhập không hợp lệ", threadID)
      if (data.includes(uid)) {
        api.sendMessage(`${ID} đã được phê duyệt từ trước!`, threadID)
      } else {
        api.sendMessage(`Đã thêm ${ID} vào danh sách đã duyệt`, threadID)
        api.changeNickname(`『 ${global.config.PREFIX} 』 ♡ ${(!global.config.BOTNAME) ? "This bot is made by GK" : global.config.BOTNAME}`, uid, api.getCurrentUserID())
        data.push(uid);
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        dataP.splice(dataP.indexOf(uid), 1);
        fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2))
      }
    } catch(e) {
      api.sendMessage(e, threadID)
    }
  }
}

module.exports.handleReply = async ({ event, api, handleReply, Users }) => {
  let { body, threadID, senderID } = event;
  if (handleReply.author != senderID) return;
  let index = body.split(/\s+/);
  let { type, messageID } = handleReply;
  let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  if (isNaN(index)) return api.sendMessage("💟 WTF biết phân biệt số với chữ không?", threadID)
  switch(type) {
    case "Pending": {
      api.unsendMessage(messageID)
      try {
        for (let args of index) {
          data.push(handleReply.pending[args - 1]);
          fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
          dataP.splice(dataP.indexOf(handleReply.pending[args - 1]), 1);
          fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
          api.sendMessage(`Nhóm bạn đã được admin phê duyệt`, handleReply.pending[args - 1])
          api.changeNickname(`『 ${global.config.PREFIX} 』 ♡ ${(!global.config.BOTNAME) ? "This bot is made by GK" : global.config.BOTNAME}`, handleReply.pending[args - 1], api.getCurrentUserID())
        } api.sendMessage(`Đã duyệt thành công ${index.length} box`, threadID)
      } catch(e) {
        api.sendMessage(e, threadID)
      }
    }
    case "Delete": {
      api.unsendMessage(messageID)
      try {
        for (let args of index) {
          api.sendMessage(`Box đã bị gỡ khỏi danh sách được phép dùng bot`, handleReply.delete[args - 1], () => {
            data.splice(data.indexOf(handleReply.delete[args - 1]), 1);
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
          })
        } api.sendMessage(`Đã gỡ thành công ${index.length} box ra khỏi danh sách đã duyệt`, threadID)
      } catch(e) {
        api.sendMessage(e, threadID)
      }
    }
  }
}
