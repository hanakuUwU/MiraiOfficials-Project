const { spawn } = require("child_process");
const { readFileSync } = require("fs-extra");
const http = require("http");
const axios = require("axios");
const semver = require("semver");
const logger = require("./utils/log");
const { writeFileSync } = require("fs");


/////////////////////////////////////////////
//========= Check node.js version =========//
/////////////////////////////////////////////

//const nodeVersion = semver.parse(process.version);
//if (nodeVersion.major < 13) {
//    logger(`Phiên bản Node.js của bạn ${process.version} không được hỗ trợ, bạn phải sử dụng Node.js 13 để bot hoạt động!`, "error");
//    process.exit(0);
//};

///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////

const dashboard = http.createServer(function (_req, res) {
    res.writeHead(200, "OK", { "Content-Type": "text/plain" });
    res.write("Xin chào admin chúc bạn một ngày tốt lành");
    res.end();
});

dashboard.listen(process.env.port || 0);

logger("Open Sever...", "[Staring]");

/////////////////////////////////////////////////////////
//========= Create start bot and make it loop =========//
/////////////////////////////////////////////////////////

function startBot(message) {
    (message) ? logger(message, "[ » •GK• « ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("Open Sever...");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Open Sever...");
       }
         else return; 
    });

    child.on("error", function (error) {
        logger("An error occurred: " + JSON.stringify(error), "[ » •GK• « ]");
    });
};

////////////////////////////////////////////////
//========= Check update from Github =========//
////////////////////////////////////////////////

axios.get('https://raw.githubusercontent.com/KhangGia1810/MiraiOfficials-Project/main/package.json').then((res) => {
  const local = JSON.parse(readFileSync('./package.json'))
if (semver.lt(local.version, res.data.version)) {
  if (local.autoUpdate == true) {
    logger('A new update is available, start update processing...','[ CHECK UPDATE ]')
    const checkupdate = {cwd: __dirname,stdio: 'inherit',shell: true,}
    const child = spawn('node', ['update.js'], checkupdate)
    child.on('exit', function () {
      return process.exit(0)})
    child.on('error', function (checkupdate) {
      logger('Unable to update: ' + JSON.stringify(checkupdate),'[ CHECK UPDATE ]')})
  } else {
    logger('A new update is available! Open terminal/cmd and type "node update" to update!','[ CHECK UPDATE ]')
    async function bank() {
      const { readdirSync, readFileSync, writeFileSync, existsSync, copySync } = require('fs-extra');
      const { join, resolve } = require('path');
      const pathData = join(__dirname + '/modules/commands/banking/banking.json');
      const logger = require("./utils/log.js");
      const user = require('./modules/commands/banking/banking.json');
      const timeIM = 60*60
      const laisuat = 2
        if(user[0] == undefined ) return
        while(true) {
        for (let id of user) {
        var userData = user.find(i => i.senderID == id.senderID);
        var money = userData.money;
        userData.money = (parseInt(money + money * laisuat))
        writeFileSync(pathData, JSON.stringify(user, null, 2))}
        logger.loader("Đang xử lí...");
        await new Promise(resolve => setTimeout(resolve, timeIM*1000))}
      }bank()
    startBot()
  }
} else {
  logger('You are using the latest version!', '[ CHECK UPDATE ]');
  logger(res['data']['name'], "[ NAME ]");
    logger("Version: " + res['data']['version'], "[ VERSION ]");
    logger(res['data']['description'], "[ DESCRIPTION ]")
  startBot()
}}).catch(err => logger("Unable to check update.", "[ CHECK UPDATE ]"));
