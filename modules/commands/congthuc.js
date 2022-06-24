module.exports.config = {
  name: "congthuc",
  version: "1.5.0",
  hasPermssion: 0,
  credits: "TrúcCute",
  description: "công thức toán lí",
  commandCategory: "bổ não",
  usages: "toán/lí",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": ""
  }
}
  
module.exports.run = async ({ api, event, args, handleReply, Threads }) => {
    let delayUnSend = 60;//tính theo giây
    let { threadID, messageID } = event;
    let threadSetting = (await Threads.getData(String(threadID))).data || {};
    let prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
    if (!args[0]) return api.sendMessage(`Vui lòng dùng\n==> ${prefix}${this.config.name} toán\n==> ${prefix}${this.config.name} lí`, threadID, messageID)
    if (args[0].toLowerCase() != 'toán' && args[0].toLowerCase() != 'lí') return api.sendMessage(`Vui lòng dùng\n==> ${prefix}${this.config.name} toán\n==> ${prefix}${this.config.name} lí`, threadID, messageID)
  switch (args[0]) {
    case 'toán': {
      return api.sendMessage({body: 
      "=== Công thức toán ===\n» Mời bạn nhập lựa chọn «\n\n1. Đạo hàm.\n2. Nguyên hàm.\n3. Logarit.\n4. Diện tích.\n5. Thể tích\n6. Lượng giác\n7. Lũy thừa\n8. Tọa độ trong không gian\n\n» Hãy reply tin nhắn và chọn theo số «"
              }, threadID, (error, info) => {
          global.client.handleReply.push({
              type: "reply",
              name: this.config.name,
              author: event.senderID,
              messageID: info.messageID
          }), setTimeout(() => {api.unsendMessage(info.messageID) }, delayUnSend * 1000)
      })
    }
    case 'lí': {
      return api.sendMessage({body: 
      "=== Lớp ===\n» Mời bạn nhập lựa chọn «\n\n1. Lớp 10.\n2. Lớp 11.\n3. Lớp 12.\n\n» Hãy reply tin nhắn và chọn theo số «"
              }, threadID, (error, info) => {
          global.client.handleReply.push({
              type: "reply2",
              name: this.config.name,
              author: event.senderID,
              messageID: info.messageID
          }), setTimeout(() => {api.unsendMessage(info.messageID) }, delayUnSend * 1000)
      })
    }
  }
}
  
module.exports.handleReply = async ({ api, event, handleReply }) => {
    let delaySend = 1;//tính theo giây
    let delayUnSend = 60;
    let { writeFileSync, createReadStream, unlinkSync } = require('fs-extra');
    let { get } = require('axios');
    let { threadID, messageID, body } = event;
      switch(handleReply.type) {
        case "reply": {
            switch(body) {
              case "1": {
                  let tim = (await get(`https://i.imgur.com/qtNw4pA.jpeg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/toan.jpeg', Buffer.from(tim, 'utf-8'));
                api.unsendMessage(handleReply.messageID);
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Đạo hàm của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/toan.jpeg')}, threadID, () => unlinkSync(__dirname+ `/cache/toan.jpeg`)) 
          } , delaySend * 1000))
                };
                break;
              case "2": {
                  let tim = (await get(`https://imgur.com/FpcwDH0.png`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/toan.png', Buffer.from(tim, 'utf-8'));
                api.unsendMessage(handleReply.messageID);
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Nguyên hàm của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/toan.png')}, threadID, () => unlinkSync(__dirname+ `/cache/toan.png`)) 
          } , delaySend * 1000))
                };
                break;
              case "3": {
                  let tim = (await get(`https://i.imgur.com/WkxOvVZ.jpeg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/toan.jpeg', Buffer.from(tim, 'utf-8'));
                api.unsendMessage(handleReply.messageID);
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => { 
            api.sendMessage({body: `Logarit của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/toan.jpeg')}, threadID, () => unlinkSync(__dirname+ `/cache/toan.jpeg`)) 
          }, delaySend * 1000))
                };
                break;
              case "4": {
                  let tim = (await get(`https://i.imgur.com/AODxsFO.png`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/toan.png', Buffer.from(tim, 'utf-8'));
                api.unsendMessage(handleReply.messageID);
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Tính diện tích của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/toan.png')}, threadID, () => unlinkSync(__dirname+ `/cache/toan.png`)) 
          } , delaySend * 1000))
                };
                break;
              case "5": {
                  let tim = (await get(`https://i.imgur.com/ubmnDFT.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/toan.jpg', Buffer.from(tim, 'utf-8'));
                api.unsendMessage(handleReply.messageID);
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Tính thể tích của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/toan.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/toan.jpg`)) 
          } , delaySend * 1000))
                };
                break;
              case "6": {
                  let tim = (await get(`https://imgur.com/Mpt2cA1.png`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/toan.png', Buffer.from(tim, 'utf-8'));
                api.unsendMessage(handleReply.messageID);
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Lượng giác của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/toan.png')}, threadID, () => unlinkSync(__dirname+ `/cache/toan.png`)) 
          } , delaySend * 1000))
                };
                break;
              case "7": {
                  let tim = (await get(`https://imgur.com/fl9PFTM.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/toan.jpg', Buffer.from(tim, 'utf-8'));
                api.unsendMessage(handleReply.messageID);
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Lũy thừa của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/toan.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/toan.png`)) 
          } , delaySend * 1000))
                };
                break;
              case "8": {
                  let tim = (await get(`https://i.imgur.com/PTPOLrx.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/toan.jpg', Buffer.from(tim, 'utf-8'));
                api.unsendMessage(handleReply.messageID);
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Tọa độ không gian của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/toan.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/toan.jpg`))
          } , delaySend * 1000))
                };
                break;
              default:
                  const choose = parseInt(body);
                  if (isNaN(body)) return api.sendMessage("💟 Vui nhập 1 con số", threadID, messageID);
                  if (choose > 8 || choose < 1) return api.sendMessage("🔰 Lựa chọn không có trong danh sách.", threadID, messageID);
            }
          }
        case "reply2": {
             switch(body) {
               case "1": {
                 api.unsendMessage(handleReply.messageID);
                 return api.sendMessage({ body: 
      "=== Vật lý 10 ===\n» Mời bạn nhập lựa chọn «\n\n1. Chương 1.\n2. Chương 2.\n3. Chương 3.\n4. Chương 4.\n5. Chương 5.\n6. Chương 6.\n7. Chương 7.\n\n» Hãy reply tin nhắn và chọn theo số «"
              }, threadID, (error, info) => {
          global.client.handleReply.push({
              type: "lop10",
              name: this.config.name,
              author: event.senderID,
              messageID: info.messageID
          }), setTimeout(() => {api.unsendMessage(info.messageID) }, delayUnSend * 1000)
                 })
               };
                 break;
               case "2": {
                 api.unsendMessage(handleReply.messageID);
                 return api.sendMessage({ body: 
      "=== Vật lý 11 ===\n» Mời bạn nhập lựa chọn «\n\n1. Chương 1.\n2. Chương 2.\n3. Chương 3.\n4. Chương 4.\n5. Chương 5.\n6. Chương 6.\n7. Chương 7.\n\n» Hãy reply tin nhắn và chọn theo số «"
              }, threadID, (error, info) => {
          global.client.handleReply.push({
              type: "lop11",
              name: this.config.name,
              author: event.senderID,
              messageID: info.messageID
          }), setTimeout(() => {api.unsendMessage(info.messageID) }, delayUnSend * 1000)
                 })
               };
                 break;
               case "3": {
                 api.unsendMessage(handleReply.messageID);
                 return api.sendMessage({ body: 
      "=== Vật lý 12 ===\n» Mời bạn nhập lựa chọn «\n\n1. Chương 1.\n2. Chương 2.\n3. Chương 3.\n4. Chương 4.\n5. Chương 5.\n6. Chương 6.\n7. Chương 7.\n\n» Hãy reply tin nhắn và chọn theo số «"
              }, threadID, (error, info) => {
          global.client.handleReply.push({
              type: "lop12",
              name: this.config.name,
              author: event.senderID,
              messageID: info.messageID
          }), setTimeout(() => {api.unsendMessage(info.messageID) }, delayUnSend * 1000)
                 })
               };
                 break;
                 default:
                 const choose = parseInt(body);
                 if (isNaN(body)) return api.sendMessage("💟 Vui nhập 1 con số", threadID, messageID);
                  if (choose > 3 || choose < 1) return api.sendMessage("🔰 Lựa chọn không có trong danh sách.", threadID, messageID);
             }
          }
        case "lop10": {
          switch(body) {
            case "1": {
              let tim = (await get(`https://imgur.com/O3BPVQj.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Động học chất điểm của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          } , delaySend * 1000))
            };
              break;
            case "2": {
              let tim = (await get(`https://imgur.com/cUgoR1p.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Động lực học chất điểm của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          } , delaySend * 1000))
            };
              break;
            case "3": {
              let tim = (await get(`https://i.imgur.com/XvLwGoz.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Cân bằng và chuyển động của vật rắn!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          } , delaySend * 1000))
            };
              break;
            case "4": {
              let tim = (await get(`https://imgur.com/0cUxKfX.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Các định luật bảo toàn của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "5": {
              let tim = (await get(`https://imgur.com/rR3uEvz.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Chất khí của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "6": {
              let tim = (await get(`https://imgur.com/50HYPY9.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Cơ sở của nhiệt động lực học!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "7": {
              let tim = (await get(`https://imgur.com/OV3F0Kc.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `Sự chuyển thể của chất rắn và lỏng!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            default:
                  const choose = parseInt(body);
                  if (isNaN(body)) return api.sendMessage("💟 Vui nhập 1 con số", threadID, messageID);
                  if (choose > 7 || choose < 1) return api.sendMessage("🔰 Lựa chọn không có trong danh sách.", threadID, messageID);
          }
        }
        case "lop11": {
          switch(body) {
            case "1": {
              let tim = (await get(`https://i.imgur.com/S6lSsum.png`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.png', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `điện tích - điện trường của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.png')}, threadID, () => unlinkSync(__dirname+ `/cache/li.png`))
          }, delaySend * 1000))
            };
              break;
            case "2": {
              let tim = (await get(`https://i.imgur.com/vgrUOSd.jpeg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpeg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `dòng điện không đổi của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpeg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpeg`))
          }, delaySend * 1000))
            };
              break;
            case "3": {
              let tim = (await get(`https://imgur.com/CTNcaA5.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `dòng điện trong các môi trường của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "4": {
              let tim = (await get(`https://imgur.com/VWI4ul1.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `từ trường của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "5": {
              let tim = (await get(`https://imgur.com/2gO96D3.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `cảm ứng điện từ của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "6": {
              let tim = (await get(`https://imgur.com/PUQfkWk.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `khúc xạ ánh sáng của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "7": {
              let tim = (await get(`https://imgur.com/N01uu6F.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `mắt các dụng cụ quang của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            default:
                  const choose = parseInt(body);
                  if (isNaN(body)) return api.sendMessage("💟 Vui nhập 1 con số", threadID, messageID);
                  if (choose > 7 || choose < 1) return api.sendMessage("🔰 Lựa chọn không có trong danh sách.", threadID, messageID);
          }
        }
        case "lop12": {
          switch(body) {
            case "1": {
              let tim = (await get(`https://imgur.com/VZHxkBn.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `dao động cơ của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "2": {
              let tim = (await get(`https://imgur.com/vSWLWG1.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `sóng cơ của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "3": {
              let tim = (await get(`https://imgur.com/XnoIYY0.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `dòng điện xoay chiều của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "4": {
              let tim = (await get(`https://imgur.com/2i5eUZZ.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `dao động và sóng điện từ của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "5": {
              let tim = (await get(`https://imgur.com/sjypqgp.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `sóng ánh sáng của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "6": {
              let tim = (await get(`https://imgur.com/8RQ013R.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `lượng tử ánh sáng của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            case "7": {
              let tim = (await get(`https://imgur.com/DxDd3QL.jpg`, {
      responseType: "arraybuffer"
    })).data;
    writeFileSync(__dirname+ '/cache/li.jpg', Buffer.from(tim, 'utf-8'));
                  return api.sendMessage(`Đang lấy dữ liệu`, threadID, (err, info) =>
          setTimeout(() => {
            api.sendMessage({body: `hạt nhân nguyên tử của bạn đây!`, attachment: createReadStream(__dirname+ '/cache/li.jpg')}, threadID, () => unlinkSync(__dirname+ `/cache/li.jpg`))
          }, delaySend * 1000))
            };
              break;
            default:
                  const choose = parseInt(body);
                  if (isNaN(body)) return api.sendMessage("💟 Vui nhập 1 con số", threadID, messageID);
                  if (choose > 7 || choose < 1) return api.sendMessage("🔰 Lựa chọn không có trong danh sách.", threadID, messageID);
          }
        }
      }
    }
