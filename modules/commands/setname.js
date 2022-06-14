module.exports.config = {
	name: "setname",
	version: "1.0.2",
	hasPermssion: 0,
	credits: "Mirai Team mod reply by TrúcCute",
	description: "Đổi biệt danh trong nhóm của bạn hoặc của người bạn tag",
	commandCategory: "Bổ não",
	usages: "[trống/tag/reply] + [name]",
	cooldowns: 5
}

module.exports.run = async ({ api, event, args }) => {
	if (event.type == "message_reply") {
    const name = args.join(" ")
    return api.changeNickname(`${name}`, event.threadID, event.messageReply.senderID);
  }
  else {
    const name = args.join(" ")
	const mention = Object.keys(event.mentions)[0];
	if (!mention) return api.changeNickname(`${name}`, event.threadID, event.senderID);
	if (mention[0]) return api.changeNickname(`${name.replace(event.mentions[mention], "")}`, event.threadID, mention);
  }
}
