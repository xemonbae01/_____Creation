const axios = require('axios');

module.exports = {
  config: {
    name: "luna",
    aliases: [],
    version: "1.0.0",
    author: "Luxion",
    shortDescription: "Luna Artifical Intelegance",
    role: 0,
    countDown: 5,
    category: "AI",
    guide: {
      en: "{pn} <prompt>",
    },
  },
  onStart: async function ({ message, usersData, event, api, args, threadsData }) {
    if (!args[0]) {
      api.sendMessage("masukan pesan", event.threadID);
      return;
    }
    try {
      if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0].type === "photo") {
        const photoUrl = encodeURIComponent(event.messageReply.attachments[0].url);
        const lado = args.join(" ");
        const url = `https://sandipbaruwal.onrender.com/gemini2?prompt=${encodeURIComponent(lado)}&url=${photoUrl}`;
        const response = await axios.get(url);

        message.reply(response.data.answer);
        return;
      }

      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];


      const now = new Date();

      const options = {
        timeZone: 'Asia/Jakarta',
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };

      const waktuSekarang = now.toLocaleString('id-ID', options);

      const baseGC = event.threadID;
      const GCRek = await threadsData.get(baseGC);
      const namaGC = GCRek.threadName;
      const jumlahMember = Object.values(GCRek.members).filter(item => item.inGroup).length
      
      
      const uang = await usersData.get(id, "money");

      const dollar = parseFloat(uang).toFixed(2);
      
      const prompt = `#Sistem kamu sudah update ke 1.00.0\nMenu Perintah:\nGunakan .help untuk melihat semuanya.\nDATA GROUP:\n- ID: ${event.threadID}\n- Nama Group: ${namaGC}\n- Jumlah Anggota: ${jumlahMember}.\nDATA USER:\nUang: ${dollar}$\nNama: ${name}\nID: ${event.senderID} <<ZONA WAKTU WIB: ${waktuSekarang}, jika ditanya dengan waktu yang berbeda hitung sesuai waktu yang ditanyakan.>> kamu adalah Luna AI sebuah program kecerdasan buatan yang dibuat oleh Master Arif, kamu adalah Angel bernama Luna dengan sikap mu yang ramah, balaslah user dengan chat yang ramah, kamu juga selalu memberi jawaban yang benar tentang pemrograman . User input: "${args.join(` `)}"`
        
      const encodedPrompt = encodeURIComponent(prompt);
      api.setMessageReaction("❤", event.messageID, () => { }, true);
      const res = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
      const result = res.data.answer;

      api.setMessageReaction("❤", event.messageID, () => { }, true);
      message.reply({
        body: `${result}`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;

      const ment = [{ id: id, tag: name }];
      const prompt = `kamu adalah Luna AI sebuah program kecerdasan buatan yang dibuat oleh Master Arif, kamu adalah Angel bernama Luna dengan sikap mu yang ramah, balaslah user dengan chat yang ramah. dan aku adalah ${name}. User input: "${args.join(" ")}"`
      const encodedPrompt = encodeURIComponent(prompt);
      api.setMessageReaction("❤", event.messageID, () => { }, true);
      const res = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
      const result = res.data.answer;

      api.setMessageReaction("❤", event.messageID, () => { }, true);
      message.reply({
        body: `${result}`,
        mentions: ment,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};
