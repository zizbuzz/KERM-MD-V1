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

const config = require('../config')
const { cmd, commands } = require('../command')

cmd({
  pattern: "dlt",
  react: "❌",
  desc: "Delete the bot's messages or other messages (requires admin for others).",
  category: "group",
  use: '.del',
  filename: __filename
},
async (conn, mek, m, { 
  from, 
  quoted, 
  isAdmins, 
  isBotAdmins, 
  isOwner, 
  reply 
}) => {
  try {
    // Vérifier si un message est cité
    if (!quoted) {
      return reply("❌ Please reply to a message to delete it.");
    }

    // Construire la clé pour supprimer le message
    const key = {
      remoteJid: from, // ID du groupe ou du chat
      fromMe: quoted.fromMe, // Vérifie si le message appartient au bot
      id: quoted.id, // ID du message cité
      participant: quoted.sender // Expéditeur du message cité
    };

    // Vérifier si le message cité appartient au bot
    if (quoted.fromMe) {
      // Si le message appartient au bot, supprimer directement
      return await conn.sendMessage(from, { delete: key });
    }

    // Vérifier si le bot est administrateur pour supprimer les messages des autres dans un groupe
    if (m.isGroup) {
      if (!isBotAdmins) {
        return reply("❌ I need admin privileges to delete messages from others.");
      }
      // Supprimer le message
      return await conn.sendMessage(from, { delete: key });
    }

    // Si en privé et le message n'appartient pas au bot
    return reply("❌ I can only delete my messages in private chats.");
  } catch (e) {
    console.error("Error in delete command:", e);
  }
});