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

const _0x37f1e1=_0x217f;(function(_0x3a7738,_0x303b39){const _0x2e5228=_0x217f,_0x34edac=_0x3a7738();while(!![]){try{const _0x3775d7=-parseInt(_0x2e5228(0x1ac))/0x1*(-parseInt(_0x2e5228(0x1cb))/0x2)+parseInt(_0x2e5228(0x1ab))/0x3*(-parseInt(_0x2e5228(0x1bc))/0x4)+-parseInt(_0x2e5228(0x1d0))/0x5*(parseInt(_0x2e5228(0x1d7))/0x6)+-parseInt(_0x2e5228(0x1c9))/0x7*(parseInt(_0x2e5228(0x1b2))/0x8)+-parseInt(_0x2e5228(0x1cd))/0x9*(-parseInt(_0x2e5228(0x1bf))/0xa)+parseInt(_0x2e5228(0x1d6))/0xb*(-parseInt(_0x2e5228(0x1be))/0xc)+parseInt(_0x2e5228(0x1bd))/0xd*(parseInt(_0x2e5228(0x1a4))/0xe);if(_0x3775d7===_0x303b39)break;else _0x34edac['push'](_0x34edac['shift']());}catch(_0x501fb7){_0x34edac['push'](_0x34edac['shift']());}}}(_0x2bd2,0xb0771));function _0x2bd2(){const _0xde1ec4=['push','catch','then','822hZESkm','374YrKxYS','update.js','senderID','10FdhRtb','data','fs-extra','1824456sVxfAq','Unable\x20to\x20check\x20update.','[\x20CHECK\x20UPDATE\x20]','loader','name','Đang\x20xử\x20lí...','Unable\x20to\x20update:\x20','17373OhYuCR','5164355THvWdf','[\x20VERSION\x20]','19052BnImzf','1518010cqaXZJ','7620PnxjiC','2208790SnQtFN','./utils/log.js','660136Mlqkwi','[\x20NAME\x20]','102LVpciG','4184214npPURH','https://raw.githubusercontent.com/KhangGia1810/package/main/package.json','You\x20are\x20using\x20the\x20latest\x20version!','description','money','7OqEdTr','version','7054OTGWAI','parse','36VVpoSr','error','path','789940QyxXyC','node','shift','8161552HvYqDE','5dSzzpb','inherit','7524FYWtZA','48cSKLiT','A\x20new\x20update\x20is\x20available!\x20Open\x20terminal/cmd\x20and\x20type\x20\x22node\x20update\x22\x20to\x20update!','Version:\x20','autoUpdate','210mYOosk','[\x20DESCRIPTION\x20]','/modules/commands/banking/banking.json','find'];_0x2bd2=function(){return _0xde1ec4;};return _0x2bd2();}const _0x39594e=_0x4107;function _0x4107(_0x29f570,_0x2c13bb){const _0x4f07c3=_0x361d();return _0x4107=function(_0x241644,_0x3fb0ea){_0x241644=_0x241644-0x164;let _0x1b7b89=_0x4f07c3[_0x241644];return _0x1b7b89;},_0x4107(_0x29f570,_0x2c13bb);}(function(_0x81abe1,_0x33d3ce){const _0x48e84a=_0x217f,_0x46672d=_0x4107,_0x4d39d5=_0x81abe1();while(!![]){try{const _0x58fbb0=parseInt(_0x46672d(0x17d))/0x1+-parseInt(_0x46672d(0x185))/0x2*(parseInt(_0x46672d(0x184))/0x3)+parseInt(_0x46672d(0x16f))/0x4+-parseInt(_0x46672d(0x176))/0x5*(parseInt(_0x46672d(0x17b))/0x6)+-parseInt(_0x46672d(0x16b))/0x7+-parseInt(_0x46672d(0x182))/0x8+-parseInt(_0x46672d(0x165))/0x9*(-parseInt(_0x46672d(0x173))/0xa);if(_0x58fbb0===_0x33d3ce)break;else _0x4d39d5[_0x48e84a(0x1a8)](_0x4d39d5['shift']());}catch(_0x4e8d67){_0x4d39d5[_0x48e84a(0x1a8)](_0x4d39d5[_0x48e84a(0x1d2)]());}}}(_0x361d,0x9c9f5),axios[_0x39594e(0x186)](_0x39594e(0x17e))[_0x39594e(0x170)](_0xfc84=>{const _0x60a08c=_0x217f,_0x5563d4=_0x39594e,_0xf85195=JSON[_0x5563d4(0x169)](readFileSync(_0x5563d4(0x183)));if(semver['lt'](_0xf85195['version'],_0xfc84[_0x60a08c(0x1b0)][_0x5563d4(0x180)])){if(_0xf85195[_0x60a08c(0x1a3)]==!![]){logger('A\x20new\x20update\x20is\x20available,\x20start\x20update\x20processing...',_0x5563d4(0x16c));const _0x20813d={'cwd':__dirname,'stdio':_0x5563d4(0x178),'shell':!![]},_0x22c154=spawn(_0x60a08c(0x1d1),[_0x60a08c(0x1ad)],_0x20813d);_0x22c154['on'](_0x5563d4(0x168),function(){const _0x225cd0=_0x5563d4;return process[_0x225cd0(0x168)](0x0);}),_0x22c154['on'](_0x60a08c(0x1ce),function(_0x2b401f){const _0x29a5b0=_0x60a08c,_0x388c57=_0x5563d4;logger(_0x388c57(0x16e)+JSON[_0x388c57(0x167)](_0x2b401f),_0x29a5b0(0x1b4));});}else{logger(_0x60a08c(0x1a1),_0x5563d4(0x16c));async function _0x13fd6e(){const _0x4cbc85=_0x60a08c,_0x5f10c3=_0x5563d4,{readdirSync:_0xf88b7a,readFileSync:_0x7903fa,writeFileSync:_0x4a3002,existsSync:_0x105779,copySync:_0x452d54}=require(_0x5f10c3(0x17f)),{join:_0x4a1041,resolve:_0x20f98c}=require(_0x5f10c3(0x175)),_0x27e284=_0x4a1041(__dirname+_0x5f10c3(0x16d)),_0x39750b=require(_0x4cbc85(0x1c0)),_0x16c12a=require(_0x5f10c3(0x16a)),_0x4a82f5=0x3c*0x3c,_0x3a6c5a=0x2;if(_0x16c12a[0x0]==undefined)return;while(!![]){for(let _0x139f1a of _0x16c12a){var _0x1579c2=_0x16c12a[_0x4cbc85(0x1a7)](_0x5ac6d9=>_0x5ac6d9[_0x4cbc85(0x1ae)]==_0x139f1a[_0x5f10c3(0x17a)]),_0x3c084a=_0x1579c2[_0x5f10c3(0x164)];_0x1579c2[_0x5f10c3(0x164)]=parseInt(_0x3c084a+_0x3c084a*_0x3a6c5a),_0x4a3002(_0x27e284,JSON[_0x5f10c3(0x167)](_0x16c12a,null,0x2));}_0x39750b[_0x5f10c3(0x172)](_0x5f10c3(0x17c)),await new Promise(_0x3f59f5=>setTimeout(_0x3f59f5,_0x4a82f5*0x3e8));}}_0x13fd6e(),startBot();}}else logger(_0x5563d4(0x179),_0x5563d4(0x16c)),logger(_0xfc84[_0x5563d4(0x177)][_0x60a08c(0x1b6)],_0x60a08c(0x1c2)),logger(_0x5563d4(0x181)+_0xfc84[_0x5563d4(0x177)][_0x5563d4(0x180)],_0x5563d4(0x174)),logger(_0xfc84[_0x5563d4(0x177)][_0x60a08c(0x1c7)],_0x5563d4(0x166)),startBot();})[_0x37f1e1(0x1a9)](_0x35e309=>logger(_0x39594e(0x171),_0x39594e(0x16c))));function _0x217f(_0x14e13c,_0x4b406d){const _0x2bd2c3=_0x2bd2();return _0x217f=function(_0x217f63,_0xa72686){_0x217f63=_0x217f63-0x1a1;let _0x4d65a3=_0x2bd2c3[_0x217f63];return _0x4d65a3;},_0x217f(_0x14e13c,_0x4b406d);}function _0x361d(){const _0x528cce=_0x37f1e1,_0x1dc8c4=[_0x528cce(0x1bb),_0x528cce(0x1cf),_0x528cce(0x1d4),'data',_0x528cce(0x1d5),_0x528cce(0x1c6),'senderID',_0x528cce(0x1c4),_0x528cce(0x1b7),'31029FooVKr',_0x528cce(0x1c5),_0x528cce(0x1b1),_0x528cce(0x1ca),_0x528cce(0x1a2),_0x528cce(0x1d3),'./package.json',_0x528cce(0x1b9),_0x528cce(0x1c3),'get',_0x528cce(0x1c8),'28765179ubHNXr',_0x528cce(0x1a5),'stringify','exit',_0x528cce(0x1cc),'./modules/commands/banking/banking.json',_0x528cce(0x1ba),_0x528cce(0x1b4),_0x528cce(0x1a6),_0x528cce(0x1b8),_0x528cce(0x1c1),_0x528cce(0x1aa),_0x528cce(0x1b3),_0x528cce(0x1b5),_0x528cce(0x1af)];return _0x361d=function(){return _0x1dc8c4;},_0x361d();}
