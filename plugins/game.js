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


const participants = [];
let gameStarted = false;
let currentPlayerIndex = 0;
const scores = {};

cmd({
  pattern: "wgc",
  react: "🎮",
  alias: ["game", "play"],
  desc: "Start a game with participants",
  category: "games",
  filename: __filename
}, async (conn, mek, m, { from, sender, isGroup, isOwner, reply, isCmd }) => {
  let participants = [];
  let gameStarted = false;
  let currentQuestionIndex = 0;
  let playerScores = {};

  if (!isGroup) {
    return reply("🎮 Le jeu commence bientôt ! 🚀 Pour participer, écris 'ready' dans le chat pour rejoindre la partie ! 📢 L'owner va ensuite taper 'start' pour démarrer le jeu. Que le meilleur gagne ! 🎉");
  } else {
    reply("🎮 Le jeu va bientôt commencer ! 🚀 Écris 'ready' pour participer et 'start' pour commencer le jeu !");
  }

  // Quand un joueur tape "ready", il rejoint la partie
  cmd({
    pattern: "ready",
    react: "👍",
    desc: "Rejoindre le jeu",
    category: "games",
    filename: __filename
  }, async (conn, mek, m, { from, sender }) => {
    if (gameStarted) return; // Ne permet pas de rejoindre si le jeu a déjà commencé

    if (participants.includes(sender)) {
      return reply("❌ Tu as déjà rejoint le jeu !");
    }

    participants.push(sender);
    reply(`${sender} a rejoint le jeu ! 🎉`);
  });

  // Quand l'owner tape "start", le jeu commence
  cmd({
    pattern: "start",
    react: "🚀",
    desc: "Démarrer le jeu",
    category: "games",
    filename: __filename
  }, async (conn, mek, m, { from, sender }) => {
    if (sender !== isOwner) {
      return reply("❌ Seul l'owner peut démarrer le jeu !");
    }

    if (participants.length < 2) {
      return reply("❌ Il faut au moins 2 participants pour démarrer le jeu.");
    }

    gameStarted = true;
    await reply("🚀 Le jeu commence maintenant ! 🎉");

    // Liste des questions avec les ajouts
    const questions = [
      { question: "Quel est le plus grand pays du monde ?", answer: "Russie" },
      { question: "Quelle est la capitale de la France ?", answer: "Paris" },
      { question: "Combien de continents y a-t-il sur Terre ?", answer: "7" },
      { question: "Quel est l'animal qui miaule ?", answer: "Chat" },
      { question: "Dans quelle ville se trouve la Tour Eiffel ?", answer: "Paris" },
      { question: "Quel est l'animal national de l'Australie ?", answer: "Kangourou" },
      { question: "Quel est le fruit jaune et courbé ?", answer: "Banane" },
      { question: "Quel est l'animal qui aboie ?", answer: "Chien" },
      { question: "Combien de couleurs y a-t-il dans un arc-en-ciel ?", answer: "7" },
      { question: "Qui a peint la Joconde ?", answer: "Léonard de Vinci" },
      { question: "Quelle couleur fait le ciel par temps clair ?", answer: "Bleu" },
      { question: "Combien de jours y a-t-il dans une semaine ?", answer: "7" },
      { question: "Quel est le plus petit pays du monde ?", answer: "Vatican" },
      { question: "Quel est l'animal qui saute et vit dans les arbres ?", answer: "Singe" },
      { question: "Quel est le fruit rouge et rond que l'on mange souvent en été ?", answer: "Tomate" },
      { question: "Quel est l'animal qui porte une coquille ?", answer: "Escargot" },
      { question: "Dans quel pays se trouve le Colisée ?", answer: "Italie" },
      { question: "Quel est l'animal qui a des rayures noires et blanches ?", answer: "Zèbre" },
      { question: "Combien de doigts avons-nous sur une main ?", answer: "5" },
      { question: "Quelle couleur est une pomme Granny Smith ?", answer: "Verte" },
      { question: "Quel est le plus grand mammifère terrestre ?", answer: "Éléphant" },
      { question: "Quel est l'animal qui pond des œufs et vit dans l'eau ?", answer: "Canard" },
      { question: "Quel est le nom de l'élément chimique dont le symbole est 'O' ?", answer: "Oxygène" },
      { question: "Quel est l'objet que l'on utilise pour écrire ?", answer: "Stylo" },
      { question: "Quel est l'objet qui permet de regarder des films ?", answer: "Télévision" },
      { question: "Combien de pieds a une araignée ?", answer: "8" },
      { question: "Quel est le jour de la semaine qui suit le lundi ?", answer: "Mardi" },
      { question: "Quel est l'animal qui vit dans l'eau et a des nageoires ?", answer: "Poisson" },
      { question: "Quel est l'instrument de musique avec des touches noires et blanches ?", answer: "Piano" },
      { question: "Combien de semaines y a-t-il dans une année ?", answer: "52" },
      { question: "Quel est le fruit qui est souvent associé à un matin énergique ?", answer: "Orange" },
      { question: "Quel est le nom du célèbre sorcier dans Harry Potter ?", answer: "Harry Potter" },
      { question: "Quel est le plus grand océan du monde ?", answer: "Pacifique" },
      { question: "Quel est l'animal qui a une trompe ?", answer: "Éléphant" },
      { question: "Dans quel pays peut-on voir la Grande Muraille ?", answer: "Chine" },
      { question: "Combien de mois y a-t-il dans une année ?", answer: "12" },
      { question: "Quel est le nom du personnage qui roule un tonneau dans Mario ?", answer: "Donkey Kong" },
      { question: "Quel est l'objet que l'on utilise pour se protéger de la pluie ?", answer: "Parapluie" },
      { question: "Quelle est la couleur d'une orange ?", answer: "Orange" },
      { question: "Quel est le fruit qui peut être utilisé pour faire du jus ?", answer: "Orange" },
      { question: "Quel est l'élément chimique dont le symbole est 'H' ?", answer: "Hydrogène" },
      { question: "Quel est l'animal qui vit dans l'eau et a une coquille ?", answer: "Tortue" },
      { question: "Quelle est la capitale de l'Italie ?", answer: "Rome" },
      { question: "Quel est l'objet que l'on utilise pour téléphoner ?", answer: "Téléphone" },
      { question: "Quel est l'élément chimique dont le symbole est 'He' ?", answer: "Hélium" },
      { question: "Quel est le nom de l'animal qui vit dans une ruche ?", answer: "Abeille" },
      { question: "Dans quel pays se trouve la Statue de la Liberté ?", answer: "États-Unis" },
      { question: "Quel est l'animal qui vit dans un terrier ?", answer: "Lapin" },
      { question: "Quel est l'animal qui est le symbole de la sagesse ?", answer: "Chouette" },
      { question: "Quel est l'élément chimique avec le symbole 'C' ?", answer: "Carbone" },
      { question: "Quel est l'instrument de musique à cordes ?", answer: "Guitare" },
      { question: "Quel est l'animal qui vit dans une jungle ?", answer: "Tigre" },
      { question: "Quel est le nom de l'animal qui est le roi de la jungle ?", answer: "Lion" },
      { question: "Quel est le plus grand animal terrestre ?", answer: "Éléphant" },
      { question: "Quel est l'élément chimique avec le symbole 'N' ?", answer: "Azote" },
      { question: "Quel est l'animal qui vit dans l'eau et est transparent ?", answer: "Méduse" },
      { question: "Quel est le sport où l'on utilise un ballon rond ?", answer: "Football" },
      { question: "Quel est l'élément chimique avec le symbole 'Cl' ?", answer: "Chlore" },
      { question: "Quel est l'animal qui vit dans un étang ?", answer: "Grenouille" },
      { question: "Quel est l'objet que l'on utilise pour couper ?", answer: "Ciseaux" },
      { question: "Dans quelle ville se trouve la Statue de la Liberté ?", answer: "New York" },
      { question: "Quel est l'animal qui pond des œufs ?", answer: "Oiseau" },
      { question: "Quel est l'instrument de musique à vent ?", answer: "Flûte" },
      { question: "Quel est le fruit que l'on trouve dans une forêt ?", answer: "Fraise" },
      { question: "Quel est l'animal qui porte une carapace ?", answer: "Tortue" },
      { question: "Quel est le fruit que l'on utilise souvent pour faire un smoothie ?", answer: "Banane" },
      { question: "Quel est le plus grand animal marin ?", answer: "Baleine" },
      { question: "Quel est l'élément chimique avec le symbole 'Na' ?", answer: "Sodium" },
      { question: "Dans quelle ville se trouve le Colisée ?", answer: "Rome" },
      { question: "Quel est l'objet que l'on utilise pour protéger les yeux du soleil ?", answer: "Lunettes" },
      { question: "Quel est l'élément chimique avec le symbole 'Fe' ?", answer: "Fer" }
    ];

    // Fonction pour poser la question à un joueur
    async function askQuestion(player) {
      const question = questions[currentQuestionIndex];
      currentQuestionIndex++;
      await conn.sendMessage(from, `${player}, voici ta question : ${question.question}`);

      // Attendre la réponse de l'utilisateur
      const message = await conn.on("message", (response) => {
        if (response.body.toLowerCase() === question.answer.toLowerCase()) {
          playerScores[player] = (playerScores[player] || 0) + 1;
          return conn.sendMessage(from, `🎉 ${player} a répondu correctement !`);
        } else {
          return conn.sendMessage(from, `❌ ${player} a répondu incorrectement. La bonne réponse était : ${question.answer}`);
        }
      });
    }

    // Démarre les questions
    participants.forEach(async (player) => {
      await askQuestion(player);
    });

    // Affichage des scores finaux après les questions
    setTimeout(() => {
      let scoreBoard = "📊 Scores finaux : \n";
      participants.forEach(player => {
        scoreBoard += `${player}: ${playerScores[player] || 0} points\n`;
      });
      reply(scoreBoard);
    }, 10000); // Attendre 10 secondes pour les réponses
  });
});