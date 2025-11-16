const { default: makeWASocket, useMultiFileAuthState, DisconnectReason} = require('@whiskeysockets/baileys');
const { Boom} = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const config = require('./config');
require('dotenv').config();

async function startBot() {
  const { state, saveCreds} = await useMultiFileAuthState('session');

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
});

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect} = update;
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode!== DisconnectReason.loggedOut;
      console.log('connection closed due to', lastDisconnect.error, ', reconnecting', shouldReconnect);
      if (shouldReconnect) {
        startBot();
}
} else if (connection === 'open') {
      console.log('✅ Bot connected as', sock.user.name);
}
});

  sock.ev.on('messages.upsert', async ({ messages}) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const type = Object.keys(msg.message)[0];
    const body = msg.message.conversation || msg.message[type]?.text || '';
    const prefix = config.prefix;
    const isCmd = body.startsWith(prefix);
    const command = isCmd? body.slice(prefix.length).trim().split(' ')[0].toLowerCase(): '';

    if (isCmd) {
      switch (command) {
        case 'ping':
          await sock.sendMessage(from, { text: 'pong!'}, { quoted: msg});
          break;
        case 'menu':
          const menu = `
╭──「 *NOGAME-MD BOT* 」
│ Dev: ${config.ownerName}
│ Mode: ${config.mode}
│ Prefix: ${prefix}
│ Chèn: ${config.channelLink}
╰───────────────╮

📂 *MAIN MENU*
• ${prefix}menu
• ${prefix}ping

📁 *GROUP MENU*
• ${prefix}tagall
• ${prefix}hidetag

📥 *DOWNLOAD MENU*
• ${prefix}ytmp3
• ${prefix}ytmp4

🧠 *AI MENU*
• ${prefix}ai
• ${prefix}img

🎮 *GAMES MENU*
• ${prefix}guess
• ${prefix}math

🛠 *OWNER MENU*
• ${prefix}block
• ${prefix}unblock

🌀 *OTHER MENU*
• ${prefix}quote
• ${prefix}fact

╰───────────────╯
`;
          await sock.sendMessage(from, { text: menu}, { quoted: msg});
          break;
        default:
          await sock.sendMessage(from, { text: '❌ Kòmand sa pa egziste.'}, { quoted: msg});
}
}
});
}

startBot();
