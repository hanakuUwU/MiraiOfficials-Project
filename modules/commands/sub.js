const path = require("path");
const axios = require("axios");
module.exports.config = {
    name: "sub",
    version: "2.0.0",
    hasPermssion: 0,
    credits: "Dàn code của D-Jukie, đàn cá của Heo Rừng UwU",
    description: "Câu cá ở một hành tinh khác, dựa theo tựa game Subnautica khiến bạn đái ra máu vì độ đa dạng của nó UwU",
    commandCategory: "Giải trí",
    usages: "[]",
    cooldowns: 0,
    envConfig: {
        APIKEY: ""
    }
};

module.exports.checkPath = function (type, senderID) {
    const pathItem = path.join(__dirname, 'cauca', `item.json`);
    const pathUser = path.join(__dirname, 'cauca', 'datauser', `${senderID}.json`);
    const pathUser_1 = require("./cauca/datauser/" + senderID + '.json');
    const pathItem_1 = require("./cauca/item.json");
    if (type == 1) return pathItem
    if (type == 2) return pathItem_1
    if (type == 3) return pathUser
    if (type == 4) return pathUser_1
}

module.exports.onLoad = async () => {
    const fs = require("fs-extra");
    const axios = require("axios");

    const dir = __dirname + `/cauca/`;
    const dirCache = __dirname + `/cauca/cache/`;
    const dirData = __dirname + `/cauca/datauser/`;
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, {
        recursive: true
    });
    if (!fs.existsSync(dirData)) fs.mkdirSync(dirData, {
        recursive: true
    });
    if (!fs.existsSync(dirCache)) fs.mkdirSync(dirCache, {
        recursive: true
    });

    if (!fs.existsSync(dir + "data.json")) (await axios({
        url: "https://raw.githubusercontent.com/KhangGia1810/fishing/main/data.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "data.json"));

    if (!fs.existsSync(dir + "item.json")) (await axios({
        url: "https://raw.githubusercontent.com/KhangGia1810/fishing/main/item.json",
        method: 'GET',
        responseType: 'stream'
    })).data.pipe(fs.createWriteStream(dir + "item.json"));
    return;
}

module.exports.run = async function ({
    api,
    event,
    args,
    Users,
    Currencies
}) {
    const {
        threadID,
        messageID,
        senderID
    } = event;
    const {
        readFileSync,
        writeFileSync,
        existsSync,
        createReadStream,
        readdirSync
    } = require("fs-extra")
    const axios = require("axios")
    const pathData = path.join(__dirname, 'cauca', 'datauser', `${senderID}.json`);
    switch (args[0]) {
    case 'register':
    case '-r': {
        const nDate = new Date().toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        if (!existsSync(pathData)) {
            var obj = {};
            obj.name = (await Users.getData(senderID)).name;
            obj.ID = senderID;
            obj.mainROD = null,
                obj.GPS = {};
            obj.GPS.locate = null,
                obj.GPS.area = null,
                obj.fishBag = [];
            obj.item = [];
            obj.timeRegister = nDate
            obj.fishBag.push({
                ID: 0,
                name: 'Không Bán Cái Này Nếu không Muốn Lỗi',
                category: 'Legendary',
                size: 999999,
                sell: 0
            });
            writeFileSync(pathData, JSON.stringify(obj, null, 4));
            var msg = {body: "(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n⚔️𝐓𝐚̣𝐨 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠\n𝐇𝐚̃𝐲 𝐪𝐮𝐚̂̉𝐲 𝐛𝐚𝐧𝐡 𝐦𝐚𝐩!!!", attachment: await this.subnautica()}
            return api.sendMessage(msg, threadID, messageID);
        } else return api.sendMessage({body: "(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n⚔️𝐁𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐚̣𝐨 𝟐 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧⚔️", attachment: await this.subnautica()}, threadID, messageID);
    }
    case 'shop':
    case '-s': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n⚔️𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐤𝐢́ 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐚̂𝐮 𝐜𝐚́!", attachment: await this.subnautica()}, threadID, messageID);
        }
        return api.sendMessage({body: "===[𝐒𝐡𝐨𝐩]===\n𝟏. 𝐌𝐮𝐚 𝐯𝐚̣̂𝐭 𝐩𝐡𝐚̂̉𝐦\n𝟐. 𝐁𝐚́𝐧 𝐯𝐚̣̂𝐭 𝐩𝐡𝐚̂̉𝐦 𝐜𝐚̂𝐮 𝐝𝐮̛𝐨̛̣𝐜\n𝟑. 𝐍𝐚̂𝐧𝐠 𝐜𝐚̂́𝐩/𝐒𝐮̛̉𝐚 𝐜𝐡𝐮̛̃𝐚 𝐯𝐚̣̂𝐭 𝐩𝐡𝐚̂̉𝐦\n\n𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐯𝐨̛́𝐢 𝐥𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧", attachment: await this.subnautica()}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "shop"
            })
        }, messageID);
    }
    case 'bag':
    case '-b': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n⚔️𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐤𝐢́ 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐚̂𝐮 𝐜𝐚́!", attachment: await this.subnautica()}, threadID, messageID);
        }
        var data = this.checkPath(4, senderID)

        return api.sendMessage({body: `(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n\n1. Cá (SL: ${data.fishBag.length})\n2. Cần câu (SL: ${data.item.length})\nVui lòng reply vật phẩm cần xem!`, attachment: await this.subnautica()}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "choosebag"
            })
        }, messageID);
    }
    case 'custom':
    case '-c': {
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n⚔️𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐤𝐢́ 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐚̂𝐮 𝐜𝐚́!", attachment: await this.subnautica()}, threadID, messageID);
        }
        if (args[1] == 'rod') {
            var data = this.checkPath(4, senderID)
            var listItem = '(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n',
                number = 1;
            for (let i of data.item) {
                listItem += `${number++}. ${i.name} - Thời gian chờ: ${i.countdown}s - Độ bền: ${i.durability}\n`
            }
            listItem += '𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐫𝐞𝐩𝐥𝐲 𝐝𝐞̂̉ 𝐜𝐡𝐨̣𝐧 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐜𝐡𝐢́𝐧𝐡 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧!'
            return api.sendMessage(listItem, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "rodMain",
                    data: data,
                    item: data.item
                })
            }, messageID);
        }
        if (args[1] == 'locate') {
            return api.sendMessage({body: "==[𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧]==\n𝟏. 𝐓𝐡𝐞 𝐂𝐫𝐚𝐭𝐞𝐫\n𝟐. 𝐒𝐞𝐜𝐭𝐨𝐫 𝐙𝐞𝐫𝐨", attachment: await this.subnautica()}, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "location"
                })
            }, messageID);
        }
    }
    case 'help': {
            return api.sendMessage({body: "====𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚====\n-𝐑: 𝐃𝐚̆𝐧𝐠 𝐤𝐢́\n-𝐂𝐮𝐬𝐭𝐨𝐦: 𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐮 𝐯𝐮̛̣𝐜 𝐜𝐚̂𝐮 𝐜𝐚́\n-𝐁𝐚𝐠: 𝐗𝐞𝐦 𝐭𝐮́𝐢 𝐝𝐨̂̀\n- 𝐒𝐡𝐨𝐩: 𝐂𝐮̛̉𝐚 𝐡𝐚̀𝐧𝐠\n\n=====𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚=====", attachment: await this.subnautica()}, threadID, messageID);
        }
    default: {
        async function checkTime(cooldown, dataTime) {
            if (cooldown - (Date.now() - dataTime) > 0) {

                var time = cooldown - (Date.now() - dataTime),
                    minutes = Math.floor(time / 60000),
                    seconds = ((time % 60000) / 1000).toFixed(0);
                return api.sendMessage(`⏰ 𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐦𝐮𝐚 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐜𝐚̂́𝐩 𝐛𝐚̣̂𝐜 𝐜𝐚𝐨 𝐡𝐨̛𝐧 𝐝𝐞̂̉ 𝐜𝐚̂𝐮 𝐥𝐢𝐞̂𝐧 𝐭𝐢𝐞̂́𝐩 𝐭𝐫𝐨𝐧𝐠 𝐭𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧 𝐧𝐠𝐚̆́𝐧!\n⌚𝐂𝐡𝐨̛̀ 𝐠𝐢𝐚𝐧 𝐜𝐡𝐨̛̀ 𝐜𝐨̀𝐧 𝐥𝐚̣𝐢: ${minutes}:${seconds}!`, threadID, messageID);
            }
        }
        if (!existsSync(pathData)) {
            return api.sendMessage({body: "(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n⚔️𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐤𝐢́ 𝐭𝐚̀𝐢 𝐤𝐡𝐨𝐚̉𝐧 𝐜𝐚̂𝐮 𝐜𝐚́!", attachment: await this.subnautica()}, threadID, messageID);
        }
        var data = this.checkPath(4, senderID)
        if (data.item.length == 0) return api.sendMessage(`𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐨́ 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮, 𝐯𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐯𝐚̀𝐨 𝐬𝐡𝐨𝐩 𝐝𝐞̂̉ 𝐦𝐮𝐚!`, threadID, messageID);
        if (data.mainROD == null) return api.sendMessage('𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐡𝐨̣𝐧 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮!\n𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 `𝐜𝐮𝐬𝐭𝐨𝐦 𝐫𝐨𝐝`', threadID, messageID);
        if (data.GPS.locate == null || data.GPS.area == null) return api.sendMessage('𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐜𝐡𝐨̣𝐧 𝐯𝐮̀𝐧𝐠 𝐜𝐚̂𝐮 𝐜𝐚́!\n𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 `𝐜𝐮𝐬𝐭𝐨𝐦 𝐥𝐨𝐜𝐚𝐭𝐞`', threadID, messageID);
        var rod = data.mainROD
        var location = data.GPS.locate
        var area = data.GPS.area
        var type = this.getFish()
        var findRod = data.item.find(i => i.name == rod)
        if (findRod.durability <= 0) return api.sendMessage('𝐂𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐯𝐮̛̀𝐚 𝐡𝐨̉𝐧𝐠, 𝐛𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐬𝐮̛̉𝐚 𝐜𝐡𝐮̛̃𝐚 𝐡𝐨𝐚̣̆𝐜 𝐜𝐡𝐨̣𝐧 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐦𝐨̛́𝐢!', threadID, messageID);
        await checkTime(findRod.countdown * 1000, findRod.countdownData)
        findRod.countdownData = Date.now();
        findRod.durability = findRod.durability - 10;
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        if (type == false) return api.sendMessage('𝐎𝐡, 𝐤𝐡𝐨̂𝐧𝐠 𝐝𝐢́𝐧𝐡 𝐠𝐢̀ 𝐜𝐚̉', threadID, messageID);
        var fil = (await this.dataFish(location, area)).filter(i => i.category == type)
        if (fil.length == 0) return api.sendMessage('𝐎𝐡, 𝐤𝐡𝐨̂𝐧𝐠 𝐝𝐢́𝐧𝐡 𝐠𝐢̀ 𝐜𝐚̉', threadID, messageID);
        var getData = fil[Math.floor(Math.random() * fil.length)];
        var IDF = ((this.checkPath(4, senderID)).fishBag)[parseInt(((this.checkPath(4, senderID)).fishBag).length - 1)].ID + 1;
        (this.checkPath(4, senderID)).fishBag.push({
            ID: IDF,
            name: getData.name,
            category: getData.category,
            size: getData.size,
            sell: getData.sell,
            image: getData.image
        });
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        var msg = {body: `(===𝐒𝐮𝐛𝐧𝐚𝐮𝐭𝐢𝐜𝐚===)\n𝐂𝐡𝐮́𝐜 𝐦𝐮̛̀𝐧𝐠 𝐛𝐚̣𝐧 𝐯𝐮̛̀𝐚 𝐜𝐚̂𝐮 𝐝𝐢́𝐧𝐡 𝐜𝐚́\n𝐓𝐞̂𝐧: ${getData.name} (${getData.sell}$)\n𝐋𝐨𝐚̣𝐢: ${getData.category}\n𝐒𝐢𝐳𝐞: ${getData.size}𝐜𝐦`, attachment: await this.image(getData.image)}
        return api.sendMessage(msg, threadID, messageID);
    }
    }
}
module.exports.data = async function () {
    const data = (await axios.get(`https://raw.githubusercontent.com/KhangGia1810/fishing/main/data.json`)).data;  
    return data
}

module.exports.dataFish =async function (a, b) {
    const data = await this.data()
    console.log(data)
    var loc = data.find(i => i.location == a)
    var are = loc.area.find(i => i.name == b)
    
    return are.creature
}

module.exports.image = async function(link) {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    var images = [];
    let download = (await axios.get(link, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync( __dirname + `/cauca/cache/subnautica.png`, Buffer.from(download, "utf-8"));
        images.push(fs.createReadStream(__dirname + `/cauca/cache/subnautica.png`));
    return images
}
module.exports.subnautica = async function() {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    var images = [];
    let download = (await axios.get('https://i.imgur.com/pTrrcQB.png', { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync( __dirname + `/cauca/cache/subnauticapage.png`, Buffer.from(download, "utf-8"));
        images.push(fs.createReadStream(__dirname + `/cauca/cache/subnauticapage.png`));
    return images
}

module.exports.getFish = function () {
    var rate = Math.floor(Math.random() * 100) + 1
    if (rate <= 4) return false
    if (rate > 4 && rate <= 34) return 'Common';
    if (rate > 34 && rate <= 59) return 'Uncommon';
    if (rate > 59 && rate <= 79) return 'Rare';
    if (rate > 79 && rate <= 94) return 'Epic';
    if (rate > 94 && rate <= 99) return 'Legendary';
    if (rate > 99 && rate <= 100) return 'Mythical';
}
module.exports.handleReply = async function ({
    event,
    api,
    Currencies,
    handleReply,
    Users
}) {

    const {
        body,
        threadID,
        messageID,
        senderID
    } = event;
    const axios = require("axios")
    const {
        readFileSync,
        writeFileSync,
        existsSync,
        createReadStream,
        unlinkSync,
        writeFile
    } = require("fs-extra")
    const pathItem = this.checkPath(2, senderID);
    async function checkDur(a, b, c) {
        var data = require("./cauca/item.json");
        var find = data.find(i => i.name == a)
        if (c == 'rate') return (b / find.durability) * 100
        if (c == 'reset') return find.durability
        return `${b}/${find.durability} (${((b/find.durability)*100).toFixed(0)}%)`
    }
    switch (handleReply.type) {
    case 'shop': {
        if (body == 1) {
            api.unsendMessage(handleReply.messageID)
            var listItem = '===[𝐒𝐡𝐨𝐩 𝐖𝐞𝐚𝐩𝐨𝐧]===\n',
                number = 1;
            for (let i of pathItem) {
                listItem += `${number++}. ${i.name} (${i.price}$) - 𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧 𝐜𝐡𝐨̛̀ ${i.countdown} (𝐂𝐡𝐚̂́𝐭 𝐥𝐮̛𝐨̛̣𝐧𝐠: ${i.durability})\n\n`
            }
            return api.sendMessage(listItem + '𝐑𝐞𝐩𝐥𝐲 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐝𝐞̂̉ 𝐜𝐡𝐨̣𝐧 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐜𝐡𝐨 𝐛𝐚̣𝐧. 𝐌𝐨̂̃𝐢 𝐥𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐭𝐫𝐮̛̀ 𝟏𝟎 𝐜𝐡𝐚̂́𝐭 𝐥𝐮̛𝐨̛̣𝐧𝐠!', threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "buyfishingrod"
                })
            }, messageID);
        }
        if (body == 2) {
            api.unsendMessage(handleReply.messageID)
            var data = this.checkPath(4, senderID).fishBag;
            if (data.length == 0) return api.sendMessage('𝐓𝐮́𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐠𝐢̀ 𝐜𝐚̉!', threadID, messageID);
            var Common = data.filter(i => i.category == 'Common')
            var Uncommon = data.filter(i => i.category == 'Uncommon')
            var Rare = data.filter(i => i.category == 'Rare')
            var Epic = data.filter(i => i.category == 'Epic')
            var Legendary = data.filter(i => i.category == 'Legendary')
            var Mythical = data.filter(i => i.category == 'Mythical')
            var listCategory = [Common, Uncommon, Rare, Epic, Legendary, Mythical];
            return api.sendMessage(`𝐂𝐡𝐨̣𝐧 𝐥𝐨𝐚̣𝐢 𝐜𝐚́ 𝐦𝐮𝐨̂́𝐧 𝐛𝐚́𝐧:\n𝟏. 𝐂𝐨𝐦𝐦𝐨𝐧 - ${Common.length}\n𝟐. 𝐔𝐧𝐜𝐨𝐦𝐦𝐨𝐧 - ${Uncommon.length}\n𝟑. 𝐑𝐚𝐫𝐞 - ${Rare.length}\n𝟒. 𝐄𝐩𝐢𝐜 - ${Epic.length}\n𝟓. 𝐋𝐞𝐠𝐞𝐧𝐝𝐚𝐫𝐲 - ${Legendary.length}\n𝟔. 𝐌𝐲𝐭𝐡𝐢𝐜𝐚𝐥 - ${Mythical.length}`, threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "chooseFish",
                    listCategory
                })
            }, messageID);
        }
        if (body == 3) {
            api.unsendMessage(handleReply.messageID)
            var data = this.checkPath(4, senderID).item;
            var msg = `===𝓕𝓘𝓧 𝓘𝓣𝓔𝓜===\n`,
                number = 1;
            for (let i of data) {
                msg += `${number++}. ${i.name} - 𝐂𝐡𝐚̂́𝐭 𝐋𝐮̛𝐨̛̣𝐧𝐠: ${await checkDur(i.name, i.durability, 0)}\n`
            }
            return api.sendMessage(msg + '𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐫𝐞𝐩𝐥𝐲 𝐯𝐚̣̂𝐭 𝐩𝐡𝐚̂̉𝐦 𝐦𝐮𝐨̂́𝐧 𝐬𝐮̛̉𝐚!, 𝐠𝐢𝐚́ 𝐬𝐮̛̉𝐚 𝐛𝐚̆̀𝐧𝐠 𝟏/𝟑 𝐠𝐢𝐚́ 𝐯𝐚̣̂𝐭 𝐩𝐡𝐚̂̉𝐦', threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "fixfishingrod",
                    list: data
                })
            }, messageID);
        } else return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!', threadID, messageID);
    }
    case 'choosebag': {
        api.unsendMessage(handleReply.messageID)
        var data = this.checkPath(4, senderID)
        if (body == 1) {
            if (data.fishBag.length == 0) return api.sendMessage('𝐓𝐫𝐨𝐧𝐠 𝐭𝐮́𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐜𝐨𝐧 𝐜𝐚́ 𝐧𝐚̀𝐨!', threadID, messageID);
            var listFish = `===𝓲𝓷𝓿𝓮𝓷𝓽𝓸𝓻𝔂===\n`,
                number = 1;
            for (let i of data.fishBag) {
                listFish += `${number++}. ${i.name} (${i.size}𝐜𝐦) - ${i.category} (${i.sell}$)\n`
            }
            return api.sendMessage(listFish, threadID, messageID);
        }
        if (body == 2) {
            api.unsendMessage(handleReply.messageID)
            if (data.item.length == 0) return api.sendMessage('𝐓𝐫𝐨𝐧𝐠 𝐭𝐮́𝐢 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐯𝐚̣̂𝐭 𝐩𝐡𝐚̂̉𝐦 𝐧𝐚̀𝐨!', threadID, messageID);
            var listItemm = `===𝓲𝓷𝓿𝓮𝓷𝓽𝓸𝓻𝔂===\n`,
                number = 1;
            for (let i of data.item) {
                listItemm += `${number++}. ${i.name} (${i.price}$) - 𝐂𝐡𝐚̂́𝐭 𝐋𝐮̛𝐨̛̣𝐧𝐠: ${i.durability} (${i.countdown}s)\n`
            }
            return api.sendMessage(listItemm, threadID, messageID);
        } else return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!', threadID, messageID);
    }
    case 'rodMain': {
        var data = handleReply.data;
        var item = handleReply.item;
        if (parseInt(body) > item.length || parseInt(body) <= 0) return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        data.mainROD = item[parseInt(body) - 1].name
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(data, null, 2));
        return api.sendMessage(`===𝐌𝐚𝐢𝐧 𝐖𝐞𝐚𝐩𝐨𝐧===\n-𝐂𝐡𝐢̉𝐧𝐡 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 '${item[parseInt(body) - 1].name}' 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐜𝐡𝐢́𝐧𝐡!`, threadID, messageID);
    }
    case 'location': {
        const data = require("./cauca/data.json");
        if (body != 1 && body != 2) return api.sendMessage("𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!", threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        var listLoca = '==[𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧]==\n',
            number = 1;
        for (let i of data[parseInt(body) - 1].area) {
            listLoca += `${number++}. ${i.name}\n`
        };
        (this.checkPath(4, senderID)).GPS.locate = data[parseInt(body) - 1].location
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        if(body == 1) var images = 'https://i.imgur.com/SJewp15.png'
        if(body == 2) var images = 'https://i.imgur.com/FtB2vWi.png'
        return api.sendMessage({body: listLoca + '𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐜𝐡𝐨̣𝐧 𝐯𝐮̀𝐧𝐠 𝐛𝐚̣𝐧 𝐦𝐮𝐨̂́𝐧 𝐜𝐚̂𝐮!', attachment: await this.image(images)}, threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "chooseArea",
                area: data[parseInt(body) - 1]
            })
        }, messageID);
    }
    case 'chooseArea': {
        var area = handleReply.area;
        var pathh = this.checkPath(4, senderID)
        var pathhh = this.checkPath(3, senderID)
        if (parseInt(body) > area.area.length || parseInt(body) <= 0) return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        pathh.GPS.area = area.area[parseInt(body) - 1].name
        writeFileSync(pathhh, JSON.stringify(pathh, null, 2));
        return api.sendMessage(`==[𝐋𝐨𝐜𝐚𝐭𝐢𝐨𝐧]==\n𝐂𝐡𝐮𝐲𝐞̂̉𝐧 𝐭𝐨̛́𝐢 𝐯𝐮̀𝐧𝐠 '${area.location} - ${area.area[parseInt(body) - 1].name}' 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠`, threadID, messageID);
    }
    case 'fixfishingrod': {
        if (parseInt(body) > handleReply.list.length || parseInt(body) <= 0) return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!', threadID, messageID);
        var rod = handleReply.list[parseInt(body) - 1]
        if (await checkDur(rod.name, rod.durability, 'rate') > 75) return api.sendMessage('𝐂𝐡𝐢̉ 𝐬𝐮̛̉𝐚 𝐜𝐚̂̀𝐧 𝐜𝐚̂𝐮 𝐱𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐥𝐚̂𝐮', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        await checkMoney(senderID, parseInt((rod.price * (1 / 3)).toFixed(0)))
        await Currencies.decreaseMoney(senderID, parseInt((rod.price * (1 / 3)).toFixed(0)));
        rod.durability = await checkDur(rod.name, rod.durability, 'reset')
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        return api.sendMessage(`===𝐅𝐢𝐱 𝐖𝐞𝐚𝐩𝐨𝐧===\n-𝐒𝐮̛̉𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ${rod.name} (${parseInt((rod.price*(1/3)).toFixed(0))}$)`, threadID, messageID);
    }
    case 'buyfishingrod': {
        if (parseInt(body) > pathItem.length || parseInt(body) <= 0) return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!!', threadID, messageID);
        var data = pathItem[parseInt(body) - 1]
        var checkM = await checkMoney(senderID, data.price);
        if ((this.checkPath(4, senderID)).item.some(i => i.name == data.name)) return api.sendMessage('𝐁𝐚̣𝐧 𝐬𝐨̛̉ 𝐡𝐮̛̃𝐮 𝐯𝐚̣̂𝐭 𝐩𝐡𝐚̂̉𝐦 𝐧𝐚̀𝐲 𝐫𝐨̂̀𝐢!', threadID, messageID);
        (this.checkPath(4, senderID)).item.push({
            name: data.name,
            price: data.price,
            durability: data.durability,
            countdown: data.countdown,
            countdownData: null,
            image: data.image
        })
        writeFileSync(this.checkPath(3, senderID), JSON.stringify(this.checkPath(4, senderID), null, 2));
        api.unsendMessage(handleReply.messageID)
        var msg = { body: `𝐌𝐮𝐚 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ${data.name}\n𝐆𝐢𝐚́: ${data.price}$\n𝐂𝐡𝐚̂́𝐭 𝐋𝐮̛𝐨̛̣𝐧𝐠: ${data.durability}\n𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧 𝐜𝐡𝐨̛̀: ${data.countdown}`, attachment: await this.image(data.image)}
        return api.sendMessage(msg, threadID, messageID);
    }
    case 'chooseFish': {
        if (parseInt(body) > handleReply.listCategory.length || parseInt(body) <= 0) return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!', threadID, messageID);
        api.unsendMessage(handleReply.messageID);
        if (handleReply.listCategory[parseInt(body) - 1].length == 0) return api.sendMessage('𝐊𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐜𝐨𝐧 𝐜𝐚́ 𝐧𝐚̀𝐨 𝐡𝐞̂́𝐭 𝐚́!', threadID, messageID);
        var fish = "=====𝐅𝐢𝐬𝐡=====\n",
            number = 1;
        for (let i of handleReply.listCategory[parseInt(body) - 1]) {
            fish += `${number++}. ${i.name} (${i.size}𝐜𝐦) - 𝐋𝐨𝐚̣𝐢: ${i.category} - ${i.sell}$\n`
        }
        return api.sendMessage(fish + "𝐑𝐞𝐩𝐥𝐲 𝐬𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣ 𝐦𝐮𝐨̂́𝐧 𝐛𝐚́𝐧 (𝐜𝐨́ 𝐭𝐡𝐞̂̉ 𝐫𝐞𝐩 𝐧𝐡𝐢𝐞̂̀𝐮 𝐬𝐨̂́) 𝐡𝐨𝐚̣̆𝐜 𝐫𝐞𝐩𝐥𝐲 '𝐚𝐥𝐥' 𝐜𝐡𝐨 𝐛𝐚́𝐧 𝐭𝐚̂́𝐭 𝐜𝐚̉ 𝐜𝐚́!", threadID, (error, info) => {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: event.senderID,
                type: "sell",
                list: handleReply.listCategory[parseInt(body) - 1]
            })
        }, messageID);
    }
    case 'sell': {
        if ((parseInt(body) > handleReply.list.length || parseInt(body) <= 0) && body.toLowerCase() != 'all') return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!', threadID, messageID);
        api.unsendMessage(handleReply.messageID)
        var bag = (this.checkPath(4, senderID)).fishBag
        var coins = 0;
        if (body.toLowerCase() == 'all') {
            for (let i of handleReply.list) {
                await Currencies.increaseMoney(senderID, parseInt(i.sell));
                coins += parseInt(i.sell)
                console.log(i.ID)
                var index = (this.checkPath(4, senderID)).fishBag.findIndex(item => item.ID == i.ID);
                bag.splice(index, 1);
                writeFileSync(this.checkPath(3, senderID), JSON.stringify((this.checkPath(4, senderID)), null, 2));
            }
            return api.sendMessage(`𝐁𝐚́𝐧 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 ${handleReply.list.length} 𝐜𝐨𝐧 𝐜𝐚́ 𝐯𝐚̀ 𝐭𝐡𝐮 𝐯𝐞̂̀ ${coins}$`, threadID, messageID);
        }
        else {
            var msg = 'Code_By_D-Jukie ' + body
            var chooses = msg.split(" ").map(n => parseInt(n));
            chooses.shift();
            var text = `=====𝐒𝐞𝐥𝐥=====\n`,
                number = 1;
            for (let i of chooses) {
                const index = (this.checkPath(4, senderID)).fishBag.findIndex(item => item.ID == handleReply.list[i - 1].ID);
                text += `${number++}. ${bag[index].name} +${bag[index].sell}$\n`
                coins += parseInt(bag[index].sell)
                await Currencies.increaseMoney(senderID, parseInt(bag[index].sell));
                bag.splice(index, 1);
                writeFileSync(this.checkPath(3, senderID), JSON.stringify((this.checkPath(4, senderID)), null, 2));
            }
            return api.sendMessage(text + `\n𝐓𝐡𝐮 𝐯𝐞̂̀ ${coins}$`, threadID, messageID);
        }
    }
    default: {
        api.unsendMessage(handleReply.messageID)
        return api.sendMessage('𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!', threadID, messageID);
    }
    }
    async function checkMoney(senderID, maxMoney) {
        var i, w;
        i = (await Currencies.getData(senderID)) || {};
        w = i.money || 0
        if (w < parseInt(maxMoney)) return api.sendMessage('𝐁𝐚̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐭𝐢𝐞̂̀𝐧 𝐜𝐡𝐨 𝐜𝐮𝐨̣̂𝐜 𝐠𝐢𝐚𝐨 𝐝𝐢̣𝐜𝐡 𝐧𝐚̀𝐲!', threadID, messageID);
    }
}
