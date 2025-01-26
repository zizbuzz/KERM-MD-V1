




const { cmd } = require("../command");

let activeGames = {}; // Stocke les jeux actifs par groupe

cmd({
  pattern: "wgc",
  react: "🎮",
  desc: "Activate the Word Game Challenge.",
  category: "game",
  use: ".wgc",
  filename: __filename,
}, async (conn, mek, m, { from, reply, isGroup }) => {
  if (!isGroup) return reply("❌ This game can only be played in a group.");

  if (activeGames[from]) return reply("❌ A game is already active. Type 'start' to begin.");

  activeGames[from] = { participants: [], isStarted: false, scores: {}, turn: 0 };
  await reply(
    "🎮 *Word Game Challenge Activated!*\n\n" +
      "Users who want to participate should type 'ready' (not a command).\n" +
      "The group owner can type 'start' to begin the game."
  );
});

cmd({
  pattern: ".*", // Capture tous les messages (ready/start/réponses)
  filename: __filename,
}, async (conn, mek, m, { from, sender, body, isOwner, reply }) => {
  if (!activeGames[from]) return;

  const game = activeGames[from];

  // Ajouter un utilisateur qui écrit "ready"
  if (body.trim().toLowerCase() === "ready") {
    if (game.isStarted) return reply("❌ The game has already started. You can't join now.");
    if (game.participants.includes(sender)) return reply("❌ You are already part of the game.");
    game.participants.push(sender);
    game.scores[sender] = 0; // Initialiser le score
    return conn.sendMessage(from, {
      text: `✅ @${sender.split("@")[0]} has joined the game!`,
      mentions: [sender],
    });
  }

  // Démarrer le jeu quand l'owner écrit "start"
  if (body.trim().toLowerCase() === "start" && isOwner && !game.isStarted) {
    if (game.participants.length < 2) return reply("❌ At least 2 participants are required to start the game.");

    game.isStarted = true;
    return startGame(conn, from);
  }
});

// Fonction principale pour gérer le jeu
async function startGame(conn, group) {
  const game = activeGames[group];
  if (!game) return;

  while (game.participants.length > 1) {
    const currentPlayer = game.participants[game.turn % game.participants.length];
    const question = generateQuestion(); // Générer une question aléatoire
    const questionMessage = `🎮 *Question for @${currentPlayer.split("@")[0]}:*\n\n${question.text}`;

    await conn.sendMessage(group, { text: questionMessage, mentions: [currentPlayer] });
    const correctAnswer = question.answer.toLowerCase();

    const startTime = Date.now();
    const maxTime = 4000; // Temps limite pour répondre (4 secondes)

    let answeredCorrectly = false;

    // Écouter les réponses du joueur
    const messageHandler = async (responseMek) => {
      if (responseMek.key.remoteJid === group && responseMek.sender === currentPlayer) {
        const userAnswer = responseMek.message.conversation?.trim().toLowerCase();
        if (userAnswer === correctAnswer) {
          answeredCorrectly = true;
          game.scores[currentPlayer]++;
          conn.off("chat-update", messageHandler);
        }
      }
    };

    conn.on("chat-update", messageHandler);

    // Attendre jusqu'à ce que le joueur réponde ou que le temps soit écoulé
    while (Date.now() - startTime < maxTime && !answeredCorrectly) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    conn.off("chat-update", messageHandler);

    if (!answeredCorrectly) {
      // Éliminer le joueur en cas d'échec
      game.participants = game.participants.filter((p) => p !== currentPlayer);
      await conn.sendMessage(group, {
        text: `❌ @${currentPlayer.split("@")[0]} has been eliminated!`,
        mentions: [currentPlayer],
      });
    } else {
      // Réponse correcte
      await conn.sendMessage(group, {
        text: `✅ @${currentPlayer.split("@")[0]} answered correctly!`,
        mentions: [currentPlayer],
      });
    }

    // Passer au joueur suivant
    game.turn++;
  }

  // Fin du jeu
  const winner = game.participants[0];
  const scores = Object.entries(game.scores)
    .map(([participant, score]) => `@${participant.split("@")[0]}: ${score} points`)
    .join("\n");
  await conn.sendMessage(group, {
    text: `🎉 *Game Over!* 🎉\n\n🏆 Winner: @${winner.split("@")[0]}\n\n📊 Scores:\n${scores}`,
    mentions: [winner, ...Object.keys(game.scores)],
  });

  delete activeGames[group];
}

// Fonction pour générer une question aléatoire
function generateQuestion() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const wordLength = Math.floor(Math.random() * 5) + 5; // Longueur entre 5 et 10
  return {
    text: `Find a word that starts with *${randomLetter}* and contains *${wordLength} letters*.`,
    answer: `${randomLetter.toLowerCase()}example`, // Réponse fictive
  };
}