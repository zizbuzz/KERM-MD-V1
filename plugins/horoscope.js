const axios = require("axios");
const { cmd } = require("../command");

cmd({
    pattern: "horoscope",
    desc: "Get the daily horoscope for a specific zodiac sign.",
    react: "🔮",
    category: "fun",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        // Vérification si un signe est fourni
        if (!q) {
            return reply("⚠️ Please provide a zodiac sign. Example: `.horoscope aries`");
        }

        const zodiacSign = q.trim().toLowerCase();

        // Liste des signes valides en anglais et en français
        const validSigns = {
            "aries": "Bélier",
            "taurus": "Taureau",
            "gemini": "Gémeaux",
            "cancer": "Cancer",
            "leo": "Lion",
            "virgo": "Vierge",
            "libra": "Balance",
            "scorpio": "Scorpion",
            "sagittarius": "Sagittaire",
            "capricorn": "Capricorne",
            "aquarius": "Verseau",
            "pisces": "Poissons"
        };

        // Vérification si le signe fourni est valide
        if (!validSigns[zodiacSign]) {
            return reply("⚠️ Invalid zodiac sign. Please provide one of the following:\n" + Object.keys(validSigns).join(", "));
        }

        // Requête à l'API publique
        const apiUrl = `https://ohmanda.com/api/horoscope/${zodiacSign}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data) {
            const horoscope = response.data.horoscope;

            // Création du message de réponse en anglais et en français
            const horoscopeMessageEn = `
🔮 *Daily Horoscope* 🔮
    
⭐ *Sign*: ${zodiacSign.toUpperCase()} (${validSigns[zodiacSign]})
📅 *Date*: ${response.data.date}

✨ *Prediction*:
${horoscope}

🌟 *Have a great day!*
            `;

            // Envoi de l'image et du texte avec contexte
            await conn.sendMessage(from, {
                image: { url: `https://i.ibb.co/Lz1qq6Jt/mrfrankofc.jpg` },
                caption: horoscopeMessageEn,
                contextInfo: { 
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363321386877609@newsletter',
                        newsletterName: '𝐊𝐄𝐑𝐌 𝐇𝐎𝐑𝐎𝐒𝐂𝐎𝐏𝐄',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek });

        } else {
            return reply("⚠️ Unable to fetch horoscope. Please try again later.");
        }
    } catch (error) {
        console.error(error);
        return reply("❌ An error occurred while processing the horoscope command.");
    }
});