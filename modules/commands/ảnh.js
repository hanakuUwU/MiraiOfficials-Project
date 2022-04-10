module.exports.config = {
  name: "ảnh",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Adoins mod by Kaneki",
  description: "xem ảnh hiện có trên bot",
  commandCategory: "Dành cho người dùng",
  usages: "image",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
}

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies,getText}) => {
   
   const axios = require('axios');
    const request = require('request');
    const fs = require('fs-extra');

     if (args.length == 0) return api.sendMessage(` 🎭 𝐃𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐜𝐚́𝐜 𝐚̉𝐧𝐡 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨́ 🎭 \n\n𝟏. 𝐚̉𝐧𝐡 𝐠𝐚́𝐢 \n𝟐. 𝐚̉𝐧𝐡 𝐭𝐫𝐚𝐢 \n𝟑. 𝐚̉𝐧𝐡 𝐦𝐨̂𝐧𝐠\n𝟒. 𝐚̉𝐧𝐡 𝐜𝐨𝐬𝐩𝐥𝐚𝐲\n𝟓. 𝐚̉𝐧𝐡 𝐧𝐮𝐝𝐞\n𝟔. 𝐚̉𝐧𝐡 𝐠𝐚́𝐢 𝐬𝐞𝐱𝐲\n𝟕. 𝐚̉𝐧𝐡 𝐯𝐮́\n𝟖. 𝐚̉𝐧𝐡 𝐡𝐞𝐧𝐭𝐚𝐢\n𝟗. 𝐚̉𝐧𝐡 𝐊𝐚𝐧𝐧𝐚\n𝟏𝟎. 𝐚̉𝐧𝐡 𝐌𝐢𝐫𝐚𝐢\n𝟏𝟏. 𝐚̉𝐧𝐡 𝐂𝐡𝐢𝐭𝐚𝐧𝐝𝐚\n𝟏𝟐. 𝐚̉𝐧𝐡 𝐠𝐞𝐧𝐭𝐥𝐞\n\n𝐃𝐮̀𝐧𝐠 𝐩𝐫𝐞𝐟𝐢𝐱 + 𝐚̉𝐧𝐡  < 𝐚̉𝐧𝐡 𝐛𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝐱𝐞𝐦 >\n
`, event.threadID, event.messageID);

     if (args[0] == "vú") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/gaivuto').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐆𝐚́𝐢 𝐯𝐮́ 𝐛𝐮̛̣ 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
    if (args[0] == "trai") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/trai').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐓𝐫𝐚𝐢 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
  if (args[0] == "hentai") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/hentai').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐀̉𝐧𝐡 𝐡𝐞𝐧 𝐜𝐡𝐨 𝐭𝐡𝐚̆̀𝐧𝐠 𝐝𝐚̂𝐦 𝐝𝐮̣𝐜 𝐧𝐞̀\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
  if (args[0] == "sexy") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/gaisexy').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐆𝐚́𝐢 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
  if (args[0] == "nude") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/nude').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐆𝐚́𝐢 𝐧𝐮𝐝𝐞 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
  if (args[0] == "cosplay") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/cosplay').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐚̉𝐧𝐡 𝐜𝐨𝐬𝐩𝐥𝐚𝐲 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
  if (args[0] == "anime") {
    var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://uptime.ocvat2810.repl.co').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `𝐀𝐧𝐢𝐦𝐞 𝐜𝐮̉𝐚 𝐛𝐚̣𝐧 𝐧𝐞̀\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
  if (args[0] == "mông") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/gaiditbu').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐆𝐚́𝐢 𝐝𝐢́𝐭 𝐛𝐮̛̣ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
  }
 if (args[0] == "gái") {
var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanekiflop.tk/gai').then(res => {
  var image = res.data.data;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐆𝐚́𝐢 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
};
  if (args[0] == "kanna") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://apikanna.ngochan6666.repl.co').then(res => {
  var image = res.data.data;
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐀̉𝐧𝐡 𝐊𝐚𝐧𝐧𝐚 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
            };
  if (args[0] == "mirai") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://api.xlshsad.repl.co/images/mirai').then(res => {
  var image = res.data.url;
  let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐀̉𝐧𝐡 𝐌𝐢𝐫𝐚𝐢 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
        };
  if (args[0] == "chitanda") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://api.xlshsad.repl.co/images/chitanda').then(res => {
  var image = res.data.url;
	let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐀̉𝐧𝐡 𝐂𝐡𝐢𝐭𝐚𝐧𝐝𝐚 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
        };
  if (args[0] == "gentle") {
  var money = (await Currencies.getData(event.senderID)).money
  if (money >= 1000) {
  axios.get('https://api.apidata.repl.co/gentle').then(res => {
  var image = res.data.data;
	let count = res.data.count;
  let callback = function () {
          api.sendMessage({
            body: `⚡️𝐀̉𝐧𝐡 𝐂𝐡𝐢𝐭𝐚𝐧𝐝𝐚 𝐧𝐞̀ <3\n𝐓𝐚̀𝐢 𝐊𝐡𝐨𝐚̉𝐧: -𝟏𝟎𝟎𝟎$\n𝐓𝐨̂̉𝐧𝐠 𝐬𝐨̂́ 𝐚̉𝐧𝐡: ${count}`,
            attachment: fs.createReadStream(__dirname + `/cache/boobs.png`)
          }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/boobs.png`), event.messageID);
        };
        request(image).pipe(fs.createWriteStream(__dirname + `/cache/boobs.png`)).on("close", callback);
        Currencies.setData(event.senderID, options = {money: money - 1000})
      })
  } else return api.sendMessage("𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 𝟏𝟎𝟎𝟎$",event.threadID,event.messageID);
	}
}

