module.exports.config = {
    name: "pay",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Chuyển tiền của bản thân cho ai đó",
    commandCategory: "phương tiện",
    usages: " [reply người cần chuyển] [số tiền]",
    cooldowns: 0
};

module.exports.run = async function ({
    event,
    api,
    Currencies,
    args,
    Users
}) {
    let {
        threadID,
        messageID,
        senderID
    } = event;
    if (event.type == "message_reply") {
        mention = event.messageReply.senderID
        var name = (await Users.getData(mention)).name
        if (!isNaN(args[0])) {
            const coins = parseInt(args[0]);
            const content = args.join(' ').slice(args[0].length);
            let balance = (await Currencies.getData(senderID)).money;
            let balancetag = (await Currencies.getData(mention)).money;
            if (coins <= 0) return api.sendMessage('Số coins bạn muốn chuyển không hợp lệ', threadID, messageID);
            if (coins > balance) return api.sendMessage('Số coins bạn muốn chuyển lớn hơn số coins bạn hiện có!', threadID, messageID);
            else {
                return api.sendMessage({
                    body: `Đã chuyển cho ${name} ${args[0]}💵`,
                    attachment: await momo(name, coins, content)
                }, threadID, async () => {
                    Currencies.setData(mention, options = {
                        money: balancetag + parseInt(coins)
                    })
                    Currencies.setData(senderID, options = {
                        money: balance - parseInt(coins)
                    })
                }, messageID);
            }
        } else return api.sendMessage('Vui lòng nhập số coins muốn chuyển', threadID, messageID);
    } else {
        const mention = Object.keys(event.mentions)[0];
        const content = ''
        let name = event.mentions[mention].split(" ").length
        if (!mention) return api.sendMessage('Vui lòng tag người muốn chuyển coins cho!', threadID, messageID);
        else {
            if (!isNaN(args[0 + name])) {
                const coins = parseInt(args[0 + name]);
                let balance = (await Currencies.getData(senderID)).money;
                let balancetag = (await Currencies.getData(mention)).money;
                if (coins <= 0) return api.sendMessage('Số coins bạn muốn chuyển không hợp lệ', threadID, messageID);
                if (coins > balance) return api.sendMessage('Số coins bạn muốn chuyển lớn hơn số coins bạn hiện có!', threadID, messageID);
                else {
                    return api.sendMessage({
                        body: 'Đã chuyển cho ' + event.mentions[mention].replace(/@/g, "") + ` ${args[0+ name]}💵`,
                        attachment: await momo((await Users.getData(mention)).name, coins, content)
                    }, threadID, async () => {
                        Currencies.setData(mention, options = {
                            money: balancetag + parseInt(coins)
                        })
                        Currencies.setData(senderID, options = {
                            money: balance - parseInt(coins)
                        })
                    }, messageID);
                }
            } else return api.sendMessage('Vui lòng nhập số coins muốn chuyển', threadID, messageID);
        }
    }
    async function momo(name, coins, content) {
        const fs = global.nodemodule["fs-extra"];
        const axios = global.nodemodule["axios"];
        if (!fs.existsSync(__dirname + '/cache/SplineSans-Medium.ttf')) {
            let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=102B8O3_0vTn_zla13wzSzMa-vdTZOCmp&export=download`, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/SplineSans-Medium.ttf", Buffer.from(getfont, "utf-8"));
        };
        if (!fs.existsSync(__dirname + '/cache/SplineSans.ttf')) {
            let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1--V7DANKLsUx57zg8nLD4b5aiPfHcmwD&export=download`, {
                responseType: "arraybuffer"
            })).data;
            fs.writeFileSync(__dirname + "/cache/SplineSans.ttf", Buffer.from(getfont2, "utf-8"));
        };

        const moment = require("moment-timezone");
        var time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm");
        var day = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY");
        var codeGD = String(Math.floor(Math.random() * (90000000000 - 1)) + 10000000000)
        var lastNumber = parseInt(codeGD.slice(-1))
        const {
            loadImage,
            createCanvas
        } = require("canvas");
        let path = __dirname + "/cache/comment.png";

        let bg = (await axios.get(`https://i.imgur.com/OUPC4iK.png`, {
            responseType: "arraybuffer"
        })).data;
        fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
        let bgBase = await loadImage(path);
        let canvas = createCanvas(bgBase.width, bgBase.height);
        let ctx = canvas.getContext("2d");

        const Canvas = global.nodemodule["canvas"];
        ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
        Canvas.registerFont(__dirname + `/cache/SplineSans-Medium.ttf`, {
            family: "SplineSans-Medium"
        });
        Canvas.registerFont(__dirname + `/cache/SplineSans.ttf`, {
            family: "SplineSans"
        });
        ctx.font = "30px SplineSans-Medium";
        ctx.fillStyle = "#000000";
        ctx.textAlign = "start";
        ctx.fillText('-' + String(coins).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ', 151, 201);
        ctx.font = "25px SplineSans";
        ctx.fillText(content, 64, 1080);
        ctx.font = "26px SplineSans-Medium";
        ctx.textAlign = "right";
        ctx.fillText(name, 547, 816);
        ctx.fillStyle = "#FF00FF";
        ctx.font = "22px SplineSans-Medium";
        ctx.fillText('0332578JQK', 547, 884);
        ctx.font = "22px SplineSans";
        ctx.textAlign = "start";
        ctx.fillText(codeGD, 279, 240);
        ctx.fillStyle = "#000000";
        ctx.textAlign = "right";
        ctx.font = "22px SplineSans-Medium";
        ctx.fillText('Miễn phí', 547, 504);
        ctx.fillText('Ví MoMo', 547, 436);
        ctx.fillText(`${time} - ${day}`, 547, 373);
        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(path, imageBuffer);

        return fs.createReadStream(path)
    }
} 
