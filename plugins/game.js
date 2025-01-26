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


cmd({
  pattern: "wgc",
  react: "🎮",
  alias: ["game"],
  desc: "Start a game with participants",
  category: "games",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, reply }) => {
  if (!isGroup) {
    return reply("❌ Ce jeu ne peut être joué que dans un groupe !");
  }

  let participants = [];
  let gameStarted = false;
  let playerScores = {};

  // Commande "ready" pour rejoindre le jeu
  cmd({
    pattern: "ready",
    react: "✋",
    desc: "Rejoindre le jeu",
    category: "games",
    filename: __filename
  }, async (conn, mek, m, { from, sender }) => {
    if (gameStarted) {
      return reply("❌ Le jeu a déjà commencé, vous ne pouvez plus rejoindre.");
    }

    if (participants.includes(sender)) {
      return reply(`❌ @${sender.split('@')[0]}, vous êtes déjà inscrit !`, { mentions: [sender] });
    }

    participants.push(sender);
    reply(`✔️ @${sender.split('@')[0]} a rejoint le jeu !`, { mentions: [sender] });
  });

  // Commande "start" pour démarrer le jeu
  cmd({
    pattern: "start",
    react: "🚀",
    desc: "Démarrer le jeu",
    category: "games",
    filename: __filename
  }, async (conn, mek, m, { from, sender }) => {
    if (gameStarted) return reply("❌ Le jeu est déjà en cours.");
    if (participants.length < 2) {
      return reply("❌ Il faut au moins 2 participants pour commencer le jeu !");
    }

    gameStarted = true;

    // Annonce du démarrage
    await reply("🎉 Le jeu commencera dans 10 secondes ! Préparez-vous... 🚀");
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Liste des questions
    const questions = [
      { question: "Quel est le plus grand pays du monde ?", answer: "Russie" },
      { question: "Quelle est la capitale de la France ?", answer: "Paris" },
      { question: "Combien de continents y a-t-il sur Terre ?", answer: "7" },
      { question: "Quel est l'animal qui miaule ?", answer: "Chat" },
      { question: "Quel est le fruit jaune et courbé ?", answer: "Banane" }
    ];

    let currentQuestionIndex = 0;

    async function askQuestion(player) {
      if (currentQuestionIndex >= questions.length) return;

      const question = questions[currentQuestionIndex];
      currentQuestionIndex++;

      // Poser la question au joueur
      await conn.sendMessage(
        from,
        `🎯 Question pour @${player.split('@')[0]} : ${question.question}`,
        { mentions: [player] }
      );

      // Attendre la réponse
      const filter = response =>
        response.sender === player &&
        response.body.toLowerCase() === question.answer.toLowerCase();

      try {
        const collected = await conn.waitForMessage(from, { filter, time: 15000 }); // 15 secondes pour répondre
        reply(`✔️ Bonne réponse, @${player.split('@')[0]} ! 🎉`, { mentions: [player] });

        // Ajouter des points au joueur
        playerScores[player] = (playerScores[player] || 0) + 1;
      } catch {
        reply(`❌ Temps écoulé ou mauvaise réponse, @${player.split('@')[0]} ! La réponse correcte était : ${question.answer}.`, { mentions: [player] });
      }
    }

    // Poser une question à chaque participant
    for (let i = 0; i < participants.length; i++) {
      const player = participants[i];
      await askQuestion(player);
    }

    // Afficher les scores finaux
    let scoreBoard = "📊 Scores finaux :\n";
    participants.forEach(player => {
      scoreBoard += `@${player.split('@')[0]} : ${playerScores[player] || 0} points\n`;
    });

    reply(scoreBoard, { mentions: participants });
    gameStarted = false; // Réinitialisation pour un nouveau jeu
  });
});