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

const { delay } = require("@whiskeysockets/baileys");
const { cmd } = require("../command");

cmd({
  pattern: "squidgame",
  desc: "Lancer le jeu Squid Game dans un groupe",
  category: "fun",
  filename: __filename
}, async (conn, mek, m, { isAdmin, isOwner, participants, reply }) => {
  try {
    if (!m.isGroup) return reply("❌ Cette commande ne peut être utilisée que dans les groupes.");
    if (!isAdmin && !isOwner) return reply("❌ Seuls les admins peuvent utiliser cette commande.");

    let groupMembers = participants.filter(p => !p.admin); // Exclure les admins
    if (groupMembers.length < 5) return reply("⚠️ Il faut au moins 5 membres non-admins pour jouer.");

    let gameCreator = "@" + m.sender.split("@")[0];

    // Message d'annonce du jeu
    let gameMessage = `🔴 *Squid Game: Red Light,🟢Green Light*\n\n🎭 *Front Man*: (${gameCreator})\n`;
    gameMessage += groupMembers.map(m => "@" + m.id.split("@")[0]).join("\n") + "\n\n";
    gameMessage += "Tous les autres membres du groupe sont ajoutés comme joueurs ! Le jeu commence dans 50 secondes.";

    await conn.sendMessage(m.chat, { text: gameMessage, mentions: groupMembers.map(m => m.id) });

    await delay(50000); // Attente de 50s avant de sélectionner les joueurs

    // Sélectionner 50 joueurs aléatoires
    let players = groupMembers.sort(() => 0.5 - Math.random()).slice(0, 5);

    let playersList = players.map((p, i) => `${i + 1}. @${p.id.split("@")[0]}`).join("\n");

    await conn.sendMessage(m.chat, {
      text: `🎮 *Liste des joueurs:*\n${playersList}\n\n🔔 Le jeu commence maintenant !`,
      mentions: players.map(p => p.id)
    });

    await delay(3000);

    // Explication des règles
    let rulesMessage = `📜 *Règles du Squid Game:*\n\n`
      + `1️⃣ Pendant 🟥 *Red Light*, les joueurs qui envoient un message seront *éliminés* et *expulsés* du groupe.\n\n`
      + `2️⃣ Pendant 🟩 *Green Light*, les joueurs doivent envoyer un message. Ceux qui restent silencieux seront éliminés.\n\n`
      + `3️⃣ Le jeu se termine lorsqu'il ne reste plus qu'un seul joueur.\n\n`
      + `🏆 Survis pour devenir le *gagnant* !`;

    await conn.sendMessage(m.chat, { text: rulesMessage });

    await delay(5000);

    let remainingPlayers = [...players];
    while (remainingPlayers.length > 1) {
      let isGreenLight = Math.random() > 0.5;
      let lightMessage = isGreenLight ? "🟩 *Green Light*" : "🟥 *Red Light*";
      await conn.sendMessage(m.chat, { text: `🔔 ${lightMessage}` });

      await delay(5000); // Délai de 5s entre chaque phase

      let playersToKick = [];
      let spokenPlayers = new Set(); // Stocke ceux qui ont parlé

      conn.ev.on("messages.upsert", (msg) => {
        let sender = msg.messages[0].key.remoteJid;
        if (remainingPlayers.find(p => p.id === sender)) spokenPlayers.add(sender);
      });

      if (isGreenLight) {
        // Vérifier qui ne parle pas
        for (let player of remainingPlayers) {
          if (!spokenPlayers.has(player.id)) {
            playersToKick.push(player);
          }
        }
      } else {
        // Vérifier qui parle
        for (let player of remainingPlayers) {
          if (spokenPlayers.has(player.id)) {
            playersToKick.push(player);
          }
        }
      }

      for (let player of playersToKick) {
        await conn.groupParticipantsUpdate(m.chat, [player.id], "remove");
        let eliminationMessage = isGreenLight
          ? `❌ @${player.id.split("@")[0]} est resté silencieux pendant 🟩 *Green Light* et a été éliminé et expulsé du groupe.`
          : `❌ @${player.id.split("@")[0]} a écrit pendant 🟥 *Red Light* et a été éliminé et expulsé du groupe.`;

        await conn.sendMessage(m.chat, {
          text: eliminationMessage,
          mentions: [player.id]
        });
      }

      remainingPlayers = remainingPlayers.filter(p => !playersToKick.includes(p));
    }

    if (remainingPlayers.length === 1) {
      await conn.sendMessage(m.chat, {
        text: `🏆 *Félicitations @${remainingPlayers[0].id.split("@")[0]} !*\nTu as survécu et remporté le Squid Game ! 🎉`,
        mentions: [remainingPlayers[0].id]
      });
    }
  } catch (error) {
    console.error("Erreur dans la commande .squidgame:", error);
    reply("❌ Une erreur s'est produite lors du lancement du Squid Game.");
  }
});

cmd({
    pattern: "konami",
    desc: "Simule un match entre deux clubs et affiche le résultat final.",
    category: "game",
    react: "⚽",
    filename: __filename,
    use: ".konami"
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        // Liste étendue des clubs avec leurs emojis
        const clubs = [
            { name: "FC Barcelone", emoji: "🔵🔴" },
            { name: "Real Madrid", emoji: "⚪️🔵" },
            { name: "Manchester United", emoji: "🔴" },
            { name: "Liverpool", emoji: "🔴" },
            { name: "Bayern Munich", emoji: "🔴⚪️" },
            { name: "Juventus", emoji: "⚫️⚪️" },
            { name: "Paris Saint-Germain", emoji: "🔵🔴" },
            { name: "Arsenal", emoji: "🔴" },
            { name: "AC Milan", emoji: "🔴⚫️" },
            { name: "Inter Milan", emoji: "🔵🔴" },
            { name: "Chelsea", emoji: "🔵" },
            { name: "Borussia Dortmund", emoji: "🟡⚫️" },
            { name: "Tottenham", emoji: "⚪️🔴" },
            { name: "Atletico Madrid", emoji: "🔴⚪️" },
            { name: "Ajax", emoji: "🔴⚪️" },
            { name: "Porto", emoji: "🔵" },
            { name: "Benfica", emoji: "🟥" },
            { name: "Lyon", emoji: "🔵" },
            { name: "Marseille", emoji: "🔵⚪️" },
            { name: "AS Monaco", emoji: "🔵🔴" },
            { name: "Sporting CP", emoji: "🟢" },
            { name: "Everton", emoji: "🔵" },
            { name: "West Ham United", emoji: "🔴" },
            { name: "AS Roma", emoji: "🟥" },
            { name: "Fiorentina", emoji: "🟣" },
            { name: "Napoli", emoji: "🔵" },
            { name: "Celtic", emoji: "🟢" },
            { name: "Rangers", emoji: "🔴" },
            { name: "Feyenoord", emoji: "🟡🔴" },
            { name: "PSV Eindhoven", emoji: "🔴" },
            { name: "Real Sociedad", emoji: "🔵⚪️" },
            { name: "Sevilla", emoji: "🔴" },
            { name: "Villarreal", emoji: "🔶" },
            { name: "Valencia", emoji: "🟡" },
            { name: "Leicester City", emoji: "🔵" },
            { name: "Newcastle United", emoji: "⚫️⚪️" },
            { name: "Aston Villa", emoji: "🔴" },
            { name: "Southampton", emoji: "🔴" },
            { name: "Crystal Palace", emoji: "🔴" },
            { name: "Wolverhampton", emoji: "🟠" },
            { name: "Borussia Mönchengladbach", emoji: "🟢" },
            { name: "Schalke 04", emoji: "🔴" },
            { name: "Sporting Braga", emoji: "🔵" },
            { name: "Zenit Saint-Pétersbourg", emoji: "🔵" },
            { name: "FC Shakhtar Donetsk", emoji: "🟡" }
            // Vous pouvez ajouter d'autres clubs si besoin
        ];

        // Sélection aléatoire de deux clubs différents
        const club1 = clubs[Math.floor(Math.random() * clubs.length)];
        let club2 = clubs[Math.floor(Math.random() * clubs.length)];
        while (club2.name === club1.name) {
            club2 = clubs[Math.floor(Math.random() * clubs.length)];
        }

        // Message d'annonce du match
        const startMessage = `⚽ *Annonce du Match*\n\nLe match entre *${club1.name} ${club1.emoji}* et *${club2.name} ${club2.emoji}* va commencer dans 3 secondes !`;
        await reply(startMessage, { mentions: [sender] });

        // Attendre 3 secondes avant de simuler le match
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Générer aléatoirement les scores entre 0 et 50
        const score1 = Math.floor(Math.random() * 51);
        const score2 = Math.floor(Math.random() * 51);

        let resultMessage;
        // Si le score est exactement 1-1, afficher "million"
        if (score1 === 1 && score2 === 1) {
            resultMessage = `🔥 *Million* 🔥\n\n@${sender.split("@")[0]}, le match s'est terminé sur 1-1, ce qui est considéré comme un résultat *Million*!`;
        } else {
            const total = score1 + score2;
            resultMessage = `⚽ *Résultat du Match*\n\n*${club1.name} ${club1.emoji}* ${score1} - ${score2} *${club2.name} ${club2.emoji}*\n\nTotal : ${total} points pour @${sender.split("@")[0]}.`;
        }

        // Envoyer le résultat final en mentionnant l'utilisateur qui a lancé la commande
        await reply(resultMessage, { mentions: [sender] });
    } catch (error) {
        console.error("Error in konami command:", error);
        reply("❌ Une erreur est survenue lors de l'exécution de la commande konami.");
    }
});