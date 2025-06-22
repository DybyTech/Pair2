const express = require('express');
const fs = require('fs');
const pino = require('pino');
const { makeid } = require('./id');
const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');

const {
  default: makeWASocket,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore,
  delay,
  Browsers
} = require('baileys-pro');

const router = express.Router();

// Fonction utilitaire pour supprimer un dossier
function removeFile(path) {
  if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true, force: true });
  }
}

router.get('/', async (req, res) => {
  const id = makeid();
  let num = req.query.number;

  if (!num || typeof num !== 'string') {
    return res.status(400).send({ error: 'Missing or invalid number parameter' });
  }

  async function startPairing() {
    const { state, saveCreds } = await useMultiFileAuthState(`./temp/${id}`);

    try {
      const socket = makeWASocket({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' })),
        },
        browser: Browsers.macOS('Desktop'),
        printQRInTerminal: false,
        logger: pino({ level: 'fatal' }),
      });

      if (!socket.authState.creds.registered) {
        await delay(1500);
        const cleanedNum = num.replace(/[^0-9]/g, '');
        const code = await socket.requestPairingCode(cleanedNum);

        if (!res.headersSent) {
          res.send({ code });
        }
      }

      socket.ev.on('creds.update', saveCreds);

      socket.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'open') {
          await delay(5000);

          const data = fs.readFileSync(`./temp/${id}/creds.json`);
          const b64data = Buffer.from(data).toString('base64');

          const session = await socket.sendMessage(socket.user.id, {
            text: `MEGALODON-MD;;;${b64data}`,
          });

          const infoMessage = `𝙿𝚊𝚒𝚛 𝙲𝚘𝚍𝚎 𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢
𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝙼𝙴𝙶𝙰𝙻𝙾𝙳𝙾𝙽 𝙼𝙳 🤍
╔════◇
║ *『 𝚆𝙾𝚆 𝚈𝙾𝚄'𝚅𝙴 𝙲𝙷𝙾𝚂𝙴𝙽 𝙼𝙴𝙶𝙰𝙻𝙾𝙳𝙾𝙽 𝙼𝙳』*
║ _𝚈𝚘𝚞 𝙷𝚊𝚟𝚎 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎𝚍 𝚝𝚑𝚎 𝙵𝚒𝚛𝚜𝚝 𝚂𝚝𝚎𝚙._
╚══════════════════════╝
╔═════◇
║❒ 𝚈𝚝𝚞𝚋𝚎: https://youtube.com/@dybytech00
║❒ 𝙾𝚠𝚗𝚎𝚛: https://wa.me/50934960331
║❒ 𝚁𝚎𝚙𝚘: https://github.com/DybyTech/MEGALODON-MD
║❒ 𝚆𝚊𝙲𝚑𝚊𝚗𝚗𝚎𝚕: https://whatsapp.com/channel/0029VbAdcIXJP216dKW1253g
╚══════════════════════╝`;

          await socket.sendMessage(socket.user.id, { text: infoMessage }, { quoted: session });

          await delay(100);
          socket.ws.close();
          removeFile(`./temp/${id}`);
        }

        else if (connection === 'close' && lastDisconnect?.error?.output?.statusCode !== 401) {
          await delay(10000);
          startPairing(); // Retry
        }
      });

    } catch (err) {
      console.error('Pairing Error:', err);
      removeFile(`./temp/${id}`);
      if (!res.headersSent) {
        res.status(503).send({ code: 'Service Unavailable' });
      }
    }
  }

  await startPairing();
});

module.exports = router;
