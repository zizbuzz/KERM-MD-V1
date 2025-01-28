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
const config = require('../config');
const { cmd, commands } = require('../command');


/*
cmd({
    pattern: "vv",
    react : "🦠",
    alias: ['retrive', "viewonce"],
    desc: "Fetch and resend a ViewOnce message content (image/video/voice).",
    category: "misc",
    use: '<query>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // Get quoted message

        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const quot = quotedMessage.viewOnceMessageV2;
            if (quot.message.imageMessage) {
                let cap = quot.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.audioMessage) {
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.audioMessage);
                return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
            }
        }

        // If there is no quoted message or it's not a ViewOnce message
        if (!m.quoted) return reply("Please reply to a ViewOnce message.");
        if (m.quoted.mtype === "viewOnceMessage") {
            if (m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            else if (m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
        } else if (m.quoted.message.audioMessage) {
            let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.audioMessage);
            return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
        } else {
            return reply("> *This is not a ViewOnce message.*");
        }
    } catch (e) {
        console.log("Error:", e);
        reply("An error occurred while fetching the ViewOnce message.");
    }
});
*/
cmd({
    pattern: "vv",
    react : "👀",
    alias: ['retrive', "viewonce"],
    desc: "Fetch and resend a ViewOnce message content (image/video/voice).",
    category: "misc",
    use: '<query>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // Get quoted message
        
        if (!quotedMessage) {
            return reply("Please reply to a ViewOnce message.");
        }

        const viewOnceMessage = quotedMessage.viewOnceMessageV2 || quotedMessage.viewOnceMessage;
        
        if (!viewOnceMessage) {
            return reply("> *This is not a ViewOnce message.*");
        }

        // Fetch the media message and send it back
        if (viewOnceMessage.message.imageMessage) {
            let cap = viewOnceMessage.message.imageMessage.caption || '';
            let mediaPath = await conn.downloadAndSaveMediaMessage(viewOnceMessage.message.imageMessage);
            return conn.sendMessage(from, { image: { url: mediaPath }, caption: cap }, { quoted: mek });
        }

        if (viewOnceMessage.message.videoMessage) {
            let cap = viewOnceMessage.message.videoMessage.caption || '';
            let mediaPath = await conn.downloadAndSaveMediaMessage(viewOnceMessage.message.videoMessage);
            return conn.sendMessage(from, { video: { url: mediaPath }, caption: cap }, { quoted: mek });
        }

        if (viewOnceMessage.message.audioMessage) {
            let mediaPath = await conn.downloadAndSaveMediaMessage(viewOnceMessage.message.audioMessage);
            return conn.sendMessage(from, { audio: { url: mediaPath } }, { quoted: mek });
        }

        // If the message type is not supported
        return reply("> *This type of ViewOnce message is not supported.*");
        
    } catch (e) {
        console.error("Error fetching ViewOnce message:", e);
        reply("An error occurred while fetching the ViewOnce message.");
    }
});