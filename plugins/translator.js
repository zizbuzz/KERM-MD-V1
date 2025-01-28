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
const config = require('../config')
const {cmd , commands} = require('../command')
const googleTTS = require('google-tts-api')

/*
cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]\nEg: trt fr Hello");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *KERM-MD-V1 TRANSLATION* 🌍

🔤 *Original*: ${textToTranslate}

🔠 *Translated*: ${translation}

🌐 *Language*: ${targetLang.toUpperCase()}

*KERM_MD-V4 CREATION*`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred data while translating the your text. Please try again later🤕");
    }
});

//____________________________TTS___________________________
cmd({
    pattern: "tts",
    desc: "download songs",
    category: "download",
    react: "👧",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Need some text.")
    const url = googleTTS.getAudioUrl(q, {
  lang: 'hi-IN',
  slow: false,
  host: 'https://translate.google.com',
})
await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek })
    }catch(a){
reply(`${a}`)
}
})
*/


cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, quoted }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2 && !quoted) {
            return reply("❗ Please provide a language code and text or reply to a message. Usage: .trt [target language code] [text]\nEg: .trt fr Hello");
        }

        const targetLang = args[0];
        let textToTranslate = args.slice(1).join(' ');

        if (quoted && !textToTranslate) {
            textToTranslate = quoted.message.conversation || quoted.message.extendedTextMessage?.text || quoted.message.imageMessage?.caption || '';
        }

        if (!textToTranslate) {
            return reply("❗ Please provide text to translate.");
        }

        // Detect the source language
        const detectLangUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=|${targetLang}`;
        const detectLangResponse = await axios.get(detectLangUrl);
        const sourceLang = detectLangResponse.data.responseData.match.lang || 'en';

        // Translate the text
        const translateUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=${sourceLang}|${targetLang}`;
        const translateResponse = await axios.get(translateUrl);
        const translation = translateResponse.data.responseData.translatedText;

        return reply(translation);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while translating your text. Please try again later🤕");
    }
});

//____________________________TTS___________________________
cmd({
    pattern: "tts",
    desc: "Convert text to speech in specified language",
    category: "other",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) {
            return reply("❗ Please provide a language code and text. Usage: .tts [language code] [text]\nEg: .tts en Hello");
        }

        const lang = args[0];
        const text = args.slice(1).join(' ');

        const url = googleTTS.getAudioUrl(text, {
            lang: lang,
            slow: false,
            host: 'https://translate.google.com',
        });

        await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while converting your text to speech. Please try again later🤕");
    }
});