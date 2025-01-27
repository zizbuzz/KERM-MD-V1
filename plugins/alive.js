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
const os = require("os");
const moment = require("moment");

// Enregistrement de l'heure de démarrage du bot
let botStartTime = Date.now();

cmd({
    pattern: "alive",
    desc: "Check if the bot is active.",
    category: "info",
    react: "💡",
    filename: __filename
}, async (conn, mek, m, { pushName, reply, from }) => {
    try {
        // Heure actuelle et date
        const currentTime = moment().format("HH:mm:ss");
        const currentDate = moment().format("dddd, MMMM Do YYYY");

        // Calcul du temps de fonctionnement (Uptime)
        const runtimeMilliseconds = Date.now() - botStartTime;
        const runtimeSeconds = Math.floor((runtimeMilliseconds / 1000) % 60);
        const runtimeMinutes = Math.floor((runtimeMilliseconds / (1000 * 60)) % 60);
        const runtimeHours = Math.floor(runtimeMilliseconds / (1000 * 60 * 60));

        // Création du message Alive
        const aliveMessage = `
🌟 *KERM MD V1 STATUS* 🌟

Hi 🫵🏽 *${pushName || "User"}*,  
🤖 *Bot is Alive and Active!*

🕒 *Time*: ${currentTime}  
📅 *Date*: ${currentDate}  
⏳ *Uptime*: ${runtimeHours} hours, ${runtimeMinutes} minutes, ${runtimeSeconds} seconds  

🎉 *Enjoy the Service!*  
        `.trim();

        // Ajout de l'envoi personnalisé
        await conn.sendMessage(from, {
            caption: aliveMessage,
            contextInfo: { 
                mentionedJid: [m.sender], // Mention de l'expéditeur
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363321386877609@newsletter',
                    newsletterName: '𝐊𝐄𝐑𝐌 𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in alive command:", error);
        reply("❌ An error occurred while processing the alive command.");
    }
});