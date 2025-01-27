/*
_  ______   _____ _____ _____ _   _
| |/ / ___| |_   _| ____/___ | | | |
| ' / |  _    | | |  _|| |   | |_| |
| . \ |_| |   | | | |__| |___|  _  |
|_|\_\____|   |_| |_____\____|_| |_|

ANYWAY, YOU MUST GIVE CREDIT TO MY CODE WHEN COPY IT
CONTACT ME HERE +237656520674
YT: KermHackTools
Github: Kgtech-cmr
*/

const moment = require("moment");
const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: 'qrcode',
  alias: ['qr'],
  react: '🔄',
  desc: 'Generate a QR code.',
  category: 'main',
  filename: __filename
}, async (conn, mek, m, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) return reply('Please provide text to generate QR code.');
    await reply('> *Kerm Generating QR code...🔄*');
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(q)}&size=200x200`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    
    await conn.sendMessage(m.chat, { image: buffer }, { quoted: m, caption: 'QR Code By Kerm Md' });
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

cmd({
    pattern: "readqr (.*)",  // Le motif correspond à la commande .readqr suivie de l'URL de l'image
    desc: "Decode the QR code from the provided image URL",
    category: "info",
    react: "📷",
    filename: __filename
}, async (conn, mek, m, { reply, from, match }) => {
    try {
        const imageURL = match[1]; // L'URL de l'image fournie après .readqr
        if (!imageURL || !imageURL.startsWith("http")) {
            return reply("❌ Please provide a valid URL to an image.");
        }

        // URL de l'API pour décoder le QR code
        const apiURL = `https://api.qrserver.com/v1/read-qr-code/?fileurl=${encodeURIComponent(imageURL)}`;

        // Effectuer la requête HTTP GET
        const response = await axios.get(apiURL);

        // Vérifier si un QR code a été décodé
        if (response.data && response.data[0] && response.data[0].symbol) {
            const decodedData = response.data[0].symbol[0].data;
            const currentTime = moment().format("HH:mm:ss");

            // Répondre avec les données du QR code
            const replyMessage = `
🕒 *Time*: ${currentTime}
📸 *QR Code Data*:
${decodedData}
            `.trim();

            // Répondre avec le résultat du décodage
            await reply(replyMessage);
        } else {
            return reply("❌ No QR code detected or unable to decode the image.");
        }
    } catch (error) {
        console.error("Error reading QR code:", error);
        return reply("❌ An error occurred while processing the QR code.");
    }
});