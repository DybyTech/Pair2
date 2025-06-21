const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Venocyber_Tech,    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function VENOCYBER_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_Venocyber_Tech = Venocyber_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({level: "fatal"}).child({level: "fatal"}),
                browser: ["Chrome (Linux)", "", ""]
             });
             if(!Pair_Code_By_Venocyber_Tech.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_Venocyber_Tech.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_Venocyber_Tech.ev.on('creds.update', saveCreds)
            Pair_Code_By_Venocyber_Tech.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(5000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(800);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_Venocyber_Tech.sendMessage(Pair_Code_By_Venocyber_Tech.user.id, { text: 'MEGALODON-MD;;;' + b64data });

               let VENOCYBER_MD_TEXT = `𝙿𝚊𝚒𝚛 𝙲𝚘𝚍𝚎 𝙲𝚘𝚗𝚗𝚎𝚌𝚝𝚎𝚍 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢
𝙼𝚊𝚍𝚎 𝚆𝚒𝚝𝚑 𝙼𝙴𝙶𝙰𝙻𝙾𝙳𝙾𝙽 𝙼𝙳 🤍
_______________________________
╔════◇
║ *『 𝚆𝙾𝚆 𝚈𝙾𝚄'𝚅𝙴 𝙲𝙷𝙾𝚂𝙴𝙽 𝙼𝙴𝙶𝙰𝙻𝙾𝙳𝙾𝙽 𝙼𝙳』*
║ _𝚈𝚘𝚞 𝙷𝚊𝚟𝚎 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎𝚍 𝚝𝚑𝚎 𝙵𝚒𝚛𝚜𝚝 𝚂𝚝𝚎𝚙 𝚝𝚘 𝙳𝚎𝚙𝚕𝚘𝚢 𝚊 𝚆𝚑𝚊𝚝𝚜𝚊𝚙𝚙 𝙱𝚘𝚝._
╚══════════════════════╝
╔═════◇
║  『••• 𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽 •••』
║❒ 𝚈𝚝𝚞𝚋𝚎: https://youtube.com/@dybytech00
║❒ 𝙾𝚠𝚗𝚎𝚛: https://wa.me/50934960331
║❒ 𝚁𝚎𝚙𝚘: https://github.com/DybyTech/MEGALODON-MD
║❒ 𝚆𝚊𝙲𝚑𝚊𝚗𝚗𝚎𝚕: https://whatsapp.com/channel/0029VbAdcIXJP216dKW1253g
║❒ 𝚃𝙷𝙰𝙽𝙺𝚂 𝚃𝙾: 𝚂𝚃𝙴𝙴𝚅𝚈 𝚃𝙴𝙲𝙷 & 𝘞𝘈𝘚𝘐-𝘛𝘌𝘊𝘏
╚══════════════════════╝`
 await Pair_Code_By_Venocyber_Tech.sendMessage(Pair_Code_By_Venocyber_Tech.user.id,{text:VENOCYBER_MD_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_Venocyber_Tech.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    VENOCYBER_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service Unavailable"});
         }
        }
    }
    return await VENOCYBER_MD_PAIR_CODE()
});
module.exports = router
