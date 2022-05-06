module.exports.config = {
  name: "ad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JRT",// mod api do ai đó=))
  description: "Kiểm tra thông tin admin bot.",
  commandCategory: "Thông tin adminbot",
  usages: "adm",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  const res = await axios.get("https://api.xlshsad.repl.co/images/mirai");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
return api.sendMessage({body:`★ Admin BOT ★
 🐧Tên: Nguyễn Gia Khang\n🎂Ngày sinh: 18/10/200?\n😎Chiều cao x cân nặng: 1m8 x 38kg\n💒Quê quán: Bình Định\n🏢Nơi sống: Bà Rịa Vũng Tàu\n📢Sở thích: Ngắm gái, chơi game,...\n😶‍🌫️Tính cách: bth`,attachment: download}, event.threadID, event.messageID);
   };
