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
        // Check if a zodiac sign is provided
        if (!q) {
            return reply("⚠️ Please provide a zodiac sign. Example: `.horoscope aries`");
        }

        // Zodiac signs translations from French to English
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

        const zodiacSign = q.trim().toLowerCase();
        
        // Translate French sign to English if needed
        const translatedSign = zodiacTranslation[zodiacSign];

        // List of valid zodiac signs
        const validSigns = [
            "aries", "taurus", "gemini", "cancer", "leo", "virgo",
            "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
        ];

        // Check if the provided zodiac sign is valid (either in English or French)
        if (!validSigns.includes(zodiacSign) && !validSigns.includes(translatedSign)) {
            return reply("⚠️ Invalid zodiac sign. Please provide one of the following:\n" + validSigns.join(", "));
        }

        // If the sign was in French, use the translated English version
        const finalZodiacSign = translatedSign || zodiacSign;

        // Request to the API with the correct zodiac sign
        const apiUrl = `https://ohmanda.com/api/horoscope/${finalZodiacSign}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200 && response.data) {
            const horoscope = response.data.horoscope;

            // Format the response message with horoscope
            const horoscopeMessage = `
🔮 *Daily Horoscope* (in ${translatedSign ? 'French' : 'English'}) 🔮
    
⭐ *Sign*: ${finalZodiacSign.toUpperCase()}
📅 *Date*: ${response.data.date}

✨ *Prediction*:
${horoscope}

🌟 *Have a great day!*
            `;

            // Send the image with horoscope
            await conn.sendMessage(from, {
                image: { url: `https://i.ibb.co/Lz1qq6Jt/mrfrankofc.jpg` },
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