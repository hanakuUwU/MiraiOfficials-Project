module.exports.config = {
  name: "2fa",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "tdunguwu",
  description: "lấy mã 2 fa",
  commandCategory: "Dành cho người dùng",
  usages: "image",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
  const authenticator = require('authenticator');
  var formattedToken = authenticator.generateToken(args.join(""));
   
  var { threadID, messageID } = event;
   return api.sendMessage('⏳ Đang lấy mã 2 fa cho bạn...', event.threadID, (err, info) => {
    setTimeout(() => {
  return api.sendMessage(formattedToken,threadID,messageID);
   }, 200);
  }, event.messageID);
};
