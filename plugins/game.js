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


const axios = require('axios');
const { cmd } = require('../command');

let currentQuestion = 0;
let playersScores = {};

const questions = [
    { question: "Quel est le plus grand pays du monde ?", answer: "Russie" },
    { question: "Quelle est la capitale de la France ?", answer: "Paris" },
    { question: "Combien de continents y a-t-il sur Terre ?", answer: "7" },
    // Ajouter plus de questions ici
];

cmd({
    pattern: "qst",
    desc: "Commencez le jeu de quiz",
    react: "🧠",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        currentQuestion = 0;
        playersScores = {};  // Réinitialisation des scores des joueurs

        reply("🚨 Le quiz commence maintenant ! 🚨\n\nRépondez aux questions aussi vite que possible en faisant .q suivi de la réponse !\nBonne chance !");
        sendNextQuestion(conn, from);
    } catch (e) {
        console.log(e);
        reply("⚠️ Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});

cmd({
    pattern: "q",
    desc: "Répondre à une question du quiz",
    react: "❓",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Vous devez fournir une réponse.");
        
        const question = questions[currentQuestion];
        if (q.toLowerCase() === question.answer.toLowerCase()) {
            playersScores[from] = (playersScores[from] || 0) + 1;
            reply(`✅ Bonne réponse ! Vous avez ${playersScores[from]} points.`);
        } else {
            reply(`❌ Mauvaise réponse ! La bonne réponse était : ${question.answer}`);
        }

        currentQuestion++;
        if (currentQuestion < questions.length) {
            sendNextQuestion(conn, from);
        } else {
            endGame(conn, from);
        }
    } catch (e) {
        console.log(e);
        reply("⚠️ Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});

async function sendNextQuestion(conn, from) {
    if (currentQuestion < questions.length) {
        const question = questions[currentQuestion];
        return conn.reply(from, `Question ${currentQuestion + 1}: ${question.question}`, mek);
    } else {
        endGame(conn, from);
    }
}

async function endGame(conn, from) {
    let winner = Object.keys(playersScores).reduce((a, b) => playersScores[a] > playersScores[b] ? a : b);
    let score = playersScores[winner];
    return conn.reply(from, `🎉 Le jeu est terminé !\n\nLe gagnant est ${winner} avec ${score} points ! 🎉`, mek);
}

const { cmd } = require('../command');

let wordToGuess = "";
let guessedLetters = [];
let playersGuessed = {};

cmd({
    pattern: "gst",
    desc: "Commencez le jeu de devinette de mots",
    react: "🤔",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        wordToGuess = "javascript";  // Choisir un mot au hasard ou avec une API
        guessedLetters = Array(wordToGuess.length).fill("_");
        playersGuessed = {};
        
        reply("🔤 Le jeu de devinette commence ! 🔤\n\nDevinez le mot, une lettre à la fois en faisant .g suivi de la reponse !");
        reply(`Le mot à deviner est : ${guessedLetters.join(" ")}`);
    } catch (e) {
        console.log(e);
        reply("⚠️ Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});

cmd({
    pattern: "g",
    desc: "Deviner une lettre du mot",
    react: "❓",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q || q.length !== 1) return reply("❌ Veuillez entrer une seule lettre.");
        if (playersGuessed[from]) return reply("❌ Vous avez déjà deviné.");
        
        playersGuessed[from] = true;
        
        if (wordToGuess.includes(q)) {
            guessedLetters = guessedLetters.map((letter, index) => wordToGuess[index] === q ? q : letter);
            reply(`✅ Bien joué !\n\nLe mot actuel est : ${guessedLetters.join(" ")}`);
        } else {
            reply(`❌ La lettre "${q}" n'est pas dans le mot.`);
        }

        if (!guessedLetters.includes("_")) {
            endGame(conn, from);
        }
    } catch (e) {
        console.log(e);
        reply("⚠️ Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});

async function endGame(conn, from) {
    let winner = from;  // Le joueur qui a trouvé la réponse
    return conn.reply(from, `🎉 Félicitations ${winner}, vous avez deviné le mot "javascript" ! 🎉`, mek);
}

const { cmd } = require('../command');

const animals = [
    { description: "Je suis un animal qui aboie et qui est souvent le meilleur ami de l'homme.", answer: "Chien" },
    { description: "Je suis un animal qui miaule et je suis souvent gardé comme animal de compagnie.", answer: "Chat" },
    // Ajouter plus d'animaux ou objets ici
];

let currentAnimal = 0;

cmd({
    pattern: "whta",
    desc: "Devinez l'animal ou l'objet",
    react: "🐱",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const animal = animals[currentAnimal];
        reply(`🧐 Voici l'indice : ${animal.description}`);
        reply("Répondez avec votre hypothèse !");
    } catch (e) {
        console.log(e);
        reply("⚠️ Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});

cmd({
    pattern: "ani",
    desc: "Deviner l'animal ou l'objet",
    react: "❓",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const animal = animals[currentAnimal];
        if (q.toLowerCase() === animal.answer.toLowerCase()) {
            reply(`✅ Bravo, vous avez trouvé que c'était un ${animal.answer} !`);
            currentAnimal++;
            if (currentAnimal < animals.length) {
                reply(`Voici un autre indice !`);
            } else {
                reply("🎉 Félicitations, vous avez deviné tous les animaux !");
            }
        } else {
            reply(`❌ Ce n'est pas la bonne réponse. Essayez encore !`);
        }
    } catch (e) {
        console.log(e);
        reply("⚠️ Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});