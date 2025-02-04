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

const { cmd } = require("../command");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Objet global pour stocker l'état actif du Squid Game pour chaque groupe
// Pour chaque groupe, on stocke un objet { active: true, kicked: [] }
const activeSquidGame = {};

// Commande Squidgame (seulement par admin ou owner)
cmd({
  pattern: "squidgame",
  desc: "Lance Squid Game : pendant 2,5 minutes, ne parlez PAS sinon vous serez expulsé !",
  category: "group",
  filename: __filename
}, async (client, mek, m, { from, isAdmin, isOwner, reply }) => {
  try {
    // Vérifier que seuls les admins ou le propriétaire peuvent lancer la commande
    if (!isAdmin && !isOwner) {
      return reply("❌ Seuls les admins ou le propriétaire peuvent lancer Squid Game.");
    }

    // Activer le mode Squid Game pour ce groupe avec un tableau pour les expulsés
    activeSquidGame[from] = { active: true, kicked: [] };

    // Envoyer un message initial indiquant l'interdiction de parler
    await client.sendMessage(from, {
      text: "🔴 *Squid Game* : Ne parlez PAS pendant 2,5 minutes sinon vous serez expulsé !"
    }, { quoted: mek });

    // Attendre 2,5 minutes (150 000 ms)
    await delay(150000);

    // Récupérer la liste des expulsés pour ce groupe
    const kickedList = activeSquidGame[from].kicked;
    // Désactiver le mode Squid Game pour ce groupe
    delete activeSquidGame[from];

    // Construire le message final avec l'icône verte et le récapitulatif des expulsions (s'il y en a)
    let finalMessage = "🟢 *Squid Game Terminé* : Vous pouvez maintenant parler !";
    if (kickedList && kickedList.length > 0) {
      finalMessage += `\n\n💥 *Expulsions* : ${kickedList.map(id => `<@${id.split("@")[0]}>`).join(", ")}`;
    }
    await client.sendMessage(from, { text: finalMessage }, { quoted: mek });

  } catch (error) {
    console.error("Error in squidgame command:", error);
    reply("❌ Une erreur est survenue lors du lancement de Squid Game.");
  }
});

// Écouteur d'événement pour surveiller les messages dans le groupe pendant Squid Game
client.on('chat-update', async (chatUpdate) => {
  try {
    if (!chatUpdate.hasNewMessage) return;
    const m = chatUpdate.messages.all()[0];
    if (!m.message) return;
    
    const groupId = m.key.remoteJid;
    // Vérifier que Squid Game est actif dans ce groupe
    if (!activeSquidGame[groupId] || !activeSquidGame[groupId].active) return;

    // Obtenir l'ID de l'expéditeur du message
    const sender = m.key.participant || m.key.remoteJid;
    // Ignorer le bot lui-même
    if (sender === client.user.jid) return;

    // Récupérer les métadonnées du groupe pour vérifier si l'expéditeur est admin
    const groupMeta = await client.groupMetadata(groupId);
    const isSenderAdmin = groupMeta.participants.some(p => p.id === sender && (p.admin === "admin" || p.admin === "superadmin"));
    if (isSenderAdmin) return; // Ne pas expulser les admins

    // Expulser le membre qui a envoyé un message pendant Squid Game
    await client.groupParticipantsUpdate(groupId, [sender], "remove")
      .catch(err => console.error(`⚠️ Échec de l'expulsion de ${sender}:`, err));
    
    // Ajouter l'ID expulsé dans la liste du Squid Game pour ce groupe
    activeSquidGame[groupId].kicked.push(sender);
    
    // Envoyer un message d'information dans le groupe
    await client.sendMessage(groupId, {
      text: `❌ <@${sender.split("@")[0]}> a été expulsé pour avoir parlé pendant Squid Game !`
    }, { quoted: m, mentions: [sender] });

  } catch (err) {
    console.error("Error in Squid Game message handler:", err);
  }
});