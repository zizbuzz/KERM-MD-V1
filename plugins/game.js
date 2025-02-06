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
    desc: "Simulate a match between two teams and choose a winner randomly after 30 seconds.",
    category: "game",
    react: "⚽",
    filename: __filename,
    use: ".konami"
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        // Liste étendue des clubs et équipes internationales avec leurs emojis
        const teams = [
            "Real Madrid 🇪🇸",
            "FC Barcelone 🇪🇸",
            "Manchester United 🇬🇧",
            "Liverpool FC 🇬🇧",
            "Bayern Munich 🇩🇪",
            "Juventus 🇮🇹",
            "Paris Saint-Germain 🇫🇷",
            "Arsenal FC 🇬🇧",
            "AC Milan 🇮🇹",
            "Inter Milan 🇮🇹",
            "Chelsea FC 🇬🇧",
            "Borussia Dortmund 🇩🇪",
            "Cameroun 🇨🇲",
            "Côte D'Ivoire 🇨🇮",
            "Tottenham Hotspur 🇬🇧",
            "Sénégal 🇸🇳",
            "RDC 🇨🇩",
            "Congo 🇨🇬",
            "Ajax Amsterdam 🇳🇱",
            "FC Porto 🇵🇹",
            "SL Benfica 🇵🇹",
            "Olympique Lyonnais 🇫🇷",
            "Olympique de Marseille 🇫🇷",
            "AS Monaco 🇫🇷",
            "Sporting CP 🇵🇹",
            "Everton FC 🇬🇧",
            "West Ham United 🇬🇧",
            "Atletico Madrid 🇪🇸",
            "AS Roma 🇮🇹",
            "Fiorentina 🇮🇹",
            "Napoli 🇮🇹",
            "Celtic FC 🇬🇧",
            "Rangers FC 🇬🇧",
            "Feyenoord 🇳🇱",
            "PSV Eindhoven 🇳🇱",
            "Brazil 🇧🇷",
            "Germany 🇩🇪",
            "Argentina 🇦🇷",
            "France 🇫🇷",
            "Spain 🇪🇸",
            "Italy 🇮🇹",
            "England 🏴",
            "Portugal 🇵🇹",
            "Netherlands 🇳🇱",
            "Belgium 🇧🇪",
            "Mexico 🇲🇽",
            "Uruguay 🇺🇾",
            "USA 🇺🇸"
            // Ajoutez d'autres équipes si nécessaire
        ];

        // Sélection aléatoire de deux équipes différentes
        const team1 = teams[Math.floor(Math.random() * teams.length)];
        let team2 = teams[Math.floor(Math.random() * teams.length)];
        while (team2 === team1) {
            team2 = teams[Math.floor(Math.random() * teams.length)];
        }

        // Annonce du match versus
        const announcement = `⚽ *Match Versus*\n\n${team1} 🆚 ${team2}\n\n@${sender.split("@")[0]}, choisis le gagnant ! Tu as 30 secondes pour réfléchir.`;
        await reply(announcement, { mentions: [sender] });

        // Attendre 30 secondes
        await new Promise(resolve => setTimeout(resolve, 30000));

        // Choix aléatoire du gagnant parmi les deux équipes
        const chosenTeam = Math.random() < 0.5 ? team1 : team2;

        // Message final annonçant le gagnant
        const resultMessage = `🏆 *Résultat du Match*\n\nLe gagnant est : ${chosenTeam}\n\nIci le resulta @${sender.split("@")[0]} !`;
        await reply(resultMessage, { mentions: [sender] });
    } catch (error) {
        console.error("Error in konami command:", error);
        reply("❌ Une erreur est survenue lors de l'exécution de la commande konami.");
    }
});