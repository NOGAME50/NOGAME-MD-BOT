module.exports = [
  // GROUP MENU
  {
    name: "closetime",
    desc: "Fè group la fèmen pou tout moun",
    category: "Group",
    run: async ({ sock, m }) => {
      await sock.groupSettingUpdate(m.from, "announcement");
      await sock.sendMessage(m.from, { text: "🔒 Group la fèmen." }, { quoted: m });
    },
  },
  {
    name: "opentime",
    desc: "Fè group la ouvè pou tout moun",
    category: "Group",
    run: async ({ sock, m }) => {
      await sock.groupSettingUpdate(m.from, "not_announcement");
      await sock.sendMessage(m.from, { text: "🔓 Group la ouvè." }, { quoted: m });
    },
  },
  {
    name: "kick",
    desc: "Retire yon moun nan group la",
    category: "Group",
    run: async ({ sock, m }) => {
      if (!m.mentionedJid[0]) return m.reply("Tag moun ou vle retire.");
      await sock.groupParticipantsUpdate(m.from, [m.mentionedJid[0]], "remove");
      await m.reply("👢 Moun nan retire.");
    },
  },
  {
    name: "add",
    desc: "Ajoute yon moun nan group la",
    category: "Group",
    run: async ({ sock, m, args }) => {
      if (!args[0]) return m.reply("Mete nimewo moun nan.");
      const number = args[0].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
      await sock.groupParticipantsUpdate(m.from, [number], "add");
      await m.reply("✅ Moun nan ajoute.");
    },
  },

  // DOWNLOAD MENU (egzanp senp)
  {
    name: "play",
    desc: "Jwe mizik pa non",
    category: "Download",
    run: async ({ sock, m, args }) => {
      if (!args[0]) return m.reply("Mete non chante a.");
      await sock.sendMessage(m.from, { text: 🎵 Ap chèche mizik: ${args.join(" ")} }, { quoted: m });
    },
  },

  // OWNER MENU
  {
    name: "shutdown",
    desc: "Fè bot la fèmen",
    category: "Owner",
    run: async ({ sock, m }) => {
      await m.reply("🛑 Bot la ap fèmen...");
      process.exit();
    },
  },
  {
    name: "restart",
    desc: "Rekòmanse bot la",
    category: "Owner",
    run: async ({ sock, m }) => {
      await m.reply("♻️ Bot la ap rekòmanse...");
      process.exit(1);
    },
  },

  // CONVERT MENU (egzanp senp)
  {
    name: "toaudio",
    desc: "Konvèti videyo an odyo",
    category: "Convert",
    run: async ({ sock, m }) => {
      await m.reply("🎶 Videyo konvèti an odyo.");
    },
  },

  // AI MENU (egzanp senp)
  {
    name: "chatgpt",
    desc: "Reponn ak AI ChatGPT",
    category: "AI",
    run: async ({ sock, m, args }) => {
      if (!args[0]) return m.reply("Mete kesyon ou.");
      await sock.sendMessage(m.from, { text: 🤖 AI repons pou: ${args.join(" ")} }, { quoted: m });
    },
  },

  // MAIN MENU
  {
    name: "alive",
    desc: "Tcheke si bot la vivan",
    category: "Main",
    run: async ({ sock, m }) => {
      await sock.sendMessage(m.from, { text: "✅ Bot la ap mache byen!" }, { quoted: m });
    },
  },
  {
    name: "menu",
    desc: "Montre tout meni yo",
    category: "Main",
    run: async ({ sock, m }) => {
      const text = `
╭────────────────❏
├❍ GROUP MENU : closetime, opentime, kick, add
├❍ DOWNLOAD MENU : play, ytmp3, ytmp4
├❍ OWNER MENU : shutdown, restart
├❍ CONVERT MENU : toaudio, tomp3, tovideo
├❍ AI MENU : chatgpt, copilot
├❍ MAIN MENU : alive, menu
├❍ OTHER MENU : img, getpp, screenshot
┕────────────────❍
      `;
      await sock.sendMessage(m.from, { text }, { quoted: m });
    },
  },

  // OTHER MENU (egzanp senp)
  {
    name: "img",
    desc: "Chèche yon imaj",
    category: "Other",
    run: async ({ sock, m, args }) => {
      if (!args[0]) return m.reply("Mete mo kle pou imaj la.");
      await sock.sendMessage(m.from, { text: 🖼️ Ap chèche imaj pou: ${args.join(" ")} }, { quoted: m });
    },
  },
];
