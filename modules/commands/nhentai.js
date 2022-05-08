const axios = require("axios");
const fs = require("fs-extra")
module.exports.config = {
	name: "nhentai",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Thiệu Trung Kiên",
	description: "Đọc truyện nhentai",
	commandCategory: "Tiện Ích",
	usages: "[Tag]",
	cooldowns: 10
};
module.exports.onload = async function(){
	console.log("===NHENTAI===\nLOADING THÀNH CÔNG\n\n")
}
module.exports.run = async function({
	args,
	event,
	api
}) {
	const res = await axios.get(`https://nhentai-production.up.railway.app/api/nhsearch?query=${args[0]}&page=1`);
	if(args[0] == "code"){
		const details = await axios.get(`https://nhentai-production.up.railway.app/api/nhdetail?code=${args[1]}`);
		return api.sendMessage(`[📕] 𝐓𝐞̂𝐧 𝐭𝐫𝐮𝐲𝐞̣̂𝐧: ${details.data.title}\n\n[📜] 𝐒𝐨̂́ 𝐭𝐫𝐚𝐧𝐠: ${details.data.details.pages}\n\n[👉] 𝐑𝐞𝐩𝐥𝐲 𝐫𝐞𝐚𝐝 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦 𝐭𝐫𝐮𝐲𝐞̣̂𝐧 𝐧𝐡𝐞́`, event.threadID, (error, info) => {
					global.client.handleReply.push({
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					readcode : args[1],
					type: "code"
					})
	}, event.messageID);
	}
	else {
	var imgData = [];
	var msg = [];
	var b = res.data.length;
    var page = 1;
        page = parseInt(args[1]) || 1;
        page < -1 ? page = 1 : "";
    var limit = 4;
    var numPage = Math.ceil(b / limit);
    for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
        if (i >= b) break;
	const getData = (await axios.get(`https://external-content.duckduckgo.com/iu/?u=${res.data[i].coverScr}`,{
		responseType : "stream"
	})).data;
	imgData.push(getData);
		const title = res.data[i].name,
			code = res.data[i].code
		msg += `[${i+1}]. 𝐓𝐞̂𝐧: ${title}\n𝐂𝐨𝐝𝐞: ${code}\n\n`
	}
	msg += `𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐭𝐡𝐞𝐨 𝐬𝐭𝐭 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦 𝐭𝐫𝐮𝐲𝐞̣̂𝐧 💌\n\n`;
	msg += `𝐇𝐢𝐞̣̂𝐧 𝐜𝐨́ 𝐭𝐨̂̉𝐧𝐠 ${b} 𝐭𝐫𝐮𝐲𝐞̣̂𝐧\n𝐒𝐨̂́ 𝐭𝐫𝐚𝐧𝐠 (${page}/${numPage})\n𝐃𝐮̀𝐧𝐠 ${global.config.PREFIX}𝐧𝐡𝐞𝐧𝐭𝐚𝐢 <𝐬𝐨̂́ 𝐭𝐫𝐚𝐧𝐠>`;
	return api.sendMessage({body : msg, attachment : imgData}, event.threadID, (error, info) => {
		global.client.handleReply.push({
			name: this.config.name,
			messageID: info.messageID,
			author: event.senderID,
			title: args[0],
			type: "info"
		})
	}, event.messageID);
}
}
module.exports.handleReply = async function({
	event,
	api,
	handleReply
}) {
	if(handleReply.author != event.senderID){return api.sendMessage("Cút", event.threadID)}
    api.unsendMessage(handleReply.messageID);
	const ev = event.body.split(" ");
	try {
		switch (handleReply.type) {
			case "info": {
				const title = handleReply.title;
				const resCode = await axios.get(`https://nhentai-production.up.railway.app/api/nhsearch?query=${handleReply.title}&page=1`);
				const code = resCode.data[event.body - 1].code;
				const res = await axios.get(`https://nhentai-production.up.railway.app/api/nhdetail?code=${resCode.data[event.body - 1].code}`);
				return api.sendMessage(`[📗] 𝐓𝐞̂𝐧 𝐭𝐫𝐮𝐲𝐞̣̂𝐧: ${res.data.title}\n\n[📜] 𝐒𝐨̂́ 𝐭𝐫𝐚𝐧𝐠: ${res.data.details.pages}\n\n[👉] 𝐑𝐞𝐩𝐥𝐲 𝐫𝐞𝐚𝐝 𝐧𝐞̂́𝐮 𝐦𝐮𝐨̂́𝐧 𝐱𝐞𝐦 𝐭𝐫𝐮𝐲𝐞̣̂𝐧 𝐧𝐡𝐞́`, event.threadID, (error, info) => {
					global.client.handleReply.push({
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					title: title,
					code : code,
					type: "getImg"
					})
				}, event.messageID);
			}
			case "getImg":{
				if(ev[0].toLowerCase() == "read"){
				const res = await axios.get(`https://nhentai-production.up.railway.app/api/nhdetail?code=${handleReply.code}`);
				const imgObj = [],
					pathObj = [];
				const img = res.data.pages
				for (let i = 0; i < img.length; i++) {
					const getImages = (await axios.get(`https://external-content.duckduckgo.com/iu/?u=${img[i]}`, {
						responseType: "arraybuffer"
					})).data;
					fs.writeFileSync(__dirname + '/cache/nhentai_' + i + '.jpg', Buffer.from(getImages));
					imgObj.push(fs.createReadStream(__dirname + '/cache/nhentai_' + i + '.jpg'))
					pathObj.push(__dirname + '/cache/nhentai_' + i + '.jpg')
				}
				return api.sendMessage({
					body: `𝗧𝗿𝘂𝘆𝗲̣̂𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗻𝗲̀ 😘`, // nhập text vào đây
					attachment: imgObj
				}, event.threadID, (err , info) => {
					for (var u of pathObj) {
						fs.unlinkSync(u)
      setTimeout(() => { 
        api.unsendMessage(info.messageID);
      }, 1000000)
					}
				}, event.messageID)
				}
			}
			case "code":{
				if(event.body.toLowerCase() == "read"){
				const res = await axios.get(`https://nhentai-production.up.railway.app/api/nhdetail?code=${handleReply.readcode}`);
				const imgObj = [];
				const img = res.data.pages
				for (let i = 0; i < img.length; i++) {
					const getObj = (await axios.get(`https://external-content.duckduckgo.com/iu/?u=${img[i]}`,{
						responseType: "stream"
					})).data;
				imgObj.push(getObj)
				}
				return api.sendMessage({
          body : `𝗧𝗿𝘂𝘆𝗲̣̂𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗻𝗲̀ 😘`, // nhập text vào đây
          attachment: imgObj
        }, event.threadID, event.messageID)
			}
		}
		}
	} catch (e) {
		console.log(e)
	}
						}
