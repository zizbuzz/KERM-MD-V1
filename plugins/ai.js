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

const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "gpt",
    desc: "Interact with ChatGPT using the Dreaded API.",
    category: "ai",
    react: "🤖",
    use: "<your query>",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        // Vérification de l'entrée utilisateur
        if (!q) return reply("⚠️ Please provide a query for ChatGPT.\n\nExample:\n.gpt What is AI?");

        // Utilisation de `${text}` dans le endpoint API
        const text = q;  // Texte de la requête de l'utilisateur
        const encodedText = encodeURIComponent(text);  // S'assurer que le texte est encodé correctement

        const url = `https://api.dreaded.site/api/chatgpt?text=${encodedText}`;

        console.log('Requesting URL:', url);  // Afficher l'URL pour vérifier

        // Appel à l'API avec headers personnalisés (ajoute des headers si nécessaire)
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',  // Ajouter un User-Agent pour simuler une requête valide
                'Accept': 'application/json',  // Spécifier que l'on attend une réponse JSON
            }
        });

        // Déboguer et afficher la réponse complète
        console.log('Full API Response:', response.data);

        // Vérification de la structure de la réponse
        if (!response || !response.data) {
            return reply("❌ No response received from the GPT API. Please try again later.");
        }

        // Essayer avec `prompt` ou `response`
        const gptResponse = response.data.prompt || response.data.response || JSON.stringify(response.data);

        if (!gptResponse) {
            return reply("❌ The API returned an unexpected format. Please try again later.");
        }

        // Image AI à envoyer
        const ALIVE_IMG = 'https://i.imgur.com/R4ebueM.jpeg'; // Remplacez par l'URL de votre image AI

        // Légende avec des informations formatées
        const formattedInfo = `🤖 *ChatGPT Response:*\n\n${gptResponse}`;

        // Envoyer le message avec image et légende
        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG }, // Assurez-vous que l'URL est valide
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
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
        console.error("Error in GPT command:", error);

        // Affichage du message d'erreur dans la console pour plus de détails
        if (error.response) {
            console.log("Error Response Data:", error.response.data);
        } else {
            console.log("Error Details:", error.message);
        }

        // Répondre avec des détails de l'erreur
        const errorMessage = `
❌ An error occurred while processing the GPT command.
🛠 *Error Details*:
${error.message}

Please report this issue or try again later.
        `.trim();
        return reply(errorMessage);
    }
});