module.exports.config = {
    name: "pay",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Chuyển tiền cho người khác",
    commandCategory: "tiện ích",
    usages: "[tag người dùng] [Số tiền cần chuyển]",
    cooldowns: 5
};

module.exports.languages = {
    "vi": {
        "missingTag": "~~~~~[ 𝑀𝑖𝑟𝑎𝑖𝑃𝑎𝑦 ]~~~~~\n𝗕𝗮̣𝗻 𝗽𝗵𝗮̉𝗶 𝘁𝗮𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗰𝗮̂̀𝗻 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝘁𝗶𝗲̂̀𝗻\n~~~~~~~~~~~~~~~~~",
        "overTagLength": "~~~~~[ 𝑀𝑖𝑟𝑎𝑖𝑃𝑎𝑦 ]~~~~~\n𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗶̉ 𝘁𝗮𝗴 𝗺𝗼̣̂𝘁 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂𝘆 𝗻𝗵𝗮̂́𝘁\n~~~~~~~~~~~~~~~~~",
        "userNotExist": "~~~~~[ 𝑀𝑖𝑟𝑎𝑖𝑃𝑎𝑦 ]~~~~~\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗯𝗮̣𝗻 𝗰𝗮̂̀𝗻 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗼̂̀𝗻 𝘁𝗮̣𝗶 𝘁𝗿𝗼𝗻𝗴 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴!\n~~~~~~~~~~~~~~~~~",
        "invalidInput": "~~~~~[ 𝑀𝑖𝑟𝑎𝑖𝑃𝑎𝑦 ]~~~~~\n𝗦𝗼̂́ 𝘁𝗶𝗲̂̀𝗻 𝗯𝗮̣𝗻 𝗻𝗵𝗮̣̂𝗽 𝗸𝗵𝗼̂𝗻𝗴 𝗽𝗵𝘂̀ 𝗵𝗼̛̣𝗽 𝗱𝗲̂̉ 𝗰𝗵𝘂𝘆𝗲̂̉𝗻\n~~~~~~~~~~~~~~~~~",
        "payerNotExist": "~~~~~[ 𝑀𝑖𝑟𝑎𝑖𝑃𝑎𝑦 ]~~~~~\n𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗯𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗼̂̀𝗻 𝘁𝗮̣𝗶 𝘁𝗿𝗼𝗻𝗴 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴, 𝘃𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝗰𝗵𝗼̛̀ 𝟱 𝗴𝗶𝗮̂𝘆 𝘀𝗮𝘂 𝗱𝗼́ 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶\n~~~~~~~~~~~~~~~~~",
        "notEnoughMoney": "~~~~~[ 𝑀𝑖𝑟𝑎𝑖𝑃𝑎𝑦 ]~~~~~\n𝗕𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗱𝘂̉ 𝘁𝗶𝗲̂̀𝗻 𝗱𝗲̂̉ 𝘁𝗵𝘂̛̣𝗰 𝗵𝗶𝗲̣̂𝗻 𝗴𝗶𝗮𝗼 𝗱𝗶̣𝗰𝗵!\n~~~~~~~~~~~~~~~~~",
        "paySuccess": "~~~~~[ 𝑀𝑖𝑟𝑎𝑖𝑃𝑎𝑦 ]~~~~~\n𝗗𝗮̃ 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴\n𝗦𝗼̂́ 𝘁𝗶𝗲̂̀𝗻: %1$ (15% tax)\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗻𝗵𝗮̣̂𝗻: %2\n~~~~~~~~~~~~~~~~~",
        "error": "~~~~~[ 𝑀𝑖𝑟𝑎𝑖𝑃𝑎𝑦 ]~~~~~\n𝗗𝗮̃ 𝘅𝗮̉𝘆 𝗿𝗮 𝗹𝗼̂̃𝗶 𝗸𝗵𝗼̂𝗻𝗴 𝗺𝗼𝗻𝗴 𝗺𝘂𝗼̂́𝗻 𝘁𝗿𝗼𝗻𝗴 𝗹𝘂́𝗰 𝘁𝗵𝘂̛̣𝗰 𝗵𝗶𝗲̣̂𝗻 𝗴𝗶𝗮𝗼 𝗱𝗶̣𝗰𝗵\n~~~~~~~~~~~~~~~~~"
    },
    "en": {
        "missingTag": "[ PAY ] No recipient tagged.",
        "overTagLength": "[ PAY ] You have to tag at no more than one recipient.",
        "userNotExist": "[ PAY ] Invalid recipient(s).",
        "invalidInput": "[ PAY ] Invailid amount.",
        "payerNotExist": "[ PAY ] Please wait 5 seconds to be fully registered as right now you are not a member yet.",
        "notEnoughMoney": "[ PAY ] Insufficient fund. Please check your amount.",
        "paySuccess": "[ PAY ] Successfully transfered %1$ to %2 (15% tax included)",
        "error": "[ PAY ] Unknown error occured, please contact administrator."
    }
}

module.exports.run = async function ({ api, event, Currencies, Users, args, getText }) {
    const { increaseMoney, decreaseMoney, getData } = Currencies;
    const { threadID, messageID, senderID } = event;
	var targetID = String(args[1]);
	var moneyPay = (args.slice(2, args.length)).join(" ") || null;

	if (isNaN(targetID)) {
		const mention = Object.keys(event.mentions);
        if (mention.length == 0) return api.sendMessage(getText("missingTag"), threadID, messageID);
        if (mention.length > 1) return api.sendMessage(getText("overTagLength"), threadID, messageID);
		args = args.join(" ");
		targetID = String(mention[0]);
		moneyPay = (args.slice(args.indexOf(event.mentions[mention[0]]) + (event.mentions[mention[0]] || "").length + 1, args.length)) || null;
	}

    if (!global.data.allCurrenciesID.includes(targetID)) return api.sendMessage(getText("userNotExist"), threadID, messageID);

    if (isNaN(moneyPay) && moneyPay < 1) return api.sendMessage(getText("invalidInput"), threadID, messageID);
    const taxed = (parseInt(moneyPay) * 5) / 100;
    
    try {
        const moneyPayer = (await getData(senderID)).money;
        if (!moneyPayer) return api.sendMessage(getText("payerNotExist"), threadID, messageID);
        if (moneyPayer < moneyPay) return api.sendMessage(getText("notEnoughMoney"), threadID, messageID);
        const nameTarget = global.data.userName.get(targetID) || await Users.getNameUser(targetID);
        await decreaseMoney(senderID, parseInt(moneyPay));
        await increaseMoney(targetID, parseInt(moneyPay) - taxed);
        return api.sendMessage(getText("paySuccess", (parseInt(moneyPay) - taxed), `${nameTarget}`), threadID, messageID);
    } catch { return api.sendMessage(getText("error"), threadID, messageID) }
}
