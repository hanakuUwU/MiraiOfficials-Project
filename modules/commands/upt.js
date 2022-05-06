module.exports.config = {
	name: "upt",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "Mirai Team",// Đã mod thêm thời gian và ngày
	description: "Kiểm tra thời gian bot đã online",
	commandCategory: "Tiện ích",
	cooldowns: 5,
	dependencies: {
		"pidusage": "",
    "fast-speedtest-api": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.run = async ({ api, event, args }) => {
		const fast = global.nodemodule["fast-speedtest-api"];
   const prefix = config.PREFIX
  const moment = require("moment-timezone");
	const axios = global.nodemodule["axios"];
		const speedTest = new fast({
			token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
			verbose: false,
			timeout: 10000,
			https: true,
			urlCount: 5,
			bufferSize: 8,
			unit: fast.UNITS.Mbps
		});
  var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
   var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝟐'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝟑'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝟒'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝟓'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝟔'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝟕'
    const res = await axios.get("https://api.xlshsad.repl.co/images/mirai");
//lấy data trên web api
const data = res.data.url;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
		const resault = await speedTest.getSpeed();
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
	const pidusage = await global.nodemodule["pidusage"](process.pid);
	const timeStart = Date.now();
	return api.sendMessage("", event.threadID, () => api.sendMessage({body: `❯𝐇𝐨̂𝐦 𝐧𝐚𝐲 𝐥𝐚̀: ${thu}\n❯${gio}\n❯𝐓𝐢𝐦𝐞: ${hours} 𝐆𝐢𝐨̛̀ ${minutes} 𝐏𝐡𝐮́𝐭 ${seconds} 𝐆𝐢𝐚̂𝐲\n❯𝐂𝐩𝐮: ${pidusage.cpu.toFixed(1)}%\n❯𝐑𝐚𝐦: ${byte2mb(pidusage.memory)}\n❯𝐔𝐬𝐞𝐫𝐬: ${global.data.allUserID.length}\n❯𝐏𝐢𝐧𝐠: ${Date.now() - timeStart}𝐦𝐬\n❯𝐅𝐚𝐬𝐭: ${resault} 𝐌𝐛𝐬`, attachment: download}, event.threadID, event.messageID));
}
