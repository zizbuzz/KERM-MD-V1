const axios = require("axios");
const { cmd } = require("../command");

// Dictionnaire de traduction des signes du zodiaque (Français -> Anglais)
const zodiacTranslation = {
    "bélier": "aries",
    "taureau": "taurus",
    "gémeaux": "gemini",
    "cancer": "cancer",
    "lion": "leo",
    "vierge": "virgo",
    "balance": "libra",
    "scorpion": "scorpio",
    "sagittaire": "sagittarius",
    "capricorne": "capricorn",
    "verseau": "aquarius",
    "poissons": "pisces"
};

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

        let zodiacSign = q.trim().toLowerCase();

        // Vérification si le signe est en français et le traduire
        if (zodiacTranslation[zodiacSign]) {
            zodiacSign = zodiacTranslation[zodiacSign];
        }

        // Liste des signes valides
        const validSigns = [
            "aries", "taurus", "gemini", "cancer", "leo", "virgo",
            "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
        ];

        // Vérification si le signe fourni est valide
        if (!validSigns.includes(zodiacSign)) {
            return reply("⚠️ Invalid zodiac sign. Please provide one of the following:\n" + validSigns.join(", "));
        }

        // Requête à l'API publique
        const apiUrl = `https://ohmanda.com/api/horoscope/${zodiacSign}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data) {
            const horoscope = response.data.horoscope;

            // Création du message de réponse
            const horoscopeMessage = `
🔮 *Daily Horoscope* 🔮
    
⭐ *Sign*: ${zodiacSign.toUpperCase()}
📅 *Date*: ${response.data.date}

✨ *Prediction*:
${horoscope}

🌟 *Have a great day!*
            `;
            // Envoi du message avec l'horoscope et l'image
            await conn.sendMessage(from, {
                image: { url: `https://i.ibb.co/Lz1qq6Jt/mrfrankofc.jpg` }, // URL de l'image (remplacez avec l'image souhaitée)
                caption: horoscopeMessage,
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