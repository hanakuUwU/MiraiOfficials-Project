const axios = require("axios"),
  fs = require("fs-extra"),
  request = require("request");
module.exports.config = {
  name: "mine",
  version: "1.0.0",
  credits: "Thiệu Trung Kiên",
  description: "Đào đá",
  usages: "mine [register/shop/upgrade/sell]",
  commandCategory: "game",
  cooldowns: 0
}, module.exports.run = async function({
  api: e,
  event: a,
  args: n,
  client: s,
  Currencies: t,
  Users: r
}) {
  try {
    const {
      threadID: s,
      messageID: r,
      senderID: i
    } = a;
    (new Date).getDay();
    (await t.getData(i)).money;
    if (!n[0]) {
      let n = (await axios.get("https://i.imgur.com/1TMSUf3.jpg", {
        responseType: "stream"
      })).data;
      return e.sendMessage({
        body: "=====[ 𝐒𝐡𝐨𝐩𝐌𝐢𝐧𝐞 ]=====\n[ 1 ] Đăng Ký\n[ 2 ] Mua Cúp\n[ 3 ] Đi Đào Đá\n[ 4 ] Nâng cấp cúp\n[ 5 ] Sữa Vũ Khí / Cúp\n[ 6 ] Mua Vũ Khí\n[ 7 ] Đi Vượt Dungeon\n\n[ ❖ ] => Hãy Trả Lời Tin Nhắn Để Chọn !",
        attachment: n
      }, a.threadID, ((e, n) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: n.messageID,
          author: a.senderID,
          type: "shop"
        })
      }), a.messageID)
    }
  } catch (e) {
    console.log(e)
  }
}, module.exports.handleReply = async function({
  api: e,
  event: a,
  client: n,
  handleReply: s,
  Currencies: t,
  Users: r
}) {
  Math.floor(3e4 * Math.random());
  const i = (await t.getData(a.senderID)).money,
    d = (await r.getData(a.senderID)).name;
  if ("1" == a.body) var c = 500;
  else if ("2" == a.body) c = 1000;
  else if ("3" == a.body) c = 2000;
  else if ("4" == a.body) c = 1500;
  else if ("5" == a.body) c = 4000;
  switch (s.type) {
    case "shop":
      switch (a.body) {
        case "1": {
          const n = await axios.get(`https://project-mine.hbaoluvhue.repl.co/register?type=register&uid=${a.senderID}&name=${encodeURIComponent(d)}`);
          return e.sendMessage(`${n.data.msg}`, a.threadID, a.messageID)
        }
        case "2": {
          const n = (await axios.get(`https://project-mine.hbaoluvhue.repl.co/shoppickaxe?type=list&uid=${a.senderID}`)).data;
          var h = [],
            o = 1;
          for (const e in n) h.push(`${o}. ${n[e].name}: ${n[e].price} Đô\nĐộ bền: ${n[e].duribility}\n\n`), o++;
          var g = [];
          for (o = 0; o < 5; o++) {
            let e = (await axios.get(`${n[o].images}`, {
              responseType: "stream"
            })).data;
            g.push(e)
          }
          return e.sendMessage({
            body: "[ = [ 𝐒𝐡𝐨𝐩𝐏𝐢𝐜𝐤𝐚𝐱𝐞 ] = ]\n===𝐃𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡 𝐜𝐮́𝐩===\n\n" + h.join("\n") + "\n𝐑𝐞𝐩𝐥𝐲 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐁𝐨𝐭 𝐕𝐚̀ 𝐂𝐡𝐨̣𝐧 𝐓𝐡𝐞𝐨 𝐒𝐨̂́ 𝐓𝐡𝐮̛́ 𝐓𝐮̛̣",
            attachment: g
          }, a.threadID, ((e, n) => {
            global.client.handleReply.push({
              name: this.config.name,
              messageID: n.messageID,
              author: a.senderID,
              type: "getpickaxe"
            })
          }), a.messageID)
        }
        case "3": {
          const n = await axios.get(`https://project-mine.hbaoluvhue.repl.co/mine?uid=${a.senderID}`);
          if ("repair" == n.data.msg) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Cúp của bạn đã hỏng ! Vui lòng sửa chữa!", a.threadID);
          if ("cd" == n.data.msg) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Vui lòng chờ cooldown!", a.threadID);
          if ("chuadangky" == n.data.msg) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn chưa đăng ký hệ thống", a.threadID); {
            if ("muacup" == n.data.msg) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn chưa mua cúp để đi mine", a.threadID);
            const s = n.data.name,
              r = n.data.rarity;
            n.data.images;
            await t.increaseMoney(a.senderID, parseInt(n.data.price));
            const d = parseInt(i) + parseInt(n.data.price);
            var p = () => e.sendMessage({
              body: `Bạn đã đào được : ${s}\nĐộ hiếm : ${r}\nSố tiền nhận được : ${n.data.price}\nTổng số tiền hiện tại: ${d} `,
              attachment: fs.createReadStream(__dirname + "/cache/ca.png")
            }, a.threadID, (() => fs.unlinkSync(__dirname + "/cache/ca.png")), a.messageID);
            return request(encodeURI(`${n.data.images}`)).pipe(fs.createWriteStream(__dirname + "/cache/ca.png")).on("close", (() => p()))
          }
        }
        case "4":
          if (i < 1e3) e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn không đủ tiền để nâng cấp", a.threadID);
          else {
            const n = await axios.get(`https://project-mine.hbaoluvhue.repl.co/upgrade?uid=${a.senderID}`, a.threadID);
            if ("false" == n.data.msg) e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn chưa mua cúp ! Không thể nâng cấp", a.threadID);
            else if ("max" == n.data.msg) e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Cúp của bạn đã đạt cấp tối đa", a.threadID);
            else {
              if ("chuadangky" != n.data.msg) return await t.decreaseMoney(a.senderID, parseInt(1e3)), e.sendMessage(`${n.data.msg}\nSố tiền bị trừ : 1000`, a.threadID);
              e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn chưa đăng ký hệ thống", a.threadID)
            }
          }
          break;
        case "5":
          return e.sendMessage("1.Sửa Cúp \n2.Sửa Vũ Khí", a.threadID, ((e, n) => {
            global.client.handleReply.push({
              name: this.config.name,
              messageID: n.messageID,
              author: a.senderID,
              type: "repair"
            })
          }), a.messageID);
        case "6": {
          const n = await axios.get(`https://project-mine.hbaoluvhue.repl.co/weapons?uid=${a.senderID}&type=list`);
          var m = [];
          o = 1;
          for (const e in n.data) m.push(`${o}.${n.data[e].name}\nĐộ bền : ${n.data[e].duribility}\nSố tiền : ${n.data[e].price}\n`), o++;
          var u = [];
          for (o = 0; o < 5; o++) {
            let e = (await axios.get(`${n.data[o].images}`, {
              responseType: "stream"
            })).data;
            u.push(e)
          }
          return e.sendMessage({
            body: "[ = [ 𝐒𝐡𝐨𝐩𝐖𝐞𝐚𝐩𝐨𝐧𝐬 ] = ]\n======\n𝐃𝐚𝐧𝐡 𝐒𝐚́𝐜𝐡 𝐖𝐞𝐚𝐩𝐨𝐧𝐬\n" + m.join("\n") + "\n𝐑𝐞𝐩𝐥𝐲 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐁𝐨𝐭 𝐕𝐚̀ 𝐂𝐡𝐨̣𝐧 𝐓𝐡𝐞𝐨 𝐒𝐨̂́ 𝐓𝐡𝐮̛́ 𝐓𝐮̛̣",
            attachment: u
          }, a.threadID, ((e, n) => {
            global.client.handleReply.push({
              name: this.config.name,
              messageID: n.messageID,
              author: a.senderID,
              type: "weapons"
            })
          }), a.messageID)
        }
        case "7": {
          const n = (await t.getData(a.senderID)).money,
            s = await axios.get(`https://project-mine.hbaoluvhue.repl.co/dungeon?uid=${a.senderID}`);
          if ("chuadangky" == s.data.msg) return e.sendMessage("[ 𝑀𝑖𝑟𝑎𝑖𝑀𝑖𝑛𝑒 ] - Bạn chưa đăng ký hệ thống", a.threadID); {
            const r = s.data.damage,
              d = s.data.hp,
              c = s.data.msg;
            s.data.images;
            if ("die" == s.data.msg) return i < 2000 ? e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐃𝐮𝐧𝐠𝐞𝐨𝐧 ] - Số Dư Của Bạn Không Đủ Đề Hồi Sinh ! Vui lòng kiếm đủ 2000$ để hồi sinh", a.threadID) : (await t.decreaseMoney(a.senderID, 2e3), e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐃𝐮𝐧𝐠𝐞𝐨𝐧 ] - Bạn đã chết ! Hệ Thống Sẽ Tự Động Hồi Sinh Với Cái Gía Là 2000$", a.threadID));
            if ("repair" == s.data.msg) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐃𝐮𝐧𝐠𝐞𝐨𝐧 ] - Kiếm của bạn đã hỏng ! Vui lòng sửa chữa", a.threadID);
            if ("false" == s.data.msg) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐃𝐮𝐧𝐠𝐞𝐨𝐧 ] - Bạn chưa mua kiếm ! Không thể đi dungeon", a.threadID); {
              await t.increaseMoney(a.senderID, parseInt(s.data.price));
              const i = parseInt(n) + parseInt(s.data.price);
              p = () => e.sendMessage({
                body: `${c}\n${r}\n${d}\nSố tiền nhận được : ${s.data.price}\nTổng số tiền hiện tại: ${i} `,
                attachment: fs.createReadStream(__dirname + "/cache/ca.png")
              }, a.threadID, (() => fs.unlinkSync(__dirname + "/cache/ca.png")), a.messageID);
              return request(encodeURI(`${s.data.images}`)).pipe(fs.createWriteStream(__dirname + "/cache/ca.png")).on("close", (() => p()))
            }
          }
        }
      }
      break;
    case "getpickaxe":
      if (a.body == a.body) {
        if (i < c) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn không đủ tiền để mua cúp", a.threadID); {
          const n = await axios.get(`https://project-mine.hbaoluvhue.repl.co/shoppickaxe?buy=${a.body}&uid=${a.senderID}`);
          if ("false" == n.data.data) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn chưa đăng ký hệ thống", a.threadID);
          if ("max" == n.data.msg) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn chỉ có thể mua 1 cúp", a.threadID);
          await t.decreaseMoney(a.senderID, c);
          p = () => e.sendMessage({
            body: `${n.data.msg}`,
            attachment: fs.createReadStream(__dirname + "/cache/pickaxe.png")
          }, a.threadID, (() => fs.unlinkSync(__dirname + "/cache/pickaxe.png")), a.messageID);
          return request(encodeURI(`${n.data.images}`)).pipe(fs.createWriteStream(__dirname + "/cache/pickaxe.png")).on("close", (() => p()))
        }
      }
      break;
    case "repair":
      if (a.body == a.body) {
        if (i < 2000) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ]Bạn chưa đủ tiền để nâng cấp\nSố tiền : 2000$", a.threadID); {
          const n = await axios.get(`https://project-mine.hbaoluvhue.repl.co/repair?uid=${a.senderID}&type=${a.body}`);
          "1" == a.body && ("false" == n.data.msg ? e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] -Bạn chưa mua cúp ! Không thể sửa chữa", a.threadID) : (await t.decreaseMoney(a.senderID, 2e3), e.sendMessage(`[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - ${n.data.msg}`, a.threadID))), "2" == a.body && ("false" == n.data.msg ? e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn chưa mua kiếm ! Không thể sửa chữa", a.threadID) : (await t.decreaseMoney(a.senderID, 2e3), e.sendMessage(`[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - ${n.data.msg}`, a.threadID)))
        }
      }
      break;
    case "weapons":
      if (a.body == a.body) {
        if (i < c) return e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn không đủ tiền để mua cúp", a.threadID); {
          const n = await axios.get(`https://project-mine.hbaoluvhue.repl.co/weapons?buy=${a.body}&uid=${a.senderID}`);
          if ("max" == n.data.msg) e.sendMessage("Chỉ dc mua tối đa 1 kiếm\nBạn có thể nâng cấp kiếm", a.threadID);
          else {
            if ("chuadangky" != n.data.msg) {
              await t.decreaseMoney(a.senderID, c);
              p = () => e.sendMessage({
                body: `${n.data.msg}`,
                attachment: fs.createReadStream(__dirname + "/cache/weapons.png")
              }, a.threadID, (() => fs.unlinkSync(__dirname + "/cache/weapons.png")), a.messageID);
              return request(encodeURI(`${n.data.images}`)).pipe(fs.createWriteStream(__dirname + "/cache/weapons.png")).on("close", (() => p()))
            }
            e.sendMessage("[ 𝐌𝐢𝐫𝐚𝐢𝐌𝐢𝐧𝐞 ] - Bạn chưa đăng ký hệ thống", a.threadID)
          }
        }
      }
  }
}
