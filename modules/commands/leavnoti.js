module.exports.config = {
    name: "leavenoti",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Bật tắt thông báo rời nhóm cho nhóm hiện tại",
    commandCategory: "Người hỗ trợ bot",
    usages: "",
    cooldowns: 2
};

module.exports.languages = {
  "vi": {"on": "Bật","off": "Tắt","successText": "𝐆𝐮̛̉𝐢 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐊𝐡𝐢 𝐂𝐨́ 𝐓𝐡𝐚̀𝐧𝐡 𝐕𝐢𝐞̂𝐧 𝐑𝐨̛̀𝐢 𝐍𝐡𝐨́𝐦 𝐂𝐡𝐚𝐭 𝐂𝐮̉𝐚 𝐁𝐚̣𝐧",},
  "en": {"on": "on","off": "off","successText": "send a notification message when a member leaves your chat group",}
}

module.exports.run = async function ({ api, event, Threads, getText }) {
  const { threadID, messageID } = event;
  let data = (await Threads.getData(threadID)).data;

  if (typeof data["leaveNoti"] == "undefined" || data["leaveNoti"] == true) data["leaveNoti"] = false;
  else data["leaveNoti"] = true;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["leaveNoti"] == false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
}
