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

cmd({
  pattern: "delete",
  react: "❌",
  alias: ["del"],
  desc: "Delete messages (bot's or owner's messages).",
  category: "group",
  use: '.del',
  filename: __filename
},
async (conn, mek, m, { 
  from, 
  quoted, 
  isBotAdmins, 
  isOwner, 
  sender, 
  reply 
}) => {
  try {
    // Vérifier si un message est cité
    if (!quoted) {
      return reply("❌ Please reply to a message to delete it.");
    }

    // Construire la clé pour supprimer le message
    const key = {
      remoteJid: from, // ID du chat ou du groupe
      fromMe: quoted.fromMe, // Vérifie si le message appartient au bot
      id: quoted.id, // ID du message cité
      participant: quoted.sender || m.sender // Définit le participant (utile en privé)
    };

    // Vérifier si le message appartient au bot ou à l'owner
    const isBotMessage = quoted.fromMe; // Message envoyé par le bot
    const isOwnerMessage = quoted.sender === sender; // Message envoyé par l'owner

    if (isBotMessage || isOwnerMessage) {
      // Supprimer le message
      await conn.sendMessage(from, { delete: key });
    } else if (m.isGroup) {
      // Vérifier si le bot est admin pour supprimer les messages des autres dans un groupe
      if (!isBotAdmins) {
        return reply("❌ I need admin privileges to delete messages in this group.");
      }
      // Supprimer un message d'un autre utilisateur dans un groupe
      await conn.sendMessage(from, { delete: key });
    } else {
      // En privé, ne pas supprimer les messages des autres
      return reply("❌ I can only delete my own messages or the owner's messages in private chats.");
    }
  } catch (e) {
    console.error("Error in delete command:", e);
  }
});