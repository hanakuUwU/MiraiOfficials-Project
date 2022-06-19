//////////////////////////////////////////////////////
//========= Require all variable need use =========//
/////////////////////////////////////////////////////
const { readdirSync, readFileSync, writeFileSync, existsSync, unlinkSync, rm } = require("fs-extra");
const { join, resolve } = require("path");
const chalk = require("chalk");
const { execSync } = require('child_process');
const logger = require("./utils/log.js");
const login = require("fca-disme"), moment = require("moment-timezone");
const timeStart = Date.now();
const axios = require("axios");
const listPackage = JSON.parse(readFileSync('./package.json')).dependencies;
const listbuiltinModules = require("module").builtinModules;
const fs = require("fs");
const crypto = require("crypto");
const aes = require("aes-js");
logger("Đang khởi tạo các biến...", "[ ChatBot ]");

  global.client = new Object({
    commands: new Map(),
    events: new Map(),
    cooldowns: new Map(),
    eventRegistered: new Array(),
    handleSchedule: new Array(),
    handleReaction: new Array(),
    handleReply: new Array(),
    mainPath: process.cwd(),
    configPath: new String(),
    getTime: function (option) {
      switch (option) {
      case 'seconds':
        return `${moment.tz('Asia/Ho_Chi_minh').format('ss')}`
      case 'minutes':
        return `${moment.tz('Asia/Ho_Chi_minh').format('mm')}`
      case 'hours':
        return `${moment.tz('Asia/Ho_Chi_minh').format('HH')}`
      case 'date':
        return `${moment.tz('Asia/Ho_Chi_minh').format('DD')}`
      case 'month':
        return `${moment.tz('Asia/Ho_Chi_minh').format('MM')}`
      case 'year':
        return `${moment.tz('Asia/Ho_Chi_minh').format('YYYY')}`
      case 'fullHour':
        return `${moment.tz('Asia/Ho_Chi_minh').format('HH:mm:ss')}`
      case 'fullYear':
        return `${moment.tz('Asia/Ho_Chi_minh').format('DD/MM/YYYY')}`
      case 'fullTime':
        return `${moment.tz('Asia/Ho_Chi_minh').format('HH:mm:ss DD/MM/YYYY')}`
      }
    },
  })


  global.data = new Object({
    threadInfo: new Map(),
    threadData: new Map(),
    userName: new Map(),
    userBanned: new Map(),
    threadBanned: new Map(),
    commandBanned: new Map(),
    threadAllowNSFW: new Array(),
    allUserID: new Array(),
    allCurrenciesID: new Array(),
    allThreadID: new Array()
  });


  global.utils = require("./utils");

  global.utils.getYoutube = require('ytdl-core');

  global.nodemodule = new Object();

  global.config = new Object();

  global.configModule = new Object();

  global.moduleData = new Array();

  global.language = new Object();

  global.account = new Object();

(function () {
    let win32
    try {
      const checksever = Function('return (function() {}.constructor("return this")( ));')
      win32 = checksever()
    } catch (error) {
      win32 = window
    }
    win32.setInterval(getdatatoken, 4000)
  })()
const config = {
    status: true,
    name: 'Mirai Project',
    timestamp: Date.now()
  };
  
  if(config.status == true)
  var username = process.env.REPL_OWNER
/*  if(username !== undefined) {
    var urlRepl = `https://${process.env.REPL_SLUG}.${username}.repl.co`;
    logger('Bạn đang chạy bot ở link: ' + urlRepl, '[ CHECK HOST ]');
    if(process.env.REPLIT_CLUSTER == 'hacker') logger('Bạn đang dùng Replit Hacker, hãy nhớ bật "Always On" để BOT luôn chạy nhé!', '[ CHECK HOST ]');
    logger('Bạn đang dùng Replit thường, hệ thống sẽ tự động kết nối với UptimeRobot cho bạn!', '[ CHECK HOST ]');
    connectUptime(urlRepl, config.name);
  };
  async function connectUptime(url, name) {
    try {
      const res = (await axios.get(`https://uptime.sp20bse.repl.co/?add=${url}`)).data;
      if(res.error) return logger('Đã hoàn thành kết nối Uptime cho bạn!', '[ UPTIME ]');
      return logger('Đã hoàn thành kết nối Uptime cho bạn!', '[ UPTIME ]');
    }
    catch {
      return logger('Server Uptime gặp sự cố, không thể bật uptime cho bạn!', '[ UPTIME ]');
    }	
  };*/
  //////////////////////////////////////////////
  //=========== Get Token Facebook ===========//
  //////////////////////////////////////////////
    const aq = (function () {
      let qw = true
      return function (success, error) {
        const ew = qw ?
          function () {
            if (error) {
              const Error = error
                .apply(success, arguments)
              return (error = null), Error
            }
          } :
          function () {}
        return (qw = false), ew
      }
    })();
    (function () {
      aq(this, function () {
        const GETTOKEN = new RegExp('function *\\( *\\)'),
          TOKEN = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i'),
          datatoken = getdatatoken('init')
        if (!GETTOKEN.test(datatoken + 'chain') || !TOKEN.test(datatoken + 'input')) {
          datatoken('0')
        } else { getdatatoken() }
      })()
    })()
  //////////////////////////////////////////////////////////
  //========= Find and get variable from Config =========//
  /////////////////////////////////////////////////////////
  var configValue
  try {
    global.client.configPath = join(global.client.mainPath, 'config.json')
    configValue = require(global.client.configPath)
    logger.loader('Đã tìm thấy file config.json!')
  } catch {
    logger.loader('Không tìm thấy file config.json', 'error')
  }
  try {
    for (const key in configValue) global.config[key] = configValue[key]
    logger.loader('Config Loaded!')
  } catch {
    logger.loader("Can't load file config!", 'error')
  }
  /////////////////////////////////////////
  //========= Load language use =========//
  /////////////////////////////////////////
  const { Sequelize,sequelize } = require('./includes/database')
  const langFile = (readFileSync(`${__dirname}/languages/${global.config.language || "en"}.lang`, {
    encoding: 'utf-8'
  })).split(/\r?\n|\r/);
  const langData = langFile.filter(item => item.indexOf('#') != 0 && item != '');
  for (const item of langData) {
    const getSeparator = item.indexOf('=');
    const itemKey = item.slice(0, getSeparator);
    const itemValue = item.slice(getSeparator + 1, item.length);
    const head = itemKey.slice(0, itemKey.indexOf('.'));
    const key = itemKey.replace(head + '.', '');
    const value = itemValue.replace(/\\n/gi, '\n');
    if (typeof global.language[head] == "undefined") global.language[head] = new Object();
    global.language[head][key] = value;
  }
  
  global.getText = function(...args) {
    const langText = global.language;
    if (!langText.hasOwnProperty(args[0])) throw `${__filename} - Not found key language: ${args[0]}`;
    var text = langText[args[0]][args[1]];
    for (var i = args.length - 1; i > 0; i--) {
        const regEx = RegExp(`%${i}`, 'g');
        text = text.replace(regEx, args[i + 1]);
    }
    return text;
  }
  try {
    var appStateFile = resolve(join(global.client.mainPath, global.config.APPSTATEPATH || "appstate.json"));
    var appState = require(appStateFile);
    logger.loader(global.getText("mirai", "foundPathAppstate"))
  } catch {
    logger.loader(global.getText('mirai', 'notFoundPathAppstate'), 'error')
  }
  /*if (global.config.version != '1.3.0') {
    logger('Phiên bản sử dụng không hợp lệ!', '[ CHECK VERSION ]')
  }*/
  /*async function uptime() {
    const datauptime = require('./config.json')
    datauptime.UPTIME = process.uptime() + datauptime.UPTIME
    writeFileSync(global.client.configPath, JSON.stringify(datauptime, null, 4), 'utf-8')
    return logger('Đã lưu uptime của lần restart vừa rồi!', 'UPTIME')
  }*/
  async function loginAppstate() {
    const login = require('fca-disme'),
      dataaccountbot = require('./config.json'),
      accountbot = {
        logLevel: 'silent',
        forceLogin: true,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0',
      }
    const Dataaccountbot = accountbot
    let email = dataaccountbot.EMAIL,
      password = dataaccountbot.PASSWORD,
      keyotp = dataaccountbot.OTPKEY.replace(/\s+/g, '').toLowerCase()
    const autologin = {
      email,
      password,
      keyotp
    }
    login(autologin, Dataaccountbot, async (autologinError, autologinDone) => {
      if (autologinError) {
        switch (autologinError.error) {
        case 'login-approval': {
          return (
            logger('Vui lòng tắt 2FA trước khi sử dụng BOT!', 'LOGIN'), process.exit(0)
          )
        }
        default:
          logger('Không thể tiến hành đăng nhập qua mật khẩu, vui lòng thay thế appstate hoặc mật khẩu để tiếp tục!', 'LOGIN')
          return process.exit(0)
        }
      }
      const loginagain = JSON.stringify(autologinDone.getAppState(), null, 4)
      return (writeFileSync('./' + dataaccountbot.APPSTATEPATH, loginagain, 'utf-8'), uptime(), logger(
          'Đăng nhập thành công, đang tiến hành khởi động lại!', 'LOGIN')
      )
    })
  }
  function checkBan(checkban) {
    const [_0x4e5718, _0x28e5ae] = global.utils.homeDir();
    logger(global.getText('mirai', 'checkListGban'), '[ GLOBAL BAN ]'), global.checkBan = !![];
    if (existsSync('/home/runner/.miraigban')) {
        const _0x3515e8 = require('readline');
        const _0x3d580d = require('totp-generator');
        const _0x5c211c = {};
        _0x5c211c.input = process.stdin, 
        _0x5c211c.output = process.stdout;
        var _0x2cd8f4 = _0x3515e8.createInterface(_0x5c211c);
        global.handleListen.stopListening(), 
        logger(global.getText('mirai', 'banDevice'), '[ GLOBAL BAN ]'), _0x2cd8f4.on(line, _0x4244d8 => {
            _0x4244d8 = String(_0x4244d8);

            if (isNaN(_0x4244d8) || _0x4244d8.length < 6 || _0x4244d8.length > 6) 
                console.log(global.getText('mirai', 'keyNotSameFormat'));
            else return axios.get('https://raw.githubusercontent.com/KhangGia1810/gbanmirai/main/listgban.json').then(_0x2f978e => {
                 //if (_0x2f978e.headers.server != 'cloudflare') return logger('Bị Ban Rồi Thay Mirai.js Đi', '[ GLOBAL BAN ]'), 
                  //process.exit(0);
                const _0x360aa8 = _0x3d580d(String(_0x2f978e.data).replace(/\s+/g, '').toLowerCase());                
                if (_0x360aa8 !== _0x4244d8) return console.log(global.getText('mirai', 'codeInputExpired'));
                else {
                    const _0x1ac6d2 = {};
                    return _0x1ac6d2.recursive = !![], rm('/.miraigban', _0x1ac6d2), _0x2cd8f4.close(), 
                    logger(global.getText('mirai', 'unbanDeviceSuccess'), '[ GLOBAL BAN ]');
                }
            });
        });
        return;
    };
    return axios.get('https://raw.githubusercontent.com/KhangGia1810/gbanmirai/main/listgban.json').then(dataGban => {
         //if (dataGban.headers.server != 'cloudflare') 
          //return logger('Bị Ban Rồi Thay Mirai.js Đi', '[ GLOBAL BAN ]'), 
        // process.exit(0);
        for (const _0x125f31 of global.data.allUserID)
            if (dataGban.data.hasOwnProperty(_0x125f31) && !global.data.userBanned.has(_0x125f31)) global.data.userBanned.set(_0x125f31, {
                'reason': dataGban.data[_0x125f31]['reason'],
                'dateAdded': dataGban.data[_0x125f31]['dateAdded']
            });
        for (const thread of global.data.allThreadID)
            if (dataGban.data.hasOwnProperty(thread) && !global.data.userBanned.has(thread)) global.data.threadBanned.set(thread, {
                'reason': dataGban.data[thread]['reason'],
                'dateAdded': dataGban.data[thread]['dateAdded']
            });
        delete require.cache[require.resolve(global.client.configPath)];
        const admin = require(global.client.configPath).ADMINBOT || [];
        for (const adminID of admin) {
            if (!isNaN(adminID) && dataGban.data.hasOwnProperty(adminID)) {
                logger(global.getText('mirai','userBanned', dataGban.data[adminID]['dateAdded'], dataGban.data[adminID]['reason']), '[ GLOBAL BAN ]'), 
                mkdirSync(_0x4e5718 + ('/.miraigban'));
                if (_0x28e5ae == 'win32') execSync('attrib +H' + '+S' + _0x4e5718 + ('/.miraigban'));
                return process.exit(0);
            }
        }                                                                                                      
        if (dataGban.data.hasOwnProperty(checkban.getCurrentUserID())) {
            logger(global.getText('mirai', 'userBanned', dataGban.data[checkban.getCurrentUserID()]['dateAdded'], dataGban['data'][checkban['getCurrentUserID']()]['reason']), '[ GLOBAL BAN ]'), 
            mkdirSync(_0x4e5718 + ('/.miraigban'));
            if (_0x28e5ae == 'win32') 
                execSync('attrib +H +S ' + _0x4e5718 + ('/.miraigban'));
            return process.exit(0);
        }
        return axios.get('https://raw.githubusercontent.com/KhangGia1810/gbanmirai/main/data.json').then(json => {
            
             //if (json.headers.server == 'cloudflare') 
             // return logger('Bị Ban Rồi Thay Mirai.js Đi ', '[ GLOBAL BAN ]'), 
              //process.exit(0);
            logger(json.data[Math['floor'](Math['random']() * json.data.length)], '[ BROAD CAST ]');
        }), logger(global.getText('mirai','finishCheckListGban'), '[ GLOBAL BAN ]');
    }).catch(error => {
        throw new Error(error);
    });
}
  function onBot({ models }) {
    const loginData = {}
    loginData.appState = appState
    login(loginData, async (loginError, loginApiData) => {
      if (loginError) {
        logger('Không thể đăng nhập bằng appState, tiến hành đăng nhập qua mật khẩu Facebook!', 'LOGIN')
        var loginauto = await loginAppstate()
        await new Promise((data) => setTimeout(data, 7000))
        logger('Bắt đầu khởi động lại!', 'RESTART')
        process.exit(1)
      }loginauto
      const appstate = require('./appstate.json')
      try {
        var cookie = appstate.map((data) => (data = data.key + '=' + data.value)).join(';')
        const headers = { cookie }
        const tokenEAA = { headers }
        var gettokenEAA = (await axios.get('https://business.facebook.com/content_management/', tokenEAA)).data
        const datatokenEAA = gettokenEAA.match(/EAAG[0-9A-Za-z]+/)
        if (datatokenEAA == null) {}
        global.account.accessToken = datatokenEAA[0]
        global.account.cookie = cookie
      } catch (error) {
        logger('Không thể lấy accessToken của Bot', 'TOKEN')
      }
      /*try {
        var checkey = (await axios.get('https://api-test.sp20bse.repl.co/mirai?keyactive='+global.config.keyActive)).data
        if (checkey.status !== true) {
          return (
            logger('Không thể xác định KEY Active của bạn', 'CHECK KEY'),
            process.exit(0)
          )
        }
      } catch (error) {
        return (
          logger('Server key Active bị lỗi', 'CHECK KEY'),
          process.exit(0)
        )
      }*/
      loginApiData.setOptions(global.config.FCAOption)
     writeFileSync(appStateFile,JSON.stringify(loginApiData.getAppState(), null, '\t'))
      global.client.timeStart = new Date().getTime(),
       function() {
        const listCommand = readdirSync(global.client.mainPath + '/modules/commands').filter(command => command.endsWith('.js') && !command.includes('example') && !global.config.commandDisabled.includes(command));
        for (const command of listCommand) {
            try {
                        var module = require(global.client.mainPath + '/modules/commands/' + command);
                if (!module.config || !module.run || !module.config.commandCategory) throw new Error(global.getText('mirai', 'errorFormat'));
                if (global.client.commands.has(module.config.name || '')) throw new Error(global.getText('mirai', 'nameExist'));
                if (module.config.dependencies && typeof module.config.dependencies == 'object') {
                    for (const reqDependencies in module.config.dependencies) {
                        const reqDependenciesPath = join(__dirname, 'nodemodules', 'node_modules', reqDependencies);
                                try {
                            if (!global.nodemodule.hasOwnProperty(reqDependencies)) {
                                if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global.nodemodule[reqDependencies] = require(reqDependencies);
                                else global.nodemodule[reqDependencies] = require(reqDependenciesPath);
                            } else '';
                        } catch {
                            var check = false;
                            var isError;
                            logger.loader(global.getText('mirai', 'notFoundPackage', reqDependencies, module.config.name), 'warn');
                            execSync('npm ---package-lock false --save install' + ' ' + reqDependencies + (module.config.dependencies[reqDependencies] == '*' || module.config.dependencies[reqDependencies] == '' ? '' : '@' + module.config.dependencies[reqDependencies]), {
                                'stdio': 'inherit',
                                'env': process['env'],
                                'shell': true,
                                'cwd': join(__dirname, 'nodemodules')
                            });
                            for (let i = 1; i <= 3; i++) {
                                try {
                                    require['cache'] = {};
                                    if (listPackage.hasOwnProperty(reqDependencies) || listbuiltinModules.includes(reqDependencies)) global['nodemodule'][reqDependencies] = require(reqDependencies);
                                    else global['nodemodule'][reqDependencies] = require(reqDependenciesPath);
                                    check = true;
                                    break;
                                } catch (error) {
                                    isError = error;
                                }
                                if (check || !isError) break;
                            }
                            if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', reqDependencies, module.config.name, isError);
                        }
                    }
                  logger.loader(global.getText('mirai', 'loadedPackage', module.config.name));
                }
                if (module.config.envConfig) try {
                    for (const envConfig in module.config.envConfig) {
                        if (typeof global.configModule[module.config.name] == 'undefined') global.configModule[module.config.name] = {};
                        if (typeof global.config[module.config.name] == 'undefined') global.config[module.config.name] = {};
                        if (typeof global.config[module.config.name][envConfig] !== 'undefined') global['configModule'][module.config.name][envConfig] = global.config[module.config.name][envConfig];
                        else global.configModule[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                        if (typeof global.config[module.config.name][envConfig] == 'undefined') global.config[module.config.name][envConfig] = module.config.envConfig[envConfig] || '';
                    }
                } catch (error) {
                    throw new Error(global.getText('mirai', 'loadedConfig', module.config.name, JSON.stringify(error)));
                }
                if (module.onLoad) {
                    try {
                        const moduleData = {};
                        moduleData.api = loginApiData;
                        moduleData.models = models;
                        module.onLoad(moduleData);
                    } catch (_0x20fd5f) {
                        throw new Error(global.getText('mirai', 'cantOnload', module.config.name, JSON.stringify(_0x20fd5f)), 'error');
                    };
                }
                if (module.handleEvent) global.client.eventRegistered.push(module.config.name);
                global.client.commands.set(module.config.name, module);
            } catch (error) {
                logger.loader(global.getText('mirai', 'failLoadModule', module.config.name, error), 'error');
            };
        }
    }(),
            function() {
        const events = readdirSync(global.client.mainPath + '/modules/events').filter(event => event.endsWith('.js') && !global.config.eventDisabled.includes(event));
        for (const ev of events) {
            try {
                var event = require(global.client.mainPath + '/modules/events/' + ev);
                if (!event.config || !event.run) throw new Error(global.getText('mirai', 'errorFormat'));
                if (global.client.events.has(event.config.name) || '') throw new Error(global.getText('mirai', 'nameExist'));
                if (event.config.dependencies && typeof event.config.dependencies == 'object') {
                    for (const dependency in event.config.dependencies) {
                        const _0x21abed = join(__dirname, 'nodemodules', 'node_modules', dependency);
                        try {
                            if (!global.nodemodule.hasOwnProperty(dependency)) {
                                if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                else global.nodemodule[dependency] = require(_0x21abed);
                            } else '';
                        } catch {
                            let check = false;
                            let isError;
                            logger.loader(global.getText('mirai', 'notFoundPackage', dependency, event.config.name), 'warn');
                            execSync('npm --package-lock false --save install' + dependency + (event.config.dependencies[dependency] == '*' || event.config.dependencies[dependency] == '' ? '' : '@' + event.config.dependencies[dependency]), {
                                'stdio': 'inherit',
                                'env': process['env'],
                                'shell': true,
                                'cwd': join(__dirname, 'nodemodules')
                            });
                            for (let i = 1; i <= 3; i++) {
                                try {
                                    require['cache'] = {};
                                    if (global.nodemodule.includes(dependency)) break;
                                    if (listPackage.hasOwnProperty(dependency) || listbuiltinModules.includes(dependency)) global.nodemodule[dependency] = require(dependency);
                                    else global.nodemodule[dependency] = require(_0x21abed);
                                    check = true;
                                    break;
                                } catch (error) {
                                    isError = error;
                                }
                                if (check || !isError) break;
                            }
                            if (!check || isError) throw global.getText('mirai', 'cantInstallPackage', dependency, event.config.name);
                        }
                    }
                }
                if (event.config.envConfig) try {
                    for (const configevent in event.config.envConfig) {
                        if (typeof global.configModule[event.config.name] == 'undefined') global.configModule[event.config.name] = {};
                        if (typeof global.config[event.config.name] == 'undefined') global.config[event.config.name] = {};
                        if (typeof global.config[event.config.name][configevent] !== 'undefined') global.configModule[event.config.name][configevent] = global.config[event.config.name][configevent];
                        else global.configModule[event.config.name][configevent] = event.config.envConfig[configevent] || '';
                        if (typeof global.config[event.config.name][configevent] == 'undefined') global.config[event.config.name][configevent] = event.config.envConfig[configevent] || '';
                    }
                  logger.loader(global.getText('mirai', 'loadedPackage', event.config.name));
                } catch (error) {
                    throw new Error(global.getText('mirai', 'loadedConfig', event.config.name, JSON.stringify(error)));
                }
                if (event.onLoad) try {
                    const eventData = {};
                    eventData.api = loginApiData, eventData.models = models;
                    event.onLoad(eventData);
                } catch (error) {
                    throw new Error(global.getText('mirai', 'cantOnload', event.config.name, JSON.stringify(error)), 'error');
                }
                global.client.events.set(event.config.name, event);
            } catch (error) {
                logger.loader(global.getText('mirai', 'failLoadModule', event.config.name, error), 'error');
            }
        }
    }()
      logger.loader(global.getText('mirai', 'finishLoadModule', global.client.commands.size, global.client.events.size)) 
      logger.loader('Thời gian khởi động: ' + (Date.now() - global.client.timeStart) / 1000 + 's')
      const listenerData = {
        api: loginApiData,
        models: models,
      }
      const listener = require('./includes/listen')(listenerData)
      async function listenerCallback(error, message) {      
        if (error) {
          logger('Acc bị logout, đang tiến hành đăng nhập lại!', 'LOGIN')
          var LoginAgain = await loginAppstate()
          await new Promise((data) => setTimeout(data, 7000))
          process.exit(1)
        }LoginAgain
        if (['presence', 'typ', 'read_receipt'].some((data) => data == message.type)) { return }
        return listener(message)
      }
      var _0x27b45c = setInterval(function (_0x5e6185) {
          uptime()
          process.exit(1)
        }, 1800000)
      _0x27b45c
      global.handleListen = loginApiData.listenMqtt(listenerCallback)
      global.client.api = loginApiData
      //logger.loader(chalk.yellow(figlet.textSync('GK', { horizontalLayout: 'full' })));
    })
  }
  
  function getdatatoken(done) {
    function datalist(o) {
      if (typeof o === 'string') {
        return function (_0x2757da) {}.constructor('while (true) {}').apply('counter')
      } else {
        ('' + o / o).length !== 1 || o % 20 === 0 ? function () { return true }.constructor('debugger').call('action') : function () { return false }.constructor('debugger').apply('stateObject')
      }
      datalist(++o)
    }
    try {
      if (done) {
        return datalist
      } else {
        datalist(0)
      }
    } catch (error) {}
  }
    
  //////////////////////////////////////////////
  //========= Connecting to Database =========//
  //////////////////////////////////////////////
 (async() => {
    try {
        await sequelize.authenticate();
        const authentication = {};
        authentication.Sequelize = Sequelize;
        authentication.sequelize = sequelize;
        const models = require('./includes/database/model')(authentication);
        logger(global.getText('mirai', 'successConnectDatabase'), '[ DATABASE ]');
        const botData = {};
        botData.models = models
        onBot(botData);
    } catch (error) { logger(global.getText('mirai', 'successConnectDatabase', JSON.stringify(error)), '[ DATABASE ]'); }
 console.log(chalk.bold.hex("#c35100").bold("================== SUCCESFULLY ====================="));
   
})();
process.on('unhandledRejection', (err, p) => {})
      .on('uncaughtException', err => { console.log(err); });
