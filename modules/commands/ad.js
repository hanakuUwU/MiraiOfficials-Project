module.exports.config = {
  name: "ad",
  version: "1.8.2",
  hasPermssion: 0,
  credits: "Nguyen",// làm cho nó tiện lợi hơn xíu nên mấy anh procoder tha em
  description: "K bt nói j",
  commandCategory: "Bổ não",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "moment-timezone": ""
  }
}
// thay uid nó tự thay link, name, và uid, giớ tính, còn lại tự thay vì t k bt=))
module.exports.run = async ({ api, event, Users }) => {
  var uid = '100036947774673';// thay uid vô để giúp thay name, giới tính, link fb
  const axios = require('axios');
  const moment = require('moment-timezone');
  const gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || D/MM/YYYY')
  const res = await axios.get('https://APIMP4.MiraiOfficials123.repl.co');// thay api nhé vì api t có 1 video th
  const data2 = res.data.url;
  let cc = (await axios.get(data2, {			responseType: "stream"		})).data;
  let data = await api.getUserInfo(uid),
 { profileUrl, gender } = data[uid]; 
let name = await Users.getNameUser(uid)
  return api.sendMessage({body: 
    `⠀⠀⠀⠀⠀♡ AdminBot ♡\n`+
    `💦𝐓𝐞̂𝐧: ` + name +
    `\n🐧𝐔𝐈𝐃: ` + uid +
    `\n🦋𝐆𝐢𝐨̛́𝐢 𝐭𝐢́𝐧𝐡: ` + (gender == 2 ? '𝐍𝐚𝐦' : gender == 1 ? '𝐍𝐮̛̃' : 'UNKNOWN') +
    `\n🐣Ngày sinh: 18/10` +
    `\n🏠Sống tại: trái tim em ♡` +
    `\n🏕Quê quán: Bình Định` +
    `\n😚Sở thích: Chơi game, ngắm gái,...` +
    `\n😽Thắc mắc gì ib qua đường link phía dưới` +
    `\n🏝𝐏𝐫𝐨𝐟𝐢𝐥𝐞:\n` + profileUrl +
    `\n\n[===[ ` + gio + ` ]===]`,
    attachment: cc 
    },event.threadID, event.messageID)
}
