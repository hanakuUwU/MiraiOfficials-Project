module.exports.config = {
  name: "log",
  eventType: ["log:unsubscribe", "log:subscribe", "log:thread-name"],
  version: "1.0.0",
  credits: "Mirai Team",
  description: "Ghi lại thông báo các hoạt đông của bot!",
  envConfig: {
    enable: true
  }
};

module.exports.run = async function ({ api, event, Users, Threads }) {
  const logger = require("../../utils/log");
  if (!global.configModule[this.config.name].enable) return;
  let botID = api.getCurrentUserID();
  /*var allThreadID = global.data.allThreadID;
  for (const singleThread of allThreadID) {
    const thread = global.data.threadData.get(singleThread) || {};
    if (typeof thread["log"] != "undefined" && thread["log"] == false) return;
  }*/
  
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY HH:mm:ss");
  //let nameThread = (await Threads.getData(event.threadID)).threadInfo.threadName || "Tên không tồn tại";
  //let nameThread = global.data.threadInfo.get(event.threadID).threadName || "Tên không tồn tại"; 

  let threadInfo = await api.getThreadInfo(event.threadID);
  nameThread =threadInfo.threadName;
  const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);

  //console.log(nameThread)

  var formReport = "» 𝐓𝐁 𝐓𝐡𝐞̂𝐦/𝐊𝐢𝐜𝐤 «" +
    "\n\n👨‍👩‍👧‍👧𝐁𝐨𝐱: " + nameThread +
    "\n✅𝐓𝐡𝐫𝐞𝐚𝐝 𝐈𝐃: " + event.threadID +
    "\n🤷‍♀️𝐇𝐚̀𝐧𝐡 𝐝𝐨̣̂𝐧𝐠: {task}" +
    "\n🍳𝐍𝐚𝐦𝐞: " + nameUser +
    "\n📩𝐔𝐬𝐞𝐫𝐈𝐃: " + event.author +
    "\n\n⏰𝐓𝐢𝐦𝐞: " + time + "",
    task = "";
  switch (event.logMessageType) {
    case "log:thread-name": {
        newName = event.logMessageData.name || "𝐓𝐞̂𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐨̂̀𝐧 𝐭𝐚̣𝐢";
        task = "Người dùng thay đổi tên nhóm thành " + newName + "";
        await Threads.setData(event.threadID, {name: newName});
        break;
    }
    case "log:subscribe": {
      if (event.logMessageData.addedParticipants.some(i => i.userFbId == botID)) task = "✅𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠 𝐕𝐮̛̀𝐚 𝐓𝐡𝐞̂𝐦 𝐁𝐨𝐭 𝐕𝐚̀𝐨 𝐌𝐨̣̂𝐭 𝐍𝐡𝐨́𝐦 𝐌𝐨̛́𝐢✅";
      break;
    }
    case "log:unsubscribe": {
      if (event.logMessageData.leftParticipantFbId == botID) {
        if(event.senderID == botID) return;
        const data = (await Threads.getData(event.threadID)).data || {};
        data.banned = true;
        var reason = "🚫𝐊𝐢́𝐜𝐡 𝐁𝐨𝐭 𝐓𝐮̛̣ 𝐃𝐨, 𝐊𝐡𝐨̂𝐧𝐠 𝐗𝐢𝐧 𝐏𝐡𝐞́𝐩🚫";
        data.reason = reason || null;
        data.dateAdded = time;
        await Threads.setData(event.threadID, { data });
        global.data.threadBanned.set(event.threadID, { reason: data.reason, dateAdded: data.dateAdded });

        task = "🐸𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠 𝐕𝐮̛̀𝐚 𝐊𝐢𝐜𝐤 𝐁𝐨𝐭 𝐑𝐚 𝐊𝐡𝐨̉𝐢 𝐍𝐡𝐨́𝐦🐸"
      }
      break;
    }
    default:
      break;
  }

  if (task.length == 0) return;

  formReport = formReport
    .replace(/\{task}/g, task);

  return api.sendMessage(formReport, global.config.ADMINBOT[0], (error, info) => {
    if (error) return logger(formReport, "[ 𝐋𝐨𝐠𝐠𝐢𝐧𝐠 𝐄𝐯𝐞𝐧𝐭 ]");
  });
}
