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
        const name = await Users.getNameUser(id) || "Ngฦฐแปi dรนng Facebook";
        if (antiout.hasOwnProperty(threadID) && antiout[threadID] == true) {
            try {
                await api.addUserToGroup(id, threadID);
                return api.sendMessage(`๐๐ฬ ๐๐ก๐ฬ๐ฆ ${name} ๐๐ฬ๐จ ๐๐ฬฃ๐ข ๐๐ก๐จฬ๐ฆ .`);
            }
            catch (e) {
                return api.sendMessage(`๐๐ก๐จฬ๐ง๐  ๐๐ก๐ฬฬ ๐๐ก๐ฬ๐ฆ ${name} ๐๐ฎฬฬ๐ ๐๐ฎ๐ญ ๐๐ฬ๐จ ๐๐ฬฃ๐ข ๐๐ก๐จฬ๐ฆ.`, threadID);
            }
        }
    }
    return;
      }
