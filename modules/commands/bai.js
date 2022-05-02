module.exports.config = {
    name: "bai",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Kanichi",
    description: "",
    commandCategory: "không cần dấu lệnh",
    usages: "",
    cooldowns: 0,
    denpendencies: {
        "fs": "",
        "request": ""
    }
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "bai.gif")) request("https://i.imgur.com/uVALChk.gif").pipe(fs.createWriteStream(dirMaterial + "bai.gif"));
}
module.exports.handleEvent = async ({ event, api, Currencies,Users, args, utils, global, client }) => {
    const fs = require("fs");
    let name = await Users.getNameUser(event.senderID)
    var msg = {
                body: `𝐏𝐚𝐢 𝐛𝐚̣𝐧 ${name}, 𝐒𝐞𝐞 𝐲𝐨𝐮 𝐧𝐞𝐱𝐭 𝐭𝐢𝐦𝐞❤️`,
                attachment: fs.createReadStream(__dirname + `/noprefix/bai.gif`)
            }
    if (event.body.toLowerCase() == "pai"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "bye"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
    if (event.body.toLowerCase() == "bai"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
};
module.exports.run = async ({ event, api, Currencies, args, utils }) => {
return api.sendMessage("𝐃𝐮̀𝐧𝐠 𝐬𝐚𝐢 𝐜𝐚́𝐜𝐡 𝐫𝐨̂̀𝐢 𝐥𝐞̂𝐮 𝐥𝐞̂𝐮",event.threadID)
    }
