module.exports.config = {
    name: "setdatabox",
    version: "1.0",
    hasPermssion: 2,
    credits: "D-Jukie mod random màu by TrúcCute",
    description: "Set dữ liệu mới của các box vào data",
    commandCategory: "Hệ thống admin-bot",
    usages: "Làm mới dữ liệu box",
    cooldowns: 5,
    
};
module.exports.run = async function ({ event, args, api, Threads }) { 
  if (event.senderID != 100036947774673) return api.sendMessage(`Bạn làm gì vậy :>`, event.threadID, event.messageID)
const { threadID, logMessageData } = event;
const { setData, getData } = Threads;
  const chalk = require('chalk');
  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
  const lengthGroup = list.length
  for (var groupInfo of list) {
    var threadInfo = await api.getThreadInfo(groupInfo.threadID);
    threadInfo.threadName;
    await Threads.setData(groupInfo.threadID, { threadInfo });
    console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`Đã cập nhật dữ liệu của ${threadInfo.threadName} || ${groupInfo.threadID}`))
  }
    console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`Đã cập nhật dữ liệu của ${lengthGroup} box`))
    return api.sendMessage(`Đã cập nhật dữ liệu của ${lengthGroup} box`, threadID)
      }
