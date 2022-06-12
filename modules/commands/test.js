module.exports.config = {
  name: "test",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "TrúcCute",//chính chủ xin đừng hiểu nhầm thay credits 
  description: "xem thời gian",
  commandCategory: "Bổ não",
  usages: "[trống]",
  cooldowns: 5,
  dependencies: {
    "moment-timezone": "",
    "axios": ""
  }
}
// xin đừng chửi code ngu vì cố tình code dài ạ, procoder tha em
module.exports.run = async ({ api, event, handleReply, Users }) => {
  let name = await Users.getNameUser(event.senderID)
  return api.sendMessage({body: 
    `Xin chào ` + name +
    `\nNhững thời gian hiện có` +
    `\n\n1. Việt Nam` +
    `\n2. Nhật` +
    `\n3. Pháp` +
    `\n\nReply STT để xem thời gian`}, event.threadID, (error, info) => {
    global.client.handleReply.push({
      type: "reply", 
      name: this.config.name, 
      author: event.senderID,
      messageID: info.messageID
    })
  })
}

module.exports.handleReply = async ({ api, event, Users, handleReply }) => {
  const { threadID, messageID, senderID, body } = event;
  const axios = require('axios'),
  moment = require('moment-timezone'),
  res = await axios.get('https://apicadaovn.miraiofficials123.repl.co'),
  data = res.data.data,
  data1 = res.data.url,
  cc = (await axios.get(data1, {responseType: "stream"})).data,
  name = await Users.getNameUser(senderID);
  switch(handleReply.type) {
    case "reply": {
      switch(body) {
        case "1": {
        var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH"),
            phut = moment.tz("Asia/Ho_Chi_Minh").format("mm"), 
            giay = moment.tz("Asia/Ho_Chi_Minh").format("ss"),
            ngay = moment.tz("Asia/Ho_Chi_Minh").format("D"),
            thang = moment.tz("Asia/Ho_Chi_Minh").format("MM"),
            nam = moment.tz("Asia/Ho_Chi_Minh").format("YYYY"),
            thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ nhật'
  if (thu == 'Monday') thu = 'Thứ 2'
  if (thu == 'Tuesday') thu = 'Thứ 3'
  if (thu == 'Wednesday') thu = 'Thứ 4'
  if (thu == "Thursday") thu = 'Thứ 5'
  if (thu == 'Friday') thu = 'Thứ 6'
  if (thu == 'Saturday') thu = 'Thứ 7'
          api.unsendMessage(
            handleReply.messageID);
          return api.sendMessage({body:
            `Xin chào ` + name +
            `\nBây giờ là ` + gio + 
            ` giờ ` + phut + 
            ` phút ` + giay + 
            ` giây` +
            `\nHôm nay là: ` + thu +
            `\nNgày ` + ngay +
            ` tháng ` + thang +
            ` năm ` + nam +
            `\nCa dao: ` + data, attachment: cc}, threadID, messageID)
        };
          break;
          
        case "2": {
        var gio = moment.tz("Asia/Tokyo").format("HH"),
            phut = moment.tz("Asia/Tokyo").format("mm"), 
            giay = moment.tz("Asia/Tokyo").format("ss"),
            ngay = moment.tz("Asia/Tokyo").format("D"),
            thang = moment.tz("Asia/Tokyo").format("MM"),
            nam = moment.tz("Asia/Tokyo").format("YYYY"),
            thu = moment.tz('Asia/Tokyo').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ nhật'
  if (thu == 'Monday') thu = 'Thứ 2'
  if (thu == 'Tuesday') thu = 'Thứ 3'
  if (thu == 'Wednesday') thu = 'Thứ 4'
  if (thu == "Thursday") thu = 'Thứ 5'
  if (thu == 'Friday') thu = 'Thứ 6'
  if (thu == 'Saturday') thu = 'Thứ 7'
          api.unsendMessage(
            handleReply.messageID);
          return api.sendMessage({body:
            `Xin chào ` + name +
            `\nBây giờ là ` + gio + 
            ` giờ ` + phut + 
            ` phút ` + giay + 
            ` giây` +
            `\nHôm nay là: ` + thu +
            `\nNgày ` + ngay +
            ` tháng ` + thang +
            ` năm ` + nam +
            `\nCa dao: ` + data, attachment: cc}, threadID, messageID)
        };
          break;
        case "3": {
        var gio = moment.tz("Europe/Paris").format("HH"),
            phut = moment.tz("Europe/Paris").format("mm"), 
            giay = moment.tz("Europe/Paris").format("ss"),
            ngay = moment.tz("Europe/Paris").format("D"),
            thang = moment.tz("Europe/Paris").format("MM"),
            nam = moment.tz("Europe/Paris").format("YYYY"),
            thu = moment.tz('Europe/Paris').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ nhật'
  if (thu == 'Monday') thu = 'Thứ 2'
  if (thu == 'Tuesday') thu = 'Thứ 3'
  if (thu == 'Wednesday') thu = 'Thứ 4'
  if (thu == "Thursday") thu = 'Thứ 5'
  if (thu == 'Friday') thu = 'Thứ 6'
  if (thu == 'Saturday') thu = 'Thứ 7'
          api.unsendMessage(
            handleReply.messageID);
          return api.sendMessage({body:
            `Xin chào ` + name +
            `\nBây giờ là ` + gio + 
            ` giờ ` + phut + 
            ` phút ` + giay + 
            ` giây` +
            `\nHôm nay là: ` + thu +
            `\nNgày ` + ngay +
            ` tháng ` + thang +
            ` năm ` + nam +
            `\nCa dao: ` + data, attachment: cc}, threadID, messageID)
        };
          break;
        default:
          const choose = parseInt(body);
          if (isNaN(body)) return api.sendMessage("💟 Vui lòng nhập 1 con số", threadID, messageID);
          if (choose > 3 || choose < 1) return api.sendMessage("[⚜] Lựa chọn không nằm trong danh sách.", threadID, messageID); 
      }
    }
  }
}
