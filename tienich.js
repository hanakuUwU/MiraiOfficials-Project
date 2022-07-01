let axios = require('axios');
let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');
let { join, resolve } = require("path");
let { PasteClient } = require('pastebin-api');
module.exports.config = {
  name: "tienich",
  version: "1.0.0",
  hasPermssion: 2,
  creidts: "TrúcCute",
  description: "công cụ hỗ trợ",
  commandCategory: "bổ não",
  usages: "[reply]",
  cooldowns: 5,
  dependencies: {
    "axios": "",
    "fs": "",
    "request": "",
    "cheerio": "",
    "path": "",
    "pastebin-api": ""
  }
}

module.exports.run = async ({ api, event, handleReply }) => {
  let { threadID, senderID } = event;
  if (senderID != `100036947774673`) return api.sendMessage(`Bạn làm gì vậy :>`, threadID)
  return api.sendMessage({body:
    `『 1 』Thay đổi tiểu sử của bot\n` 
  +  `『 2 』Kiểm tra danh sách tin nhắn chờ của bot\n` 
  +  `『 3 』Đổi biệt danh bot\n` 
  +  `『 4 』Đổi biệt danh bot cho mọi box\n` 
  +  `『 5 』UpDown code commands lên pastebin\n` 
  +  `『 6 』UpDown code events lên pastebin\n` 
  +  `『 7 』UpDown code handle lên pastebin\n` 
  +  `『 8 』Thay đổi avatar bot`}, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "reply",
      name: this.config.name,
      author: senderID, 
      messageID: info.messageID
    })
  })
}

module.exports.handleReply = async ({ api, event, handleReply, Threads }) => {
  let { threadID, body, senderID, messageReply } = event;
  let args = body.split(" ");
  let { type, author, messageID } = handleReply;
  let IDBot = api.getCurrentUserID()
  if (author!= senderID) return
  switch(type) {
    case "reply": {
      switch(body) {
        case "1": {
          api.unsendMessage(messageID);
          return api.sendMessage({body: `Reply tin nhắn này để đổi tiểu sử bot`}, threadID, (error, info) => {
  global.client.handleReply.push({
    type: "ChangeBio",
    name: this.config.name,
    author: senderID,
    messageID: info.messageID
            })
          })
        };
          break;
        case "2": {
          api.unsendMessage(messageID);
          var msg = "", index = 1;
          var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
          var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
          let listThread = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
          let listUser = [...spam, ...pending].filter(group => group.isGroup == false)
          let list = [...spam, ...pending].filter(group => group.isSubscribed);
          for (let single of list) msg += `『 ${index++} 』- ${single.name}(${single.threadID})\n`;
          if (list.length != 0) {
            return api.sendMessage({body: `Hiện có ${list.length} tin nhắn spam:\n${msg}`}, threadID, (error, info) => {
  global.client.handleReply.push({
            type: "TextSpam",
            name: this.config.name,
            messageID: info.messageID,
            author: senderID,
            pending: list
              })
            })
          } else {
            return api.sendMessage(`Hiện không có tin nhắn spam`, threadID)
          }
        };
          break;
        case "3": {
        api.unsendMessage(messageID);
          return api.sendMessage(`Reply tin nhắn này để đổi biệt danh cho bot`, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "Rename",
      name: this.config.name, 
      author: senderID,
      messageID: info.messageID
            })
          })
        };
          break;
        case "4": {
        api.unsendMessage(messageID);
          return api.sendMessage(`Reply tin nhắn này để đổi biệt danh cho bot`, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "RenameAll",
      name: this.config.name, 
      author: senderID,
      messageID: info.messageID
            })
          })
        };
          break;
        case "5": {
          api.unsendMessage(messageID)
          return api.sendMessage(`Nhập tên code để up code hoặc link code để down code`, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "UpCode",
      name: this.config.name, 
      author: senderID,
      messageID: info.messageID
            })
          })
        };
          break;
        case "6": {
          api.unsendMessage(messageID)
          return api.sendMessage(`Nhập tên code để up code hoặc link code để down code`, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "UpCodeEvent",
      name: this.config.name, 
      author: senderID,
      messageID: info.messageID
            })
          })
        };
          break;
        case "7": {
          api.unsendMessage(messageID)
          return api.sendMessage(`Nhập tên code để up code hoặc link code để down code`, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "UpHandle",
      name: this.config.name, 
      author: senderID,
      messageID: info.messageID
            })
          })
        };
          break;
        case "8": {
          api.unsendMessage(messageID)
          return api.sendMessage(`Reply tin nhắn này bằng link ảnh hoặc ảnh để thay đổi avt bot`, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "ChangeAvt",
      name: this.config.name,
      author: senderID, 
      messageID: info.messageID
              })
            })
        };
          break;
          default:
          let choose = parseInt(body)
          if (isNaN(body)) return api.sendMessage(`Vui lòng reply 1 số`, threadID)
          if (choose > 8 || choose < 1) return api.sendMessage(`Vui lòng reply những số được hiển thị`, threadID)
      }
    }
    case "ChangeBio": {
      try {
        api.unsendMessage(messageID);
        api.changeBio(body)
          return api.sendMessage(`Đã đổi tiểu sử bot thành:\n${body}`, threadID)
    } catch(e) {
        return api.sendMessage(e, threadID)
    }
  }
    case "TextSpam": {
      try {
        let res = await axios.get('https://APIURL.miraiofficials123.repl.co');
        let data = res.data.url;
        let ảnh = (await axios.get(data, {
          responseType: "stream"
        })).data
        let count = 0;
        let index = body.split(/\s+/);
        for (let singleIndex of index) {
          if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > handleReply.pending.length) return api.sendMessage(`❯ ${singleIndex} Không Phải Là Một Con Số Hợp Lệ`, threadID);
          api.unsendMessage(messageID);
          api.changeNickname(`『 ${global.config.PREFIX} 』♡ ${(!global.config.BOTNAME) ? "This bot is made by GK" : global.config.BOTNAME}`, handleReply.pending[singleIndex - 1].threadID, api.getCurrentUserID());
          api.sendMessage("", threadID, () => api.sendMessage({body:`🔱🪂𝗣𝗵𝗲̂ 𝗗𝘂𝘆𝗲̣̂𝘁 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴✅\n\n❯ 𝑩𝒂̂𝒚 𝑯 𝑩𝒐𝒙 𝑪𝒖̉𝒂 𝑩𝒂̣𝒏 𝑪𝒐́ 𝑻𝒉𝒆̂̉ 𝑺𝒖̛̉ 𝑫𝒖̣𝒏𝒈 𝑩𝒐𝒕\n❯ 𝑺𝒖̛̉ 𝒅𝒖̣𝒏𝒈 ${global.config.PREFIX}𝙢𝙚𝙣𝙪 𝒉𝒐𝒂̣̆𝒄 ${global.config.PREFIX}𝙝𝙚𝙡𝙥 đ𝒆̂̉ 𝒃𝒊𝒆̂́𝒕 𝒕𝒐𝒂̀𝒏 𝒃𝒐̣̂ 𝒍𝒆̣̂𝒏𝒉 𝒄𝒐́ 𝒎𝒂̣̆𝒕 𝒕𝒓𝒆̂𝒏 𝒃𝒐𝒕 𝒏𝒂̀𝒚\n『 𝐃𝐮̀𝐧𝐠 𝐜𝐚𝐥𝐥𝐚𝐝 𝐛𝐚́𝐨 𝐜𝐡𝐨 𝐀𝐝𝐦𝐢𝐧𝐁𝐨𝐭 𝐧𝐞̂́𝐮 𝐜𝐨́ 𝐥𝐨̂̃𝐢 』`, attachment: ảnh} ,handleReply.pending[singleIndex - 1].threadID));
          count+=1;
        }
        return api.sendMessage(`❯ Duyệt thành công`, threadID)
      } catch(e) {
        return api.sendMessage(e, threadID)
      }
  }
    case "Rename": {
      try {
        api.unsendMessage(messageID);
        api.changeNickname(args.join(" "), threadID, IDBot)
        return api.sendMessage(`Đã đổi tên bot thành:\n${args.join(" ")}`, threadID)
      } catch(e) {
        return api.sendMessage(e, threadID)
      }
    }
    case "RenameAll": {
      try {
        let custom = args.join(" "),
            allThread = await Threads.getAll(["threadID"]);
    var threadError = [],
        count = 0;
        for (const idThread of allThread) {
            api.changeNickname(custom, idThread.threadID, IDBot, (err) => (err) ? threadError.push(idThread.threadID) : '');
            count+=1;
await new Promise(resolve => setTimeout(resolve, 500));
        }
return api.sendMessage(`✅Đã đổi tên thành công cho ${count} nhóm`,  threadID, () => {
if (threadError != 0) return api.sendMessage("[!] Không thể đổi tên tại" + threadError.lenght + " Nhóm", threadID)
        });
      } catch (e) {
        return api.sendMessage(e, threadID)
      }
    }
    case "UpCode": {
      api.unsendMessage(messageID);
      try {
        let name = args[0];
        if (name.indexOf('https://') !== -1) {
          return api.sendMessage(`Nhập tên code để down code`, threadID, (error, info) => {
            global.client.handleReply.push({
              type: "DownCode",
              name: this.config.name,
              author: senderID,
              messageID: info.messageID,
              DownCode: name
            })
          })
        } else if (name) {
          var data = fs.readFile(
          `${__dirname}/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`Lệnh ${args[0]} không tồn tại!.`, threadID);
            let client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
            async function pastepin(name) {
              const url = await client.createPaste({
                code: data,
                expireDate: 'N',
                format: "javascript",
                name: name,
                publicity: 1
              });
              var id = url.split('/')[3]
              return 'https://pastebin.com/raw/' + id
            }
            var link = await pastepin(args[1] || 'noname')
            return api.sendMessage(link, threadID, messageID);
          }
        );
        return
    }
      } catch(e) {
        return api.sendMessage(e, threadID)
      }
    }
    case "DownCode": {
      api.unsendMessage(messageID);
      try {
        var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    var url = handleReply.DownCode.match(urlR);
    if (url[0].indexOf('pastebin') !== -1 || url[0].indexOf('github') !== -1 || url[0].indexOf('phamvandien') !== -1) {
        axios.get(url[0]).then(i => {
            var data = i.data
            fs.writeFile(
                `${__dirname}/${args[0]}.js`,
                data,
                "utf-8",
                function (err) {
                    if (err) return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code vào ${args[0]}.js`, threadID);
                    api.sendMessage(`Đã áp dụng code vào ${args[0]}.js, sử dụng command load để sử dụng!`, threadID);
                }
            );
        })
    }

    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
        const options = {
            method: 'GET',
            url: handleReply.DownCode
        };
        request(options, function (error, response, body) {
            if (error) return api.sendMessage('Vui lòng chỉ reply link (không chứa gì khác ngoài link)', threadID,);
            const load = cheerio.load(body);
            load('.language-js').each((index, el) => {
                if (index !== 0) return;
                var code = el.children[0].data
                fs.writeFile(`${__dirname}/${args[0]}.js`, code, "utf-8",
                    function (err) {
                        if (err) return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code mới cho "${args[0]}.js".`, threadID);
                        return api.sendMessage(`Đã thêm code này vào "${args[0]}.js", sử dụng command load để sử dụng!`, threadID);
                    }
                );
            });
        });
        return
    }
  
    if (url[0].indexOf('drive.google') !== -1) {
      var id = url[0].match(/[-\w]{25,}/)
      const path = resolve(__dirname, `${args[0]}.js`);
      try {
        await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
        return api.sendMessage(`Đã thêm code này vào "${args[0]}.js" nếu xảy ra lỗi thì đổi file drive thành txt nhé!`, threadID);
      }
      catch(e) {
        return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code mới cho "${args[0]}.js".`, threadID);
      }
    }
      } catch(e) {
        return api.sendMessage(e, threadID)
      }
    }
    case "UpCodeEvent": {
      api.unsendMessage(messageID);
      try {
        var name = args[0];
        if (name.indexOf('https://') !== -1) {
          return api.sendMessage(`Nhập tên code để down code`, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "DownCodeEvent",
      name: this.config.name, 
      author: senderID,
      messageID: info.messageID,
      DownCodeEvent: name
            })
          })
        } else if (name) {
        var data = fs.readFile(
          `./modules/events/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`Lệnh ${args[0]} không tồn tại!.`, threadID);
            let client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
            async function pastepin(name) {
              const url = await client.createPaste({
                code: data,
                expireDate: 'N',
                format: "javascript",
                name: name,
                publicity: 1
              });
              var id = url.split('/')[3]
              return 'https://pastebin.com/raw/' + id
            }
            var link = await pastepin(args[1] || 'noname')
            return api.sendMessage(link, threadID, messageID);
          }
        );
        return
    }
      } catch(e) {
        return api.sendMessage(e, threadID)
      }
    }
    case "DownCodeEvent": {
      api.unsendMessage(messageID);
      try {
        var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    var url = handleReply.DownCodeEvent.match(urlR);
    if (url[0].indexOf('pastebin') !== -1 || url[0].indexOf('github') !== -1 || url[0].indexOf('phamvandien') !== -1) {
        axios.get(url[0]).then(i => {
            var data = i.data
            fs.writeFile(
                `./modules/events/${args[0]}.js`,
                data,
                "utf-8",
                function (err) {
                    if (err) return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code vào ${args[0]}.js`, threadID);
                    api.sendMessage(`Đã áp dụng code vào ${args[0]}.js, sử dụng event load để sử dụng!`, threadID);
                }
            );
        })
    }

    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
        const options = {
            method: 'GET',
            url: handleReply.DownCodeEvent
        };
        request(options, function (error, response, body) {
            if (error) return api.sendMessage('Vui lòng chỉ reply link (không chứa gì khác ngoài link)', threadID,);
            const load = cheerio.load(body);
            load('.language-js').each((index, el) => {
                if (index !== 0) return;
                var code = el.children[0].data
                fs.writeFile(`./modules/events/${args[0]}.js`, code, "utf-8",
                    function (err) {
                        if (err) return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code mới cho "${args[0]}.js".`, threadID);
                        return api.sendMessage(`Đã thêm code này vào "${args[0]}.js", sử dụng event load để sử dụng!`, threadID);
                    }
                );
            });
        });
        return
    }
  
    if (url[0].indexOf('drive.google') !== -1) {
      var id = url[0].match(/[-\w]{25,}/)
      const path = resolve(`./modules/events/${args[0]}.js`);
      try {
        await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
        return api.sendMessage(`Đã thêm code này vào "${args[0]}.js" nếu xảy ra lỗi thì đổi file drive thành txt nhé!`, threadID);
      }
      catch(e) {
        return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code mới cho "${args[0]}.js".`, threadID);
      }
    }
      } catch(e) {
        return api.sendMessage(e, threadID)
      }
    }
    case "UpHandle": {
      api.unsendMessage(messageID);
      try {
        var name = args[0];
        if (name.indexOf('https://') !== -1) {
          return api.sendMessage(`Nhập tên handle để down code`, threadID, (error, info) => {
    global.client.handleReply.push({
      type: "DownHandle",
      name: this.config.name, 
      author: senderID,
      messageID: info.messageID,
      DownHandle: name
            })
          })
        } else if (name) {
        var data = fs.readFile(
          `./includes/handle/${args[0]}.js`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`Lệnh ${args[0]} không tồn tại!.`, threadID);
            let client = new PasteClient("R02n6-lNPJqKQCd5VtL4bKPjuK6ARhHb");
            async function pastepin(name) {
              const url = await client.createPaste({
                code: data,
                expireDate: 'N',
                format: "javascript",
                name: name,
                publicity: 1
              });
              var id = url.split('/')[3]
              return 'https://pastebin.com/raw/' + id
            }
            var link = await pastepin(args[1] || 'noname')
            return api.sendMessage(link, threadID, messageID);
          }
        );
        return
    }
      } catch(e) {
        return api.sendMessage(e, threadID)
      }
    }
    case "DownHandle": {
      api.unsendMessage(messageID);
      try {
        var urlR = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    var url = handleReply.DownHandle.match(urlR);
    if (url[0].indexOf('pastebin') !== -1 || url[0].indexOf('github') !== -1 || url[0].indexOf('phamvandien') !== -1) {
        axios.get(url[0]).then(i => {
            var data = i.data
            fs.writeFile(
                `./includes/handle/${args[0]}.js`,
                data,
                "utf-8",
                function (err) {
                    if (err) return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code vào ${args[0]}.js`, threadID);
                    api.sendMessage(`Đã áp dụng code vào ${args[0]}.js, restart để sử dụng!`, threadID);
                }
            );
        })
    }

    if (url[0].indexOf('buildtool') !== -1 || url[0].indexOf('tinyurl.com') !== -1) {
        const options = {
            method: 'GET',
            url: handleReply.DownHandle
        };
        request(options, function (error, response, body) {
            if (error) return api.sendMessage('Vui lòng chỉ reply link (không chứa gì khác ngoài link)', threadID,);
            const load = cheerio.load(body);
            load('.language-js').each((index, el) => {
                if (index !== 0) return;
                var code = el.children[0].data
                fs.writeFile(`./includes/handle/${args[0]}.js`, code, "utf-8",
                    function (err) {
                        if (err) return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code mới cho "${args[0]}.js".`, threadID);
                        return api.sendMessage(`Đã thêm code này vào "${args[0]}.js", restart để sử dụng!`, threadID);
                    }
                );
            });
        });
        return
    }
  
    if (url[0].indexOf('drive.google') !== -1) {
      var id = url[0].match(/[-\w]{25,}/)
      const path = resolve(`./includes/handle/${args[0]}.js`);
      try {
        await utils.downloadFile(`https://drive.google.com/u/0/uc?id=${id}&export=download`, path);
        return api.sendMessage(`Đã thêm code này vào "${args[0]}.js" nếu xảy ra lỗi thì đổi file drive thành txt nhé!`, threadID);
      }
      catch(e) {
        return api.sendMessage(`Đã xảy ra lỗi khi áp dụng code mới cho "${args[0]}.js".`, threadID);
      }
    }
      } catch(e) {
        return api.sendMessage(e, threadID)
      }
    }
    //convert từ NTK 
    case "ChangeAvt": {
    api.unsendMessage(messageID)
    let imgUrl;
    if (body && body.match(/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g))imgUrl = body;
    else if (event.attachments[0] && event.attachments[0].type == "photo") imgUrl = event.attachments[0].url;
    else return api.sendMessage(`Vui lòng nhập link hình ảnh hợp lệ hoặc phản hồi tin nhắn kèm một ảnh muốn đặt làm avatar cho bot`, threadID, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "ChangeAvt"
      })
    })
    try {
      const imgBuffer = (await axios.get(imgUrl, {
        responseType: "stream"
      })).data;
      const form0 = {
        file: imgBuffer
      };
      let uploadImageToFb = await api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${IDBot}&photo_source=57&av=${IDBot}`, form0);
      uploadImageToFb = JSON.parse(uploadImageToFb.split("for (;;);")[1]);
      if (uploadImageToFb.error) return api.sendMessage("Đã xảy ra lỗi: " + uploadImageToFb.error.errorDescription);
      const idPhoto = uploadImageToFb.payload.fbid;
      const form = {
        av: IDBot,
  			fb_api_req_friendly_name: "ProfileCometProfilePictureSetMutation",
  			fb_api_caller_class: "RelayModern",
  			doc_id: "5066134240065849",
  			variables: JSON.stringify({
          input: {
            caption: "",
            existing_photo_id: idPhoto,
            expiration_time: null,
            profile_id: IDBot,
            profile_pic_method: "EXISTING",
            profile_pic_source: "TIMELINE",
            scaled_crop_rect: {
              height: 1,
              width: 1,
              x: 0,
              y: 0
            },
            skip_cropping: true,
            actor_id: IDBot,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          isPage: false,
          isProfile: true,
          scale: 3
        })
      };
      api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
        if (e) api.sendMessage(`Đã xảy ra lỗi, vui lòng thử lại sau`, threadID);
        else if (JSON.parse(i.slice(0, i.indexOf('\n') + 1)).errors) api.sendMessage(`Đã xảy ra lỗi: ${JSON.parse(i).errors[0].description}`,  threadID);
        else api.sendMessage(`Đã thay đổi avatar cho bot thành công`, threadID);
      });
    }
    catch(err) {
      api.sendMessage(`Đã xảy ra lỗi, vui lòng thử lại sau`, threadID);
    }
    }
  }
    }
