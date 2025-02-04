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

// Objet global pour stocker l'état actif du Squid Game pour chaque groupe (key = group ID)
const activeSquidGame = {};

// Commande Squidgame (seulement pour admins/owner)
cmd({
  pattern: "squidgame",
  desc: "Lance le jeu Squid Game : pendant 2,5 minutes, personne ne doit parler sinon il sera expulsé.",
  category: "group",
  filename: __filename
}, async (conn, mek, m, { from, isAdmin, isOwner, reply }) => {
  try {
    // Vérifier que seul un admin ou le propriétaire peut lancer la commande
    if (!isAdmin && !isOwner) {
      return reply("❌ Seuls les admins ou le propriétaire peuvent lancer Squid Game.");
    }

    // Activer le mode Squid Game pour ce groupe
    activeSquidGame[from] = true;

    // Envoyer un message avec un bouton rouge pour indiquer qu'il ne faut pas parler
    await conn.sendMessage(from, {
      text: "🔴 *Squid Game* : Ne parlez PAS pendant 2,5 minutes sinon vous serez expulsé !"
    }, { quoted: mek });

    // Attendre 2,5 minutes (150 000 ms)
    await delay(150000);

    // Désactiver le mode Squid Game pour ce groupe
    delete activeSquidGame[from];

    // Envoyer le message autorisant à parler (bouton vert)
    await conn.sendMessage(from, {
      text: "🟢 *Squid Game Terminé* : Vous pouvez maintenant parler !"
    }, { quoted: mek });

  } catch (error) {
    console.error("Error in squidgame command:", error);
    reply("❌ Une erreur est survenue lors du lancement de Squid Game.");
  }
});


// Écouteur d'événement pour surveiller les messages dans le groupe
conn.on('chat-update', async (chatUpdate) => {
  try {
    // Vérifier qu'il y a bien un nouveau message
    if (!chatUpdate.hasNewMessage) return;
    const m = chatUpdate.messages.all()[0];
    if (!m.message) return;

    const groupId = m.key.remoteJid;
    // Ne traiter que si Squid Game est actif dans le groupe
    if (!activeSquidGame[groupId]) return;

    // Obtenir l'ID de l'expéditeur du message
    const sender = m.key.participant || m.key.remoteJid;

    // On suppose que la propriété isAdmin est disponible via le framework, sinon, il faudra récupérer la liste des admins
    // Pour cet exemple, nous ne kickons que si le message vient d'un membre (non-admin) ; 
    // on ne vérifie pas ici isAdmin ou isOwner car ces vérifications dépendent de ton environnement.
    // Vous pouvez adapter la logique en conséquence.

    // Si le message provient du bot lui-même, ignorer
    if (sender === conn.user.jid) return;

    // Ici, vous pouvez ajouter une vérification supplémentaire pour éviter de kicker les admins.
    // Supposons que nous ayons une fonction isGroupAdmin(conn, groupId, sender) qui renvoie true si l'expéditeur est admin.
    // Exemple (à adapter selon ton framework) :
    // if (await isGroupAdmin(conn, groupId, sender)) return;

    // Expulser le membre qui a envoyé un message pendant le Squid Game
    await conn.groupParticipantsUpdate(groupId, [sender], "remove");
    // Envoyer un message d'information dans le groupe
    await conn.sendMessage(groupId, {
      text: `❌ <@${sender.split("@")[0]}> a été expulsé pour avoir parlé pendant Squid Game !`
    }, { quoted: m, mentions: [sender] });

  } catch (err) {
    console.error("Error in Squid Game message handler:", err);
  }
});
