module.exports.config = {
  name: "ghepdoi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hungcho",
  description: "Ghep doi ngau nhien có đổi tên",
  commandCategory: "roleplay",
  usages: "ghepdoi",
  cooldowns: 0,
  dependencies: {}
};

module.exports.run = async function({ api, event, Users, Currencies }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        var data = await Currencies.getData(event.senderID);
        var money = data.money
        if( money < 50) api.sendMessage("💕 𝐌𝐮𝐨̂́𝐧 𝐠𝐡𝐞́𝐩 𝐝𝐨̂𝐢 𝐩𝐡𝐚̉𝐢 𝐜𝐨́ 𝟓𝟎𝐊 𝐓𝐡𝐢̀ 𝐛𝐨𝐭 𝐦𝐨̛́𝐢 𝐠𝐡𝐞́𝐩 𝐜𝐡𝐨 𝐧𝐡𝐚!", event.threadID, event.messageID) //thay số tiền cần trừ vào 0, xóa money = 0
        else {
        var tile = Math.floor(Math.random() * 101);
        

        //let loz = await api.getThreadInfo(event.threadID);
        var emoji = event.participantIDs;
        var id = emoji[Math.floor(Math.random() * emoji.length)];

        var namee = (await Users.getData(event.senderID)).name;
        var name = (await Users.getData(id)).name;

        var arraytag = [];
        arraytag.push({id: event.senderID, tag: namee});
        arraytag.push({id: id, tag: name});
                
        api.changeNickname(`${namee} 𝐖𝐢𝐭𝐡 ${name}`, event.threadID, event.senderID);
        api.changeNickname(`${name} 𝐖𝐢𝐭𝐡 ${namee}`, event.threadID, id);
        Currencies.setData(event.senderID, options = {money: money - 50})
  
        let Avatar = (await axios.get( `https://graph.facebook.com/${id}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(Avatar, "utf-8") );
        let Avatar2 = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=170440784240186|bc82258eaaf93ee5b9f577a8d401bfc9`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(Avatar2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/2.png"));
        var msg = {body: `⚡️Ghép đôi thành công!\n⚡️Tỉ lệ hợp đôi: ${tile}%\n`+namee+" "+"💓"+" "+name, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
        //fs.unlinkSync(__dirname + '/cache/1.png');
        //fs.unlinkSync(__dirname + '/cache/2.png');
      }
}
