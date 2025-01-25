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

const config = require('../config');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { cmd } = require('../command');
const { getRandom } = require('../lib/functions');

cmd(
    {
        pattern: 'take',
        alias: ['steal', 'stake'],
        desc: 'Create a sticker with a custom pack name.',
        category: 'sticker',
        use: '<reply media or URL>',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        if (!mek.quoted) return reply(`*Reply to any sticker.*`);
        if (!q) return reply(`*Please provide a pack name using .take <packname>*`);

        let mime = mek.quoted.mtype;
        let pack = q;

        if (mime === "imageMessage" || mime === "stickerMessage") {
            let media = await mek.quoted.download();
            let sticker = new Sticker(media, {
                pack: pack, 
                type: StickerTypes.FULL,
                categories: ["🤩", "🎉"],
                id: "12345",
                quality: 75,
                background: 'transparent',
            });
            const buffer = await sticker.toBuffer();
            return conn.sendMessage(mek.chat, { sticker: buffer }, { quoted: mek });
        } else {
            return reply("*Uhh, Please reply to an image.*");
        }
    }
);

//Sticker create 

cmd(
    {
        pattern: 'sticker',
        react: '🚀',
        alias: ['s', 'stickers'],
        desc: 'Create a sticker from an image, video, or URL.',
        category: 'sticker',
        use: '<reply media or URL>',
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        if (!mek.quoted) return reply(`*Reply to any Image or Video, Sir.*`);
        let mime = mek.quoted.mtype;
        let pack = Config.STICKER_NAME || "ᵏᵉʳᵐ ᵐᵈ ᵛ¹🐲";
        
        if (mime === "imageMessage" || mime === "stickerMessage") {
            let media = await mek.quoted.download();
            let sticker = new Sticker(media, {
                pack: pack, 
                type: StickerTypes.FULL,
                categories: ["🤩", "🎉"], 
                id: "12345",
                quality: 75, 
                background: 'transparent',
            });
            const buffer = await sticker.toBuffer();
            return conn.sendMessage(mek.chat, { sticker: buffer }, { quoted: mek });
        } else {
            return reply("*Uhh, Please reply to an image.*");
        }
    }
);