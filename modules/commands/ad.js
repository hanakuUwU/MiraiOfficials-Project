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
    "moment-timezone": "",
    "fs-extra": "",
    "request": ""
  }
}
// thay uid nó tự thay link, name, và uid, giớ tính, còn lại tự thay vì t k bt=))
module.exports.run = async function ({ api, event, Users, Currencies }) {
  var uid = `100036947774673`;// thay uid vô để giúp thay name, giới tính, link fb
  const axios = require('axios');
  const fs = require('fs-extra');
  const request = require('request');
  const moment = require('moment-timezone');
  const money = (await Currencies.getData(uid)).money;
  const gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || D/MM/YYYY')
  let data = await api.getUserInfo(uid),
 { profileUrl, gender } = data[uid];
  const z = (await Users.getData(uid)).location;
let name = await Users.getNameUser(uid)
  var callback = () => api.sendMessage({body: 
    `⠀⠀⠀⠀⠀♡ AdminBot ♡\n`+
    `💦Tên: ` + name +
    `\n🐧UID: ` + uid +
    `\n🦋Giới tính: ` + (gender == 2 ? 'nam' : gender == 1 ? 'nữ' : 'UNKNOWN') +
    `\n🐣Ngày sinh: 18/10` +
    `\n🏠Sống tại: trong trái tim bae đó ♡` +
    `\n🏕Quê quán: Bình Định` +
    `\n😚Sở thích: Chơi game, ngắm gái,...` +
    `\nCân nặng: 38Kg` +
    `\nTrạng thái: còn sống` +
    `\nMối quan hệ: F.A` +
    `\nGu: không biết` +
    `\nZalo: 0348756580` +
    `\nGmaiil: Không nhớ` +
    `\nTính cách: vui vẻ` +
    `\nSố dư có trên bot: ` + money + `$` +
    `\nAi có lòng thì donate admin 20k để nuôi mẹ già con thơ nha, MB Bank 0348756580` +
    `\n😽Thắc mắc gì ib qua đường link phía dưới` +
    `\nUrl:\n` + profileUrl +
    `\n\n[===[ ` + gio + ` ]===]`,
    attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=750&width=750&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
}
