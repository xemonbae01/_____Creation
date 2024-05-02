const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

const KievRPSSecAuth = 'FADyAxRaTOJILtFsMkpLVWSG6AN6C/svRwNmAAAEgAAACFnd+1gihYlusAM+OOUoV4cdsASDvQvph9RDOgmmzjy1MD6TqdzTMs9BrA0g583VYhLgiSlOS8phXGquaJsovqQFJoMkZIM4WLJeygZoS6IyAoQbIPlu34scT4MnTY/5JFTbaGrarEMf1vRVNY6uO0CoEmzYDGF2+TliZPCqncQxVGkRwJ2TIRSvuwcCNJf7Bmd9G7Z7MjoeEt8/b4AvZH94dGW0gtpkOZcg4KVL9gqF49wsgGCBwnd0NFXXvh/O76uh9+c7L1g3wG8fDfECZYLLXltpPm1iYmBXMXULuh52a6fEMsbDf3HQbNsWtQkNVL/ipoPymItcwqjl0rtAGbtBQuT0VV+5B4m0SUhue0zKksaEiKc5LzNO+6CJEtFZXPDYppSNHPo8hTK9qZGEsjWURojE2NBBtzLUq4KaoLVZf7kdRiWW26+Ste9Jb13vDIyM4O30UmFfEPeQ/mxPSuVJJDEeqc1gSgqP0Jp/CeA325DY2xpxbjj+YnqYm/m8ulmKeSw5zFOCJS1myx+SoAy0kqOFSfL6WpfVB9Loz8VDEMGrK2hiZbw3WQhlhV8ivnHibHhOnPrn17A/6HGbKE5B6wIsbB2Zrd1JPQL4si8kFCf1DeSZMhRrxF6QXHA7ahzeifrMFNjarv3AfFYXVGvj4eQoYk2pwBDlWG1FF9aJK6Ivg9pJEJDoZIG885ySMzpUXoh8DPOL6V7Anr9foWUHvd1OFmAR4lpjwXLeZbqvxmnmZf8CB3J+4dJJPnCVNVYOqrz2KXp6O1Bqnlpfatv9I3h+1WaOpqE4DqPSIyTlxsWoXMCzsJf9RS1qkhsJlSNOYBXphpTB1feA1WyHwYYXAZd9N9I1/YrnPGG+TQx7oPNJraFUBrzxEoOGLbgomOn1E1Gf//431zt4Up0hQ8Q2gIfq4pMsF1O4u5XyMvlKLjcp4xHzUSmTxNjb5S5anjiMCmK7Sex46fROQhrlTNfvnYAih+rBLpXyep9+qclteySI3gXVX0+939Sa2dOXvGJzoDBHnvOgtl1TJR7ZFuC66jF1QNCj1hl3rE1l3dx/cbTZjxzRAN51yWjsIWjGOUJkXh1PiVmCXzK01nDgGXeKWJmM5n3bGcSUEir9jA3iyGUxc7n6Je/HsnWQk90+NT8isb2vQEsDyikfYGMh6oUiTXOMwTcuHiieR4HaEYSHIbb2rqGzbTQV6oCDaDljmfXCzQpleIbnFiE2B7AP4NHXtboTSPcJHUOUAGm71gpUKiHGDTV6LH812BQAcN36177EB0vKH03EtuPyjxjgIl0=';
const _U = '1CH5woc_siwrnN6bFkmtef_5MH5THJTXH4aDem3RNeo0Ja9Y5PahYz-IhYSeNaFAKySjvBFoLILsIoHI_-RMHIW0I3ppQHd-g7MBMsj6O0WdQDxTAmAi_5lTsQNt3GzeZ592TdQuSJ_IFAh1zpRMX3HKiwW2PhA9c3uMy73-oLHM';
const uid = "6554106931280806";

module.exports = {
  config: {
    name: "dalle",
    aliases: ["buat","create"],
    version: "1.0.2",
    author: "Samir Œ",
    role: 0,
    countDown: 10,
    shortDescription: {
      en: "IMAGEN"
    },
    longDescription: {
      en: "Generate image using Dalle"
    },
    category: "fun",
    guide: {
      en: "{prefix}dalle <query>"
    }
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    if (!event.isGroup) return;

    const p = await global.utils.getPrefix(event.threadID);
    const name = `@${await usersData.getName(event.senderID)}`;
    const q = args.join(" ");

    if (!q) {
      message.send(`Harap berikan petunjuk yang jelas!\ncontoh: ${p+this.config.name} pemandangan kota paris ditahun 2077`);
      return;
    }

    const wait = await message.send({body:"Baiklah, aku akan mencoba membuatnya... 🎨", attachment: await global.utils.getStreamFromURL("https://i.ibb.co/Sdnp7HQ/received-376584025322452.jpg")});

    try {
      const startTime = new Date();
      const res = await axios.get(`https://api-dalle-gen.onrender.com/dalle3`, {
        params: {
          auth_cookie_U: _U,
          auth_cookie_KievRPSSecAuth: KievRPSSecAuth,
          prompt: q
        }
      });
      
      const data = res.data.results.images;

      if (!data || data.length === 0) {
        api.sendMessage("Tidak ada gambar yang ditemukan untuk kueri yang diberikan.", event.threadID, event.messageID);
        return;
      }

      const imgData = [];

      for (let i = 0; i < Math.min(4, data.length); i++) {
        const imgResponse = await axios.get(data[i].url, { responseType: 'arraybuffer' });
        const imgPath = path.join(__dirname, 'cache', `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }
       const endTime = new Date();
       const elapsedTime = (endTime - startTime) / 1000;
      await message.reply({
        attachment: imgData,
        body: `✨ ${name} ini gambar kamu! ✨\n🎨 Prompt: ${q}\n⏱️ waktu yang dibutuhkan: ${elapsedTime}s\n`,
        mentions: [{
          tag: name,
          id: event.senderID,
        }]
      });

      message.unsend(wait.messageID);
    } catch (error) {
      console.error(error);
      message.unsend(wait.messageID);
      api.sendMessage("Prompt is blocked.", event.threadID, event.messageID);
    } finally {
      await fs.remove(path.join(__dirname, 'cache'));
    }
  }
};
