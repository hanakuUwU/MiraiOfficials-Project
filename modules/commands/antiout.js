/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "antiout",
    version: "1.1.2",
    hasPermssion: 1,
    credits: "ProCoderMew",
    description: "Tự động add lại thành viên out chùa | Không chắc chắn là add lại được tất cả.",
    commandCategory: "box",
    usages: "antiout",
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const log = require(process.cwd() + '/utils/log');
    const path = resolve(__dirname, 'cache', 'meewmeew.json');
    if (!existsSync(path)) {
        const obj = {
            antiout: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('antiout')) data.antiout = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }

    log("[!] Lưu Ý [!]", '[ ANTIOUT ]');
    log("- Không sử dụng module vào mục đích quấy rối.", '[ ANTIOUT ]');
    log("- Vi phạm điều trên sẽ được góp mặt trong gban.", '[ ANTIOUT ]');
    log("[!] Vì 1 môi trường trong sạch hơn [!] ", '[ ANTIOUT ]');
    log("- Hãy report những người có hành động như vậy cho Admin MiraiProject.", '[ ANTIOUT ]');
}

module.exports.run = async function({ api, event }) {
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, 'cache', 'meewmeew.json');
    const { threadID, messageID } = event;
    const database = require(path);
    const { antiout } = database;
    if (antiout[threadID] == true) {
        antiout[threadID] = false;
        api.sendMessage({body: "𝐓𝐚̆́𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐚𝐧𝐭𝐢𝐨𝐮𝐭"}, threadID, messageID);
    } else {
        antiout[threadID] = true;
        api.sendMessage({body: "𝐁𝐚̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡 𝐜𝐨̂𝐧𝐠 𝐚𝐧𝐭𝐢𝐨𝐮𝐭\n𝐍𝐠𝐡𝐢𝐞̂𝐦 𝐜𝐚̂́𝐦 𝐡𝐚̀𝐧𝐡 𝐯𝐢 𝐩𝐡𝐚́ 𝐡𝐨𝐚̣𝐢, 𝐥𝐚̣𝐦 𝐝𝐮̣𝐧𝐠"}, threadID, messageID);
    }
    writeFileSync(path, JSON.stringify(database, null, 4));
}
