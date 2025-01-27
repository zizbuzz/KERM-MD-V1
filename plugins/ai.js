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
        if (!response || !response.data || !response.data.result) {
            return reply("❌ No response received from the GPT API. Please try again later.");
        }

        // Extraire uniquement le texte de la réponse (le prompt)
        const gptResponse = response.data.result.prompt;

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
cmd({
    pattern: "gemini",
    desc: "Interact with Gemini AI using the Dreaded API.",
    category: "ai",
    react: "🌟",
    use: "<your query>",
    filename: __filename,
}, async (conn, mek, m, { from, args, q, reply }) => {
    try {
        // Vérification de l'entrée utilisateur
        if (!q) return reply("⚠️ Please provide a query for Gemini AI.\n\nExample:\n.gemini What is AI?");

        // Encodage de la requête utilisateur
        const text = q; 
        const encodedText = encodeURIComponent(text);

        // Utilisation du bon endpoint
        const url = `https://api.dreaded.site/api/gemini-text?text=${encodedText}`;

        console.log("Requesting URL:", url); // Afficher l'URL pour débogage

        // Appel à l'API
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
            },
        });

        // Vérification de la structure de la réponse
        console.log("Full API Response:", response.data); // Debug complet
        if (!response || !response.data || !response.data.result) {
            return reply("❌ The API returned an unexpected format. Please try again later.");
        }

        // Extraire la réponse depuis `result.prompt`
        const geminiResponse = response.data.result.prompt;

        // Vérification si une réponse est présente
        if (!geminiResponse) {
            return reply("❌ No valid response found for your query. Try rephrasing it.");
        }

        // Image AI à envoyer
        const ALIVE_IMG = 'https://i.imgur.com/R4ebueM.jpeg'; // URL de l'image à afficher

        // Légende formatée
        const formattedInfo = `🌟 *Gemini Response:*\n\n${geminiResponse}`;

        // Envoyer le message avec une image et une légende
        await conn.sendMessage(from, {
            image: { url: ALIVE_IMG },
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363321386877609@newsletter',
                    newsletterName: '𝐊𝐄𝐑𝐌 𝐌𝐃',
                    serverMessageId: 143,
                },
            },
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in Gemini command:", error);

        // Afficher les détails de l'erreur dans la console pour aider à déboguer
        if (error.response) {
            console.log("Error Response Data:", error.response.data);
        } else {
            console.log("Error Details:", error.message);
        }

        // Répondre avec les détails de l'erreur
        const errorMessage = `
❌ An error occurred while processing the Gemini command.
🛠 *Error Details*:
${error.message}

Please try again later or contact support.
        `.trim();
        return reply(errorMessage);
    }
});