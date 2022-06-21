module.exports.config = {
    name: "console",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "D-Jukie",//mod lại by toàn, mod gọn lại by TrúcCute
    description: "Console bớt nhàm chán hơn",
    commandCategory: "other",
    usages: "",
    cooldowns: 5
}

module.exports.handleEvent = async function ({ api, event, args, Users, Threads }) {
    const { configPath } = global.client;
    const { DeveloperMode } = global.config;
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    const modDev = config.DeveloperMode
     if ((this.config.credits) != "D-Jukie") { return }
    if (modDev == true) return
    else {
   const chalk = require('chalk');
     const moment = require("moment-timezone");
var time= moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
      var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ nhật'
  if (thu == 'Monday') thu = 'Thứ 2'
  if (thu == 'Tuesday') thu = 'Thứ 3'
  if (thu == 'Wednesday') thu = 'Thứ 4'
  if (thu == "Thursday") thu = 'Thứ 5'
  if (thu == 'Friday') thu = 'Thứ 6'
  if (thu == 'Saturday') thu = 'Thứ 7'
      
    var msg = event.body||"Ảnh, video hoặc ký tự đặc biệt";
    const threadInfo = await api.getThreadInfo(event.threadID)
    var threadName = threadInfo.threadName||"Tên không tồn tại";
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var randomColor1 = Math.floor(Math.random()*12345678).toString(16);
    var randomColor2 = Math.floor(Math.random()*13245769).toString(16);
    var randomColor3 = Math.floor(Math.random()*13333333).toString(16);
    const name = await Users.getNameUser(event.senderID)
    return console.log(chalk.hex("#" + randomColor)(`◆━━━━━━━━━━◆━━━━━━━━━◆◆━━━━━━━━◆━━━━━━━━━━◆\nNhóm: ${threadName}`) + chalk.hex("#" + randomColor)(``) +chalk.hex("#" + randomColor1) (`\nTên: ${name}`) + chalk.hex("#" + randomColor)(``) + chalk.hex("#" + randomColor2)(`\nText: ${msg} `) + chalk.hex("#" + randomColor) (``) + chalk.hex("#" + randomColor3)(`\n[ ${thu} ${time} ]`) );
    }
}

module.exports.run = async ({ api, event, args }) => {
    if ((this.config.credits) != "D-Jukie") { return api.sendMessage(`⚡️Phát hiện credits đã bị thay đổi`, event.threadID, event.messageID)}
    const { configPath } = global.client;
    const { DeveloperMode } = global.config;
    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    const modDev = config.DeveloperMode

    if (modDev == true) {
        api.sendMessage(`🐧DeveloperMode: ${modDev}\n🐧Vui lòng chỉnh về false để sử dụng!!!`, event.threadID)
    } else
        return api.sendMessage(`🐧DeveloperMode: ${modDev}\n🐧Console đang chạy...`, event.threadID)
      }
