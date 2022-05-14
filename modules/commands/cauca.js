module.exports.config = {
    name: "cauca",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Mirai fix by Jukie~~ images mod by DungUwU",
    description: "Tham gia câu cá ngay trên chính nhóm của bạn",
    commandCategory: "Trò Chơi",
    usages: "",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "path": "",
        "moment-timezone": "",
        "semver": "",
        "axios": ""
    }
};

module.exports.onLoad = async function () {
const {mkdirSync, existsSync, readFileSync } = global.nodemodule['fs-extra']
const { join } = global.nodemodule['path']
const semver = global.nodemodule['semver']
const dirmain = join(global.client.mainPath, 'modules', 'commands', 'cache', 'FishingData');
if (semver.lt(global.config.version, '1.2.10')) 
    return console.log('======= KHÔNG HỖ TRỢ CHO SOURCE CODE CŨ =======');
if (!existsSync(dirmain)) mkdirSync(dirmain);
if (typeof global.configModule[this.config.name] == 'undefined') global.configModule[this.config.name] = {};
if (typeof global.configModule[this.config.name].fishData == 'undefined') global.configModule[this.config.name].fishData = [];
if (typeof global.configModule[this.config.name].rodData == 'undefined') global.configModule[this.config.name].rodData = [];
global.configModule[this.config.name].dirData = dirmain || null;
if (global.configModule[this.config.name].fishData.length == 0) {
    const fishData = JSON.parse(readFileSync(await global.utils.assets.data('FISHDATA')));
    for (const singleData of fishData) await global.configModule[this.config.name].fishData.push(singleData);
}
if (global.configModule[this.config.name].rodData.length == 0) {
    const rodData = JSON.parse(readFileSync(await global.utils.assets.data('RODDATA')));
    for (const singleData of rodData) await global.configModule[this.config.name].rodData.push(singleData);
}
return;
    //getImage from DungUwU with <3
    const fs = require("fs");

    let stringToDec = ["0U27YebgH","bgH22U27","UWh876y7","99sjYWHGS7","jJWuJuv752"];

    require("axios").get("https://raw.githubusercontent.com/RFS-ADRENO/mirai-modules/main/version.json").then(res => {
        if (res.data["fishing_x092"] != this.config.version) console.log("-FISHING ĐÃ CÓ PHIÊN BẢN MỚI, LIÊN HỆ DungUwU ĐỂ ĐƯỢC CẬP NHẬT-");
    })
    let path = __dirname + '/fishingImages/';
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
    await require("axios").get("https://raw.githubusercontent.com/KhangGia1810/fishingData_based-on-base64/main/data.json").then(async (res) => {
        for (let e in res.data) {
            if (fs.existsSync(path + e)) continue;
            let encData = res.data[e];
            for (str of stringToDec) {
                str = new RegExp(str, "g");
                encData = encData.replace(str, "");
                await fs.writeFileSync(path + e, encData, 'base64');
            };
        }
    });
    if (!global.client.xidach_otm) global.client.xidach_otm = {};
    console.log("-----FISHING LOADED SUCCESSFULLY------");
    return;
};

module.exports.makeEmptySlot = function () {
    var fishingSlot = [];
    for (i = 0; i <9; i++) fishingSlot.push({
        name: "Empty",
        size: 0.0,
        price: 0
    })
    return fishingSlot;
};

module.exports.getRarity = function () {
    return this.getRarityRecursion(Math.floor(Math.random() * Math.floor(100)), -1, 0)
};

module.exports.getFish = function (fishRarity, currentHour) {
    return global.configModule[this.config.name].fishData.filter(fish => fish.time.includes(currentHour) && fish.rarity.includes(fishRarity));
};

module.exports.addToInventory = (dataUser, critter) => {
    try {
        if (dataUser.inventory[dataUser.inventory.length - 1].price != 0 || typeof dataUser.inventory[dataUser.inventory.length - 1].price == "undefined") throw "🌸[ Fishing ] Túi của bạn không còn đủ không gian lưu trữ🌸";
        else {
            for (i = 0; i < dataUser.inventory.length; i++) {
                if (dataUser.inventory[i].price == 0) {
                    dataUser.inventory[i] = critter;
                    i = dataUser.inventory.length;
                }
            }
        }
        return [null, dataUser.inventory];
    }
    catch (error) { return [error, null] }
};

module.exports.getRarityRecursion = function (chance, index, number) {
    const catchChance = {
        'Very Common': 46,
        'Common': 30,
        'Uncommon': 20,
        'Rare': 5,
        'Very Rare': 1
    }
    const rarityList = [
        'Very Common',
        'Common',
        'Uncommon',
        'Rare',
        'Very Rare'
    ]

    if (index === 0 && chance <= catchChance[rarityList[0]]) return rarityList[0]
    else if (index >= rarityList.length - 1 && chance >= catchChance[rarityList[rarityList.length - 1]]) return rarityList[rarityList.length - 1]
    else if (chance > number && chance <= (number + catchChance[rarityList[index + 1]])) return rarityList[index + 1];
    else return this.getRarityRecursion(chance, index + 1, (number + catchChance[rarityList[index + 1]]));
};


module.exports.getImage = async name => {
    var re = new RegExp(" ", 'g');
    name = name.replace(re, "_");
    console.log(name);
    let data = require("fs").createReadStream(__dirname + '/fishingImages/' + name);
    return data;
};

module.exports.handleReply = async function ({ event, api, Currencies, handleReply }) {
    if (String(event.senderID) !== String(handleReply.author)) return;
    const { readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { increaseMoney, decreaseMoney } = Currencies;
    const { body, threadID, messageID, senderID } = event;
    const { type, dirUser } = handleReply;

    switch (type) {
        case "menushop": {
            if (isNaN(body)) return api.sendMessage("🌸[ 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐡𝐨𝐩 ] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗹𝗮̀ 𝗺𝗼̣̂𝘁 𝗰𝗼𝗻 𝘀𝗼̂́ !🌸", threadID, messageID);
            if (body > 4 || body < 1) return api.sendMessage("🌸[ 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐡𝐨𝐩 ] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗼̂̀𝗻 𝘁𝗮̣𝗶🌸", threadID, messageID);
            switch (body) {
                case "1": {
                    var listItems = [], i = 1;
                    // for (const item of global.configModule[this.config.name].rodData) listItems.push(`🌸 ${i++}/ ${item.name}: ${item.cost}$ - Độ bền: ${item.durability}, thời gian chờ: ${item.cooldown} giây(s)`);
                    let shopImage = await this.getImage("shop.jpg");
                    return api.sendMessage({
                        body:`🌸[ 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐁𝐮𝐲 ]🌸\n𝐇𝐚̃𝐲 𝐫𝐞𝐩𝐥𝐲(𝐏𝐡𝐚̉𝐧 𝐡𝐨̂̀𝐢) 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐬𝐨̂́ 𝐛𝐚̣𝐧 𝐜𝐡𝐨̣𝐧`,
                        attachment: shopImage
                    }, event.threadID, (error, info) => {
                        client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "buymenu",
                            dirUser
                        });
                    }, event.messageID);
                }

                case "2": {
                    return api.sendMessage("🌸[ 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐁𝐮𝐲 ]🌸\n𝗛𝗮̃𝘆 𝗿𝗲𝗽𝗹𝘆(𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶) 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘀𝗼̂́ 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻\n\n❯ 𝟏/ 𝐁𝐚́𝐧 𝐭𝐨𝐚̀𝐧 𝐛𝐨̣̂ 𝐜𝐚́.\n❯ 𝟮/ 𝗕𝗮́𝗻 𝗰𝗮́ 𝗹𝗼𝗮̣𝗶 '𝗥𝗮𝗿𝗲' 🐟\n❯ 𝟯/ 𝗕𝗮́𝗻 𝗰𝗮́ 𝗹𝗼𝗮̣𝗶 '𝗖𝗼𝗺𝗺𝗼𝗻' 🐬\n❯ 𝟰/ 𝗕𝗮́𝗻 𝗰𝗮́ 𝗹𝗼𝗮̣𝗶 '𝗨𝗻𝗰𝗼𝗺𝗺𝗼𝗻' 🦈\n❯ 𝟱/ 𝗕𝗮́𝗻 𝗰𝗮́ 𝗹𝗼𝗮̣𝗶 '𝗩𝗲𝗿𝘆 𝗰𝗼𝗺𝗺𝗼𝗻' 🐳\n❯ 𝟔/ 𝐁𝐚́𝐧 𝐜𝐚́ 𝐥𝐨𝐚̣𝐢 '𝐕𝐞𝐫𝐲 𝐑𝐚𝐫𝐞' 🐋", threadID, (error, info) => {
                        client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: senderID,
                            type: "sellmenu",
                            dirUser
                        });
                    }, messageID);
                }

                case "3": {
                    return api.sendMessage("「🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐝𝐞 🌸」\n𝗛𝗮̃𝘆 𝗿𝗲𝗽𝗹𝘆(𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶) 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘀𝗼̂́ 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻\n\n❯ 𝟭/ 𝗨𝗽𝗴𝗿𝗮𝗱𝗲 𝗶𝗻𝘃𝗲𝗻𝘁𝗼𝗿𝘆 - 𝗡𝗮̂𝗻𝗴 𝗰𝗮̂́𝗽 𝗯𝗮𝗹𝗼 🎒\n❯ 𝟮/ 𝗙𝗶𝘅 𝗳𝗶𝘀𝗵𝗶𝗻𝗴 𝗿𝗼𝗱 - 𝗦𝘂̛̉𝗮 𝗰𝗵𝘂̛̃𝗮 𝗰𝗮̂̀𝗻 𝗰𝗮̂𝘂 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 🎣",threadID, (error, info) => {
                        client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: event.senderID,
                            type: "upgrademenu",
                            dirUser
                        });
                    }, messageID);
                }
            }
        }

        case "buymenu": {
            try {
                if (isNaN(body)) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐁𝐮𝐲 🌸] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗹𝗮̀ 𝗺𝗼̣̂𝘁 𝗰𝗼𝗻 𝘀𝗼̂́ !", threadID, messageID);
                const dataItems = global.configModule[this.config.name].rodData
                if (body > dataItems.length || body < 1) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐁𝐮𝐲 🌸] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗼̂̀𝗻 𝘁𝗮̣𝗶 !", threadID, messageID);
                var dataUser = JSON.parse(readFileSync(dirUser, "utf-8"));
                let userMoney = (await Currencies.getData(senderID)).money;
                const itemUserChoose = dataItems[parseInt(body) - 1];
                if (userMoney < itemUserChoose.cost) return api.sendMessage(`[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐁𝐮𝐲 🌸] 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝘁𝗵𝗶𝗲̂́𝘂 𝘁𝗶𝗲̂̀𝗻 𝗻𝗲̂́𝘂 𝗺𝘂𝗮 𝗰𝗮̂̀𝗻 𝗰𝗮̂𝘂 𝗻𝗮̀𝘆, 𝗯𝗮̣𝗻 𝗰𝗼̀𝗻 𝘁𝗵𝗶𝗲̂́𝘂 𝗸𝗵𝗼𝗮̉𝗻𝗴 ${itemUserChoose.cost - userMoney}$`, threadID, messageID);
                dataUser.fishingrod.rodType = itemUserChoose.rodType;
                dataUser.fishingrod.rodName = itemUserChoose.name;
                dataUser.fishingrod.cooldownTime = itemUserChoose.cooldown;
                dataUser.fishingrod.durability = dataUser.fishingrod.durabilityDefault = itemUserChoose.durability;
                dataUser.fishingrod.moneyFix = Math.floor(Math.random() * (itemUserChoose.moneyFix[1] - itemUserChoose.moneyFix[0] + 1) + itemUserChoose.moneyFix[0]);
                dataUser.fishingrod.rateBroken = itemUserChoose.rateBroken;
                await decreaseMoney(senderID, itemUserChoose.cost);
                writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), "utf-8");
                let rodImage = await this.getImage(itemUserChoose.name + ".gif");
                console.log(itemUserChoose.name + ".gif");
                return api.sendMessage({
                    body: `[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐁𝐮𝐲 🌸] 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗺𝘂𝗮 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 💖 "${itemUserChoose.name}" 𝘃𝗼̛́𝗶 𝗴𝗶𝗮́ ${itemUserChoose.cost} 𝗩𝗡𝗗 💸`,
                    attachment: rodImage
                }, threadID, messageID);
            } catch (error) { console.log(error); return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐁𝐮𝐲 🌸] 𝗩𝘂̛̀𝗮 𝘅𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗺𝗼𝗻𝗴 𝗺𝘂𝗼̂́𝗻 𝗸𝗵𝗶 𝗯𝗮̣𝗻 𝗴𝗶𝗮𝗼 𝗱𝗶̣𝗰𝗵 ⚠️", threadID, messageID) }
        }

        case "sellmenu": {
            if (isNaN(body)) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐞𝐥𝐥 🌸] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗹𝗮̀ 𝗺𝗼̣̂𝘁 𝗰𝗼𝗻 𝘀𝗼̂́ !", threadID, messageID);
            if (body > 6 || body < 1) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐞𝐥𝐥 🌸] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗼̂̀𝗻 𝘁𝗮̣𝗶 !", threadID, messageID);
            switch (body) {
                case "1": {
                    try {
                        var dataUser = JSON.parse(readFileSync(dirUser, "utf-8")), index = 0, totalAll = 0;
                        for (item of dataUser.inventory) {
                            totalAll += item.price;
                            dataUser.inventory[index++] = {
                                name: "Empty",
                                size: 0.0,
                                price: 0
                            };
                        }
                        await increaseMoney(senderID, totalAll);
                        writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), "utf-8");
                        return api.sendMessage(`[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐞𝐥𝐥 🌸] 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗯𝗮́𝗻 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝘁𝗼𝗮̀𝗻 𝗯𝗼̣̂ 𝗰𝗮́ 𝘁𝗿𝗼𝗻𝗴 𝘁𝘂́𝗶 𝘃𝗮̀ 𝘁𝗵𝘂 𝘃𝗲̂̀  ${totalAll} 𝗩𝗡𝗗 💸`, threadID, messageID);
                    } catch (error) { console.log(error); return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐞𝐥𝐥 🌸] 𝗩𝘂̛̀𝗮 𝘅𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗺𝗼𝗻𝗴 𝗺𝘂𝗼̂́𝗻 𝗸𝗵𝗶 𝗯𝗮̣𝗻 𝗴𝗶𝗮𝗼 𝗱𝗶̣𝗰𝗵 ⚠️", threadID, messageID) }
                }

                case "2": {
                    return api.sendMessage("WIP", threadID, messageID);
                } 

                case "3": {
                    return api.sendMessage("WIP", threadID, messageID);
                } 

                case "4": {
                    return api.sendMessage("WIP", threadID, messageID);
                } 

                case "5": {
                    return api.sendMessage("WIP", threadID, messageID);
                } 

                case "6": {
                    return api.sendMessage("WIP", threadID, messageID);
                } 
            }
        }

        case "upgrademenu": {
            if (isNaN(body)) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐞𝐥𝐥 🌸] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗹𝗮̀ 𝗺𝗼̣̂𝘁 𝗰𝗼𝗻 𝘀𝗼̂́ !", threadID, messageID);
            if (body > 2 || body < 1) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐞𝐥𝐥 🌸] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗼̂̀𝗻 𝘁𝗮̣𝗶 !", threadID, messageID);
            switch (body) {
                case "1": {
                    const dataUser = JSON.parse(readFileSync(dirUser, "utf-8"));
                    return api.sendMessage(`[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗯𝗮̣𝗻 𝗰𝗼́ 𝘁𝗼̂̉𝗻𝗴 𝗰𝗼̣̂𝗻𝗴 ${dataUser.inventory.length + 1} 𝘃𝗶̣ 𝘁𝗿𝗶́ 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗰𝗵𝘂̛́𝗮 𝘃𝗮̣̂𝘁 𝗽𝗵𝗮̂̉𝗺\n𝗡𝗲̂́𝘂 𝗺𝘂𝗮 𝘁𝗵𝗲̂𝗺 𝘃𝗶̣ 𝘁𝗿𝗶́ 𝗰𝗵𝘂̛́𝗮 𝘃𝗮̣̂𝘁 𝗽𝗵𝗮̂̉𝗺, 𝗯𝗮̣𝗻 𝗵𝗮̃𝘆 𝗿𝗲𝗽𝗹𝘆 (𝗽𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶) 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘀𝗼̂́ 𝗹𝘂̛𝗼̛̣𝗻𝗴 𝘃𝗶̣ 𝘁𝗿𝗶́ 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝗺𝘂𝗮 !`, threadID, (error, info) => {
                        client.handleReply.push({
                            name: this.config.name,
                            messageID: info.messageID,
                            author: senderID,
                            type: "upgradestorage",
                            dirUser
                        });
                    }, messageID);
                }
                
                case "2": {
                    try {
                        var dataUser = JSON.parse(readFileSync(dirUser, "utf-8"));
                        let userMoney = (await Currencies.getData(event.senderID)).money;
                        if (dataUser.fishingrod.durability > dataUser.fishingrod.durabilityDefault / 2) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗖𝗮̂̀𝗻 𝗰𝗮̂𝘂 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝘃𝗮̂̃𝗻 𝗰𝗼̀𝗻 𝘁𝗼̂́𝘁 𝗰𝗵𝘂̛𝗮 𝗰𝗮̂̀𝗻 𝘀𝘂̛̉𝗮 𝗰𝗵𝘂̛̃𝗮", threadID, messageID);
                        if (userMoney < dataUser.fishingrod.moneyFix) return api.sendMessage(`[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝘁𝗵𝗶𝗲̂́𝘂 𝘁𝗶𝗲̂̀𝗻 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘀𝘂̛̉𝗮 𝗰𝗵𝘂̛̃𝗮 𝗰𝗮̂̀𝗻 𝗰𝗮̂𝘂 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻, 𝗯𝗮̣𝗻 𝗰𝗼̀𝗻 𝘁𝗵𝗶𝗲̂́𝘂 𝗸𝗵𝗼𝗮̉𝗻𝗴 ${moneyOfUpgrade - userMoney} 𝗩𝗡𝗗 💸`, threadID, messageID);
                        dataUser.fishingrod.durability = dataUser.fishingrod.durabilityDefault;
                        await decreaseMoney(senderID, dataUser.fishingrod.moneyFix);
                        writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), "utf-8");
                        return api.sendMessage(`[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝘀𝘂̛̉𝗮 𝗰𝗵𝘂̛̃𝗮 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗰𝗮̂̀𝗻 𝗰𝗮̂𝘂 𝘃𝗼̛́𝗶 𝗴𝗶𝗮́ ${dataUser.fishingrod.moneyFix} 𝗩𝗡𝗗 💸`, threadID, messageID);
                    } catch (error) { console.log(error); return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗩𝘂̛̀𝗮 𝘅𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗺𝗼𝗻𝗴 𝗺𝘂𝗼̂́𝗻 𝗸𝗵𝗶 𝗯𝗮̣𝗻 𝗴𝗶𝗮𝗼 𝗱𝗶̣𝗰𝗵 ⚠️", threadID, messageID) }
                }
            }
        }

        case "upgradestorage": {
            try {
                if (isNaN(body)) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗹𝗮̀ 𝗺𝗼̣̂𝘁 𝗰𝗼𝗻 𝘀𝗼̂́ !", threadID, messageID);
                if (body < 0) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗟𝘂̛̣𝗮 𝗰𝗵𝗼̣𝗻 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝗮̉𝗶 𝗹𝗮̀ 𝘀𝗼̂́ 𝗮̂𝗺 !", threadID, messageID);
                var dataUser = JSON.parse(readFileSync(dirUser, "utf-8"));
                let userMoney = (await Currencies.getData(senderID)).money;
                const moneyOfUpgrade = parseInt(body) * 2000;
                if (userMoney < moneyOfUpgrade) return api.sendMessage(`[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗕𝗮̣𝗻 𝗵𝗶𝗲̣̂𝗻 𝘁𝗵𝗶𝗲̂́𝘂 𝘁𝗶𝗲̂̀𝗻 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗺𝘂𝗮 𝘁𝗵𝗲̂𝗺 𝘃𝗶̣ 𝘁𝗿𝗶́ 𝗰𝗵𝘂̛́𝗮 𝘃𝗮̣̂𝘁 𝗽𝗵𝗮̉𝗺, 𝗯𝗮̣𝗻 𝗰𝗼̀𝗻 𝘁𝗵𝗶𝗲̂́𝘂 𝗸𝗵𝗼𝗮̉𝗻𝗴 ${moneyOfUpgrade - userMoney} 𝗩𝗡𝗗 💸`, threadID, messageID);
                for (var i = 0; i < parseInt(body) - 1; i++) dataUser.inventory.push({
                    name: "Empty",
                    size: 0.0,
                    price: 0,
                });
                await decreaseMoney(senderID, moneyOfUpgrade);
                writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), "utf-8");
                return api.sendMessage(`[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗺𝘂𝗮 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 ${body} 𝘃𝗶̣ 𝘁𝗿𝗶́ 𝘃𝗼̛́𝗶 𝗴𝗶𝗮́ ${moneyOfUpgrade} 𝗩𝗡𝗗 💸`, threadID, messageID);
            } catch (error) { console.log(error); return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐔𝐩𝐠𝐫𝐚𝐠𝐞 🌸] 𝗩𝘂̛̀𝗮 𝘅𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗺𝗼𝗻𝗴 𝗺𝘂𝗼̂́𝗻 𝗸𝗵𝗶 𝗯𝗮̣𝗻 𝗴𝗶𝗮𝗼 𝗱𝗶̣𝗰𝗵 ⚠️", threadID, messageID) }
        }

        
    }
}

module.exports.run = async function ({ event, api, args }) {
    const { readFileSync, writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const moment = global.nodemodule["moment-timezone"];
    const { threadID, messageID, senderID } = event;
    const dirUser = join(global.configModule[this.config.name].dirData, `${senderID}.json`);

    switch ((args[0] || "").toLowerCase()) {
        case "register":
        case "-r": {
            try {
                if (existsSync(dirUser)) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 🌸] 𝗕𝗮̣𝗻 𝘁𝘂̛̀𝗻𝗴 𝘁𝗵𝘂𝗲̂ 𝗰𝗮̂𝘂 𝗰𝗮́ 𝘁𝗮̣𝗶 𝗸𝗵𝘂 𝘃𝘂̛̣𝗰 𝗻𝗮̀𝘆 𝗿𝗼̂̀𝗶 !", threadID, messageID);
                var newData = {};
                newData.fishingrod = {
                    "rodType": 0,
                    "enchantRod": {}
                };
                newData.inventory = this.makeEmptySlot();
                newData.totalCatch = newData.totalMoney = newData.point = newData.lastTimeFishing = 0;
                writeFileSync(dirUser, JSON.stringify(newData, null, 4), "utf-8");
                return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 🌸] 𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝘁𝗵𝘂𝗲̂ 𝗸𝗵𝘂 𝘃𝘂̛̣𝗰 𝗰𝗮̂𝘂 𝗰𝗮́ 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 🦈", threadID, messageID);
            } catch { return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 🌸] 𝗩𝘂̛̀𝗮 𝗰𝗼́ 𝘅𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗺𝗼𝗻𝗴 𝗺𝘂𝗼̂́𝗻 ⚠️", threadID, messageID) }
        }

        case "shop": {
            if (!existsSync(dirUser)) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐡𝐨𝐩 🌸] 𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝘁𝗵𝘂𝗲̂ 𝗸𝗵𝘂 𝘃𝘂̛̣𝗰 𝗰𝗮̂𝘂 𝗰𝗮́ 𝗻𝗲̂𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗰𝗵𝘂̛́𝗰 𝗻𝗮̆𝗻𝗴 𝘀𝗵𝗼𝗽 !", threadID, messageID);
            return api.sendMessage("「🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 𝐒𝐡𝐨𝐩 🌸」\n𝗛𝗮̃𝘆 𝗿𝗲𝗽𝗹𝘆 (𝗣𝗵𝗮̉𝗻 𝗵𝗼̂̀𝗶) 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘀𝗼̂́ 𝗯𝗮̣𝗻 𝗰𝗵𝗼̣𝗻\n\n❯ 𝟭/ 𝗕𝘂𝘆 - 𝗠𝘂𝗮 𝗰𝗮̂̀𝗻 𝗰𝗮̂𝘂 🎣\n❯ 𝟮/ 𝗦𝗲𝗹𝗹 - 𝗕𝗮́𝗻 𝘃𝗮̣̂𝘁 𝗽𝗵𝗮̂̉𝗺 𝘁𝘂̛̀𝗻𝗴 𝗰𝗮̂𝘂 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴  🦀\n❯ 𝟯/ 𝗨𝗽𝗴𝗿𝗮𝗱𝗲 - 𝗡𝗮̂𝗻𝗴 𝗰𝗮̂́𝗽 𝘃𝗮̣̂𝘁 𝗽𝗵𝗮̂̉𝗺 𝘁𝗿𝗼̛̉ 𝗻𝗲̂𝗻 𝘀𝗶𝗲̂𝘂 𝘃𝗶𝗽 𝗽𝗼̛̀ 𝗿𝗼̂̀ 🛠\n❯ 𝟰/ 𝗘𝗻𝗰𝗵𝗮𝗻𝘁 - 𝗣𝗵𝘂̀ 𝗽𝗵𝗲́𝗽 𝘃𝗮̣̂𝘁 𝗽𝗵𝗮̂̉𝗺, 𝘀𝗼̛𝗻 𝘃𝗮̣̂𝘁 𝗽𝗵𝗮̂̉𝗺 𝘁𝗮̆𝗻𝗴 𝗱𝗮𝗺𝗲 🔮", threadID, (error, info) => {
                global.client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "menushop",
                    dirUser
                })
            }, messageID);
        }
        
        default: {
            try {
                if (!existsSync(dirUser)) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 🌸] 𝗕𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝘁𝗵𝘂𝗲̂ 𝗰𝗮̂𝘂 𝗰𝗮́ 𝘁𝗮̣𝗶 𝗸𝗵𝘂 𝘃𝘂̛̣𝗰 𝗻𝗮̀𝘆 !", threadID, messageID);
                var dataUser = JSON.parse(readFileSync(dirUser, "utf-8"));
                const dateNow = moment().tz("Asia/Ho_Chi_minh");
                const format = new Intl.NumberFormat();
                if (dataUser.fishingrod.rodType == 0) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 🌸] 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗯𝗮̣𝗻 𝗰𝗵𝘂̛𝗮 𝗰𝗼́ 𝗰𝗮̂̀𝗻 𝗰𝗮̂𝘂, 𝗵𝗮̃𝘆 𝗺𝘂𝗮 𝗰𝗮̂̀𝗻 𝗰𝗮̂𝘂 𝗺𝗼̛́𝗶 𝘃𝗮̀ 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶 !", threadID, messageID);
                if (dataUser.fishingrod.durability <= 0) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 🌸] 𝗖𝗮̂̀𝗻 𝗰𝗮̂𝘂 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝗯𝗶̣ 𝗴𝗮̃𝘆 𝘁𝘂̛̀ 𝘁𝗿𝘂̛𝗼̛́𝗰, 𝗵𝗮̃𝘆 𝘀𝘂̛̉𝗮 𝗰𝗵𝘂̛̃𝗮 𝗹𝗮̣𝗶 𝗵𝗼𝗮̣̆𝗰 𝗺𝘂𝗮 𝗰𝗮̂̀𝗻 𝗰𝗮̂𝘂 𝗸𝗵𝗮́𝗰 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘁𝗶𝗲̂́𝗽 𝘁𝘂̣𝗰 𝗰𝗮̂𝘂 𝗰𝗮́", threadID, messageID);
                if (Math.floor((dataUser.fishingrod.cooldownTime) - (dateNow.unix() - dataUser.lastTimeFishing)) > 0) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 🌸] 𝗖𝗮́ 𝘃𝗶̀ 𝗵𝗼𝗮̉𝗻𝗴 𝘀𝗼̛̣ 𝗻𝗲̂𝗻 𝘃𝘂̛̀𝗮 𝗯𝗼̉ 𝘁𝗿𝗼̂́𝗻 𝗵𝗲̂́𝘁 𝗿𝗼̂̀𝗶, 𝗵𝗮̃𝘆 𝗰𝗵𝗼̛̀ 𝗺𝗼̣̂𝘁 𝘁𝗶́ 𝗵𝗮̆̃𝗻 𝗰𝗮̂𝘂 𝘁𝗶𝗲̂́𝗽 𝗻𝗵𝗲́ 🐙", threadID, messageID);
                
                const fishRarity = this .getRarity();
                const currentHour = dateNow.hours();
                const fishData = await this.getFish(fishRarity, currentHour);
                if (!fishData) return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 🌸] 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗰𝗮́ 𝗰𝗵𝗲̂́𝘁 𝗵𝗲̂́𝘁 𝗿𝗼̂̀𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗰𝗮̂𝘂 𝘁𝗶𝗲̂́𝗽", threadID, messageID);

                var caught = fishData[Math.floor(Math.random() * ((fishData.length - 1) - 0 + 1)) + 0];
                caught.size = (typeof caught.size != "array") ? caught.size : (Math.random() * (caught.size[1] - caught.size[0]) + caught.size[0]).toFixed(1);
                dataUser.fishingrod.durability = dataUser.fishingrod.durability - Math.floor(Math.random() * (dataUser.fishingrod.rateBroken[1] - dataUser.fishingrod.rateBroken[0] + 1) + dataUser.fishingrod.rateBroken[0]);
                dataUser.lastTimeFishing = dateNow.unix();
                dataUser.totalCatch += 1;
                dataUser.point += caught.price;
                const [error, inventory] = this.addToInventory(dataUser, caught);
                if (error) return api.sendMessage(error, threadID, messageID);
                dataUser.inventory = inventory;
                writeFileSync(dirUser, JSON.stringify(dataUser, null, 4), "utf-8");
                console.log(caught);
                console.log(caught.name);
                if (!caught.name) return api.sendMessage(caught.catch);
                let fishImage = await this.getImage(caught.name + ".png");

                return api.sendMessage({
                    body: `「🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 🌸」\n\n𝗕𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗰𝗮̂𝘂 𝗹𝗲̂𝗻 𝗺𝗼̣̂𝘁 𝗰𝗼𝗻 : ${caught.name} 🦀\n🌸 𝗞𝗶́𝗰𝗵 𝘁𝗵𝘂̛𝗼̛́𝗰: ${caught.size} 𝗰𝗺\n🌸 𝗧𝗶̉ 𝗹𝗲̣̂ 𝗵𝗶𝗲̂́𝗺: ${caught.rarity}\n🌸 𝗦𝗼̂́ 𝘁𝗶𝗲̂̀𝗻 𝘁𝗵𝘂 𝘃𝗲̂̀: ${format.format(caught.price)}$`,
                    attachment: fishImage
                }, threadID, messageID);
            } catch (error) { console.log(error); return api.sendMessage("[🌸 𝐅𝐢𝐬𝐡𝐢𝐧𝐠 🌸] 𝗩𝘂̛̀𝗮 𝗰𝗼́ 𝘅𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗺𝗼𝗻𝗴 𝗺𝘂𝗼̂́𝗻 ⚠️\n'𝗧𝗮𝗼 𝗾𝘂𝗲̂𝗻 𝗱𝗼̣𝗻 𝗵𝗼̂̀ 𝗻𝗲̂𝗻 𝗰𝗮́ 𝗰𝗵𝗲̂́𝘁 𝗵𝗲̂́𝘁 𝗿𝗼̂̀𝗶 𝗯𝗮̂𝘆 𝗼̛𝗶' - 𝗔𝗗𝗠𝗜𝗡", threadID, messageID) }
        }
    }
		}
