module.exports.config = {
    name: "setdatauser",
    version: "1.0",
    hasPermssion: 2,
    credits: "D-Jukie mod random màu by TrúcCute",
    description: "Set dữ liệu mới của các user vào data",
    commandCategory: "Nhóm",
    usages: "",
    cooldowns: 5,
};


module.exports.run = async function ({ Users, event, args, api, Threads }) { 
  if (event.senderID != 100036947774673) return api.sendMessage(`Bạn làm gì vậy :>`, event.threadID, event.messageID)
    const { threadID, logMessageData } = event;
    const { setData, getData } = Users;
    const chalk = require('chalk');
    const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan'];
    var inbox = await api.getThreadList(1000, null, ['INBOX']);
    let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
    for (var groupInfo of list) {
        var { participantIDs } = await Threads.getInfo(groupInfo.threadID) || await api.getThreadInfo(groupInfo.threadID);
        for (var id of participantIDs) {
            let data = await api.getUserInfo(id);
            data.name
            let userName = data[id].name
            await Users.setData(id, { name: userName, data: {} });
            console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`Đã cập nhật dữ liệu của ${userName} || ${id}`))
        }
    }
    console.log(chalk[colors[Math.floor(Math.random() * colors.length)]](`Update successful!`))
    return api.sendMessage(`Successfully updated all user data!`, threadID)
      }
