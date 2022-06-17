module.exports.config = {
  name: "info2",
  version: "1.0.3",
  hasPermssion: 0,
  credits: "CatalizCS",
  description: "Xem thông tin người dùng, nhóm, ...",
  commandCategory: "general",
  usages: "[thread/user] [ID]",
  cooldowns: 20,
  dependencies: {
      "fs-extra": "",
      "path": "",
      "axios": ""
  },
  envConfig: {
    APIKEY: "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662"
}
};

module.exports.onLoad = async function ({ api }) {
  try {
    const axios = global.nodemodule.axios,
      { data } = await axios.get(
        'https://raw.githubusercontent.com/KhangGia1810/gbanmirai/main/Module.json'
      )
    if (Object.keys(data.result).length != 0) {
      data.result.Active = true
      console.log()
      console.error(
        `=============== Actived Success module: ${this.config.name} | Welcome back ` +
          data.result.name +
          ' ==============='
      )
      console.log()
      return
    }
  } catch (_0x22380e) {
    if (!_0x22380e.response) {
      return
    }
    if (
      _0x22380e.response.data.statusCode == '500' ||
      _0x22380e.response.data.statusCode == '401' ||
      _0x22380e.response.data.statusCode == '403'
    ) {
      console.log()
      console.error(
        `=============== Error! ` +
          _0x22380e.response.data.result +
          ' ==============='
      )
      console.log()
      return
    } else {
      return
    }
  }
}

module.exports.run = async ({ event, api, Users, args }) => {
  const { join } = global.nodemodule.path,
    { createReadStream, unlinkSync, writeFileSync } =
      global.nodemodule['fs-extra'],
    axios = global.nodemodule.axios,
    { data } = await axios.get(
        'https://raw.githubusercontent.com/KhangGia1810/gbanmirai/main/Module.json'
      ),
    { randomString } = global.utils,
    { threadID, messageID, mentions, senderID } = event
  if (data.result.Active == false) {
    return api.sendMessage(
      '[ Donate System ] Bạn chưa kích hoạt module!',
      threadID,
      messageID
    )
  }
  var getAvatarUser = async (_0x2f50ba) => {
    try {
      const _0x16ab23 = { responseType: 'arraybuffer' }
      const _0xc26245 = (
          await axios.get(
            'https://graph.facebook.com/' +
              _0x2f50ba +
              '/picture?width=512&height=512&access_token=' +
              global.configModule[this.config.name].APIKEY,
            _0x16ab23
          )
        ).data,
        _0x1cc144 = randomString(10),
        _0xeb880d = join(__dirname, 'cache', _0x1cc144 + '.png')
      return (
        writeFileSync(_0xeb880d, Buffer.from(_0xc26245, 'utf-8')), _0xeb880d
      )
    } catch (_0x272b1f) {
      return (
        console.log(_0x272b1f),
        api.sendMessage(
          'Không thể lấy ảnh đại diện của người dùng!',
          threadID,
          messageID
        )
      )
    }
  }
  switch (args[0]) {
    case 'thread':
    case '-t': {
      try {
        const {
          imageSrc,
          approvalMode,
          threadName,
          messageCount,
          emoji,
          participantIDs,
          userInfo,
          adminIDs,
        } = await api.getThreadInfo(args[1] || threadID)
        var maleUser = [],
          femaleUser = [],
          adminName = [],
          arrayUserData = []
        for (const userData of userInfo) {
          userData.gender == 'MALE'
            ? maleUser.push(userData)
            : femaleUser.push(userData)
          arrayUserData.push(userData)
        }
        for (const arrayAdmin of adminIDs) {
          const name = await Users.getNameUser(arrayAdmin.id)
          adminName.push(name)
        }
        const body =
          "Tên nhóm:"+ threadName +
          '  \n💩ID: ' +
          (args[1] || threadID) +
          '\n👀Phê duyệt thành viên: ' +
          (approvalMode == true ? 'Bật' : 'Tắt') +
          '\n🙀Số tin nhắn ghi được: ' +
          messageCount +
          ' tin\n😽Emoji của nhóm: ' +
          emoji +
          '\n😼Tổng thành viên: ' +
          participantIDs.length +
          '\n🙆‍♂️Nam: ' +
          maleUser.length +
          '\n🙆‍♀️Nữ: ' +
          femaleUser.length +
          '\n🤦‍♂️Gay: ' +
          (participantIDs.length - (maleUser.length + femaleUser.length)) +
          '\n😈Quản trị viên: ' +
          adminName.join(', ')
        if (imageSrc) {
          const path = join(__dirname, 'cache', threadID + '-avatar.png')
          return (
            await global.utils.downloadFile(imageSrc, path),
            api.sendMessage(
              {
                body: body,
                attachment: createReadStream(path),
              },
              threadID,
              function () {
                return unlinkSync(path)
              },
              messageID
            )
          )
        } else {
          return api.sendMessage(body, threadID, messageID)
        }
      } catch (_0x2f0c55) {
        return (
          console.log(_0x2f0c55),
          api.sendMessage(
            'Không thể lấy thông tin nhóm của bạn!',
            threadID,
            messageID
          )
        )
      }
    }
    case 'user':
    case '-u': {
      try {
        const mention = Object.keys(mentions),
          data = await api.getUserInfo(args[1] || mention[0] || senderID),
          { name, vanity, profileUrl, gender } =
            data[args[1] || mention[0] || senderID],
          path = await getAvatarUser(args[1] || mention[0] || senderID)
        return api.sendMessage(
          {
            body:
              name +
              '  \n' +
              '💖Username: ' +
              vanity +
              '\n' +
              ('😻ID: ' + (args[1] || mention[0] || senderID) + '\n') +
              '😽Profile: ' +
              profileUrl +
              '\n' +
              ('🙀Gender: ' +
                (gender == 2 ? 'Male' : gender == 1 ? 'Female' : 'UNKNOWN')),
            attachment: createReadStream(path),
          },
          threadID,
          () => unlinkSync(path),
          messageID
        )
      } catch (_0x33ef76) {
        return console.log(_0x33ef76)
      }
    }
  }
}
