const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 10,
    role: 2,
    shortDescription: "𝖣𝖺𝗉𝖺𝗍𝗄𝖺𝗇 𝖿𝗂𝗅𝖾 𝗌𝗄𝗂𝗋𝗉 𝖻𝗈𝗍",
    category: "MODS",
    guide: "{pn} <𝖿𝗂𝗅𝖾>"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["61554707631739"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("✨ 𝗙𝗶𝗹𝗲\n━━━━━━━━━━━\n𝖪𝖺𝗆𝗎 𝗍𝗂𝖽𝖺𝗄 𝗉𝗎𝗇𝗒𝖺 𝖼𝗎𝗄𝗎𝗉 𝗂𝗓𝗂𝗇 𝗎𝗇𝗍𝗎𝗄 𝗆𝖾𝗇𝗀𝗀𝗎𝗇𝖺𝗄𝖺𝗇 𝗉𝖾𝗋𝗂𝗇𝗍𝖺𝗁 𝗂𝗇𝗂", event.threadID, event.messageID);
    }

    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("✨ 𝗙𝗶𝗹𝗲\n━━━━━━━━━━━\n𝖧𝖺𝗋𝖺𝗉 𝗆𝖺𝗌𝗎𝗄𝗄𝖺𝗇 𝗇𝖺𝗆𝖺 𝖿𝗂𝗅𝖾", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`✨ 𝗙𝗶𝗹𝗲\n━━━━━━━━━━━\n𝖳𝗂𝖽𝖺𝗄 𝖺𝖽𝖺 𝖿𝗂𝗅𝖾 𝗒𝖺𝗇𝗀 𝖻𝖾𝗋𝗇𝖺𝗆𝖺: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
