module.exports.config = {
	name: "cccd",	
	version: "1.1.1", 
	hasPermssion: 0,
	credits: "DVB",
	description: "Tạo căn cước công dân fake", 
	commandCategory: "Tạo ảnh",
	usages: "Tên|Ngày Sinh|Giới Tính|Nơi thường trú",
	cooldowns: 5,
  dependencies: {tinyurl: ""}
};

const//////////////////////////////////////////////////////////////////////
  capi     = "https://api-12.chinhle4447.repl.co/cccd?", // API
  apikey   = "chinhle",                                                      // API Key
  pathsave = __dirname + `/cache/banner.png`,                            // Lưu vào Cache
///////////// Hãy chỉnh msg theo ý bạn! ///////////////////////////////////
  msg1     = "⚡𝑩𝒂̣𝒏 𝒑𝒉𝒂̉𝒊 𝒓𝒆𝒑𝒍𝒚 𝒂̉𝒏𝒉 đ𝒆̂̉ 𝒍𝒂̂́𝒚 𝒕𝒂̣𝒐 𝒄𝒂̆𝒏 𝒄𝒖̛𝒐̛́𝒄 𝒄𝒐̂𝒏𝒈 𝒅𝒂̂𝒏!",
  msg2     = "⚡𝑺𝒂𝒊 đ𝒊̣𝒏𝒉 𝒅𝒂̣𝒏𝒈 𝒂̉𝒏𝒉!",
  msg3     = "⚡𝑪𝒂̆𝒏𝒈 𝒄𝒖̛𝒐̛́𝒄 𝒄𝒐̂𝒏𝒈 𝒅𝒂̂𝒏 𝒄𝒖̉𝒂 𝒃𝒂̣𝒏 đ𝒂𝒏𝒈 đ𝒖̛𝒐̛̣𝒄 𝒕𝒂̣𝒐, 𝑪𝒉𝒐̛̀ 𝒕𝒓𝒐𝒏𝒈 𝒈𝒊𝒂̂𝒚 𝒍𝒂́𝒕 𝒏𝒉𝒆́...!",
  msg4     = "✅𝑪𝒂̆𝒏 𝒄𝒖̛𝒐̛́𝒄 𝒄𝒐̂𝒏𝒈 𝒅𝒂̂𝒏 𝒄𝒖̉𝒂 𝒃𝒂̣𝒏 đ𝒂̂𝒚...!";

module.exports.run = async function ({api,event,args}) {
const axios = require('axios');
const fs = require("fs-extra");
const qs = require("querystring");
const { threadID, messageID } = event;
if ("message_reply" !== event.type) return api.sendMessage(msg1,threadID,messageID);
if (!event.messageReply.attachments || 0 == event.messageReply.attachments.length)
  return api.sendMessage(msg2,threadID,messageID);
var urlimg = await global.nodemodule.tinyurl.shorten(event.messageReply.attachments[0].url);
const content = args.join(" ").split("|").map(item => item = item.trim());
const text1 = content[0],text2 = content[1],text3 = content[2],text4 = content[3];
let params = {apikey,text1,text2,text3,text4,urlimg};
    params = qs.stringify(params);
  api.sendMessage(msg3,threadID,messageID);
var inimg = await axios.get(capi + params,{responseType:"stream"});
  return api.sendMessage({body:msg4,attachment:inimg.data},threadID,messageID)};
module.exports.languages = {"vi": {}}                                   // Chống báo nỗi languages!
