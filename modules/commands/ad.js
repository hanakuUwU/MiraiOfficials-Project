module.exports.config = {
  name: "ad",
  version: "1.4.2",
  hasPermssion: 0,
  credits: "TrúcCute",// chính chủ xin đừng hiểu nhầm thay credits
  description: "xem thông tin admin",
  commandCategory: "Bổ não",
  usages: "[Trống]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "moment-timezone": ""
  }
}
// thay uid nó tự thay link, name, và uid, giớ tính, còn lại tự thay vì t k bt=))
module.exports.run = async ({ api, event, Users }) => {
  var uid = `100036947774673`;// thay uid vô để giúp thay name, giới tính, link fb
  const axios = require('axios');
  const fs = require('fs-extra');
  const request = require('request');
  const moment = require('moment-timezone');
  const gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || D/MM/YYYY')
  let data = await api.getUserInfo(uid),
 { profileUrl, gender } = data[uid]; 
let name = await Users.getNameUser(uid)
  var callback = () => api.sendMessage({body: 
    `⠀⠀⠀⠀⠀♡ AdminBot ♡\n`+
    `💦𝐓𝐞̂𝐧: ` + name +
    `\n🐧𝐔𝐈𝐃: ` + uid +
    `\n🦋𝐆𝐢𝐨̛́𝐢 𝐭𝐢́𝐧𝐡: ` + (gender == 2 ? '𝐍𝐚𝐦' : gender == 1 ? '𝐍𝐮̛̃' : 'UNKNOWN') +
    `\n🐣Ngày sinh: 18/10` +
    `\n🏠Sống tại: trái tim em ♡` +
    `\n🏕Quê quán: Bình Định` +
    `\n😚Sở thích: Chơi game, ngắm gái,...` +
    `\nCân nặng: 38Kg` +
    `\nZalo: 0348756580` +
    `\nGmaiil: Không nhớ` +
    `\nTính cách: vui vẻ` +
    `\nAi có lòng thì donate admin 20k để nuôi mẹ già con thơ nha, MB Bank 0348756580` +
    `\n😽Thắc mắc gì ib qua đường link phía dưới` +
    `\n🏝𝐏𝐫𝐨𝐟𝐢𝐥𝐞:\n` + profileUrl +
    `\n\n[===[ ` + gio + ` ]===]`,
    attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
}
