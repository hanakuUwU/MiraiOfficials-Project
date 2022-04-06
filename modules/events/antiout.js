module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "1.0.7",
    credits: "ProCoderMew",
    description: "Listen events",
    dependencies: {
        "path": ""
    }
};

module.exports.run = async function ({ api, event, Users }) {
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'meewmeew.json');
    const { antiout } = require(path);
    const { logMessageData, author, threadID } = event;
    const id = logMessageData.leftParticipantFbId;
    if (author == id && id != api.getCurrentUserID()) {
        const name = await Users.getNameUser(id) || "Người dùng Facebook";
        if (antiout.hasOwnProperty(threadID) && antiout[threadID] == true) {
            try {
                await api.addUserToGroup(id, threadID);
                return api.sendMessage(`𝐃𝐚̃ 𝐓𝐡𝐞̂𝐦 ${name} 𝐕𝐚̀𝐨 𝐋𝐚̣𝐢 𝐍𝐡𝐨́𝐦 .`);
            }
            catch (e) {
                return api.sendMessage(`𝐊𝐡𝐨̂𝐧𝐠 𝐓𝐡𝐞̂̉ 𝐓𝐡𝐞̂𝐦 ${name} 𝐕𝐮̛̀𝐚 𝐎𝐮𝐭 𝐕𝐚̀𝐨 𝐋𝐚̣𝐢 𝐍𝐡𝐨́𝐦.`, threadID);
            }
        }
    }
    return;
      }
