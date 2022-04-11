const fs = require('fs-extra');
const axios = require('axios');

module.exports.config = {
	name: "nhentai",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Thieu Trung Kien",
	description: "",
	commandCategory: "Giải trí",
	usages: "",
	cooldowns: 0
};
module.exports.run = async function({
	api,
	event,
	args
}) {
	return api.sendMessage("Reply tin nhắn này để nhập tên truyện", event.threadID, (error, info) => {
		global.client.handleReply.push({
			name: this.config.name,
			messageID: info.messageID,
			author: event.senderID,
			type: "search"
		})
	}, event.messageID);
}
module.exports.handleReply = async function({
	handleReply,
	api,
	event
}) {
	if (handleReply.author != event.senderID) return api.sendMessage("Cut", event.threadID)
	switch (handleReply.type) {
		case "search": {
			const title = event.body;
			const res = await axios.get(`https://hentaivn-api.herokuapp.com/search?q=${encodeURIComponent(event.body)}`);
			var b = res.data.length;
			var page = 1;
			page = 1;
			page < -1 ? page = 1 : "";
			var limit = 6;
			var numPage = Math.ceil(b / limit);
			var msg = ``;
			var arr = [];
			for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
				if (i >= b) break;
				const name = res.data[i].name
				const getImg = (await axios.get(res.data[i].images, {
					responseType: "stream"
				})).data;
				arr.push(getImg)
				msg += `[${i + 1}].${name}\n\n`
			}
			return api.sendMessage({
				body: msg,
				attachment: arr
			}, event.threadID, (error, info) => {
				global.client.handleReply.push({
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					title: title,
					type: "info"
				})
			}, event.messageID);
		}
		case "info": {
      		const title = handleReply.title
			const res = await axios.get(`https://hentaivn-api.herokuapp.com/search?q=${encodeURIComponent(title)}`);
			const info = await axios.get(`https://hentaivn-api.herokuapp.com/info?url=${res.data[event.body - 1].url}`);
			return api.sendMessage("Hiện tại đang có " + info.data.chapter.length + " chap!\nVui lòng reply số thứ tự để chọn", event.threadID, (error, info) => {
				global.client.handleReply.push({
					name: this.config.name,
					messageID: info.messageID,
					author: event.senderID,
					title : title,
					type: "read"
				})
			}, event.messageID);
		}
		case "read": {
			api.sendMessage("Đang tải truyện xuống !\nVui lòng chờ đợi", event.threadID, event.messageID)
			const ress = await axios.get(`https://hentaivn-api.herokuapp.com/search?q=${encodeURIComponent(handleReply.title)}`);
			const info = await axios.get(`https://hentaivn-api.herokuapp.com/info?url=${ress.data[event.body - 1].url}`);
			const res = await axios.get(`https://hentaivn-api.herokuapp.com/read?link=${info.data.chapter[event.body - 1]}`);
			const imgObj = [],
				  urll = [];
				pathObj = [];
			async function speed(){
			for (let i = 0; i < res.data.url.length; i++) {
				const url = res.data.url[i]
				urll.push(url)
				const getImages = (await axios.get(`https://external-content.duckduckgo.com/iu/?u=${url}`, {
					responseType: "arraybuffer"
				})).data;
				fs.writeFileSync(__dirname + '/hentai/nhentai_' + i + '.jpg', Buffer.from(getImages));
				imgObj.push(fs.createReadStream(__dirname + '/hentai/nhentai_' + i + '.jpg'))
				pathObj.push(__dirname + '/hentai/nhentai_' + i + '.jpg')
			}
			return api.sendMessage({
				body: `Truyện sẽ tự động gỡ sau 10 phút`,
				attachment: imgObj
			}, event.threadID, (err, info) => {
				for (var u of pathObj) {
					fs.unlinkSync(u)
					setTimeout(() => {
						api.unsendMessage(info.messageID);
					}, 1000000)
				}
			})
		}
		const push = setTimeout(speed, 0)
		}
	}
}
