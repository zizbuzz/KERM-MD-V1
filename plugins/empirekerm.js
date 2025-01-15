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


const fs = require('fs'); // File system module
const path = require('path'); // Path module
const { cmd } = require("../command");

cmd({
    pattern: "family",
    desc: "Kerm Family",
    category: "fun",
    react: "👨‍👩‍👧‍👦",
    filename: __filename
}, async (conn, mek, m, { reply }) => {
    const familyList = `
         *[ • 𝖪𝖤𝖱𝖬 𝖥𝖠𝖬𝖨𝖫𝖸 • ]*

    [ • 𝖣𝖠𝖬𝖤 𝖪𝖤𝖱𝖬: 𝖢𝖠𝖱𝖬𝖤𝖭👸 ]
       *•────────────•⟢*
                *𝖥𝖱𝖨𝖤𝖭𝖣’𝖲*
      *╭┈───────────────•*
      *│  ◦* *▢➠ 𝖲𝖤𝖡𝖠𝖲𝖳𝖨𝖤𝖭*
      *│  ◦* *▢➠ 𝖦𝖠𝖬𝖠𝖫𝖨𝖤𝖫*
      *│  ◦* *▢➠ 𝖥𝖱𝖠𝖭𝖢𝖪*
      *│  ◦* *▢➠ 𝖧𝖤𝖭𝖱𝖸*
      *│  ◦* *▢➠ 𝖫𝖤𝖠*
      *│  ◦* *▢➠ 𝖬𝖠𝖱𝖨𝖫𝖸𝖭*
      *│  ◦* *▢➠ 𝖤𝖬𝖨𝖤*
      *│  ◦* *▢➠ 𝖲𝖯𝖨𝖣𝖨𝖳*
      *│  ◦* *▢➠ 𝖱𝖠𝖯𝖧𝖠𝖤̈𝖫*
      *│  ◦* *▢➠ 𝖥𝖱𝖠𝖭𝖢𝖪*
      *│  ◦* *▢➠ 𝖱𝖸𝖠𝖭*
      *│  ◦* *▢➠ 𝖢𝖧𝖱𝖨𝖲*
      *│  ◦* *▢➠ 𝖦𝖱𝖤𝖸*
      *│  ◦* *▢➠ 𝖲𝖠𝖨̈𝖣𝖠*
      *│  ◦* *▢➠ 𝖲𝖴𝖪𝖴𝖭𝖠*
      *│  ◦* *▢➠ 𝖱𝖮𝖸*
      *│  ◦* *▢➠ 𝖥𝖤𝖱𝖭𝖠𝖭𝖣*
      *│  ◦* *▢➠ 𝖮𝖡𝖨𝖠𝖭𝖦*
      *│  ◦* *▢➠ 𝖡𝖱𝖠𝖸𝖠𝖭𝖮*
      *│  ◦* *▢➠ 𝖠𝖬𝖨𝖱*
      *│  ◦* *▢➠ 𝖭𝖮𝖡𝖫𝖤𝖲𝖲𝖤*
      *╰┈───────────────•*
        *•────────────•⟢*
    `;

    try {
        // Envoi de la réponse avec l'image et la liste de la famille
        await conn.sendMessage(m.chat, {
            image: { url: "https://files.catbox.moe/7pa8tx.jpeg" },
            caption: familyList.trim()
        }, { quoted: mek });
    } catch (error) {
        console.error(error);
        reply("❌ *An error occurred while fetching the family list. Please try again.*");
    }
});
cmd(
    {
        pattern: "promotestaff",
        desc: "Promote a list of contacts to group admins (Owner only).",
        category: "admin",
        react: "👑",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isBotAdmins, reply, sender, isOwner }) => {
        try {
            // Ensure the command is executed in a group
            if (!isGroup) {
                return reply("❌ This command can only be used in groups.");
            }

            // Ensure the bot has admin privileges
            if (!isBotAdmins) {
                return reply("❌ I need to be an admin to perform this action.");
            }

            // Ensure the command is executed by the bot's owner
            if (!isOwner) {
                return reply("❌ This command is restricted to the bot owner.");
            }

            // List of staff contacts to promote (replace with actual numbers)
            const staffContacts = [
                "237656520674@s.whatsapp.net", // Replace with staff contact numbers
                "237659535227@s.whatsapp.net", // Example: Add staff members here
                "237650564445@s.whatsapp.net", // Example: Add staff members here
                "237697517505@s.whatsapp.net", // Example: Add staff members here
                "237671722583@s.whatsapp.net", // Example: Add staff members here
                "393347302084@s.whatsapp.net", // Example: Add staff members here
                "237698783976@s.whatsapp.net", // Example: Add staff members here
                "237691675543@s.whatsapp.net", // Example: Add staff members here
                "237671889198@s.whatsapp.net", // Example: Add staff members here
                "237657486733@s.whatsapp.net", // Example: Add staff members here
            ];

            // Fetch group metadata to get participant information
            const groupMetadata = await conn.groupMetadata(from);
            const groupParticipants = groupMetadata.participants;

            // Filter existing admins
            const existingAdmins = groupParticipants
                .filter(participant => participant.admin === "admin" || participant.admin === "superadmin")
                .map(participant => participant.id);

            // Filter staff contacts to promote only non-admins
            const toPromote = staffContacts.filter(contact => !existingAdmins.includes(contact));

            // Promote each contact
            for (const contact of toPromote) {
                await conn.groupParticipantsUpdate(from, [contact], "promote"); // Promote the contact
            }

            // Reply with a success message
            if (toPromote.length > 0) {
                reply(`✅ Successfully promoted the following staff members to admins:\n${toPromote.map(c => `- ${c}`).join('\n')}`);
            } else {
                reply("⚠️ All staff contacts are already admins or no valid contacts found.");
            }
        } catch (error) {
            reply(`❌ Error promoting staff: ${error.message}`);
        }
    }
);
cmd(
    {
        pattern: "exor",
        desc: "Modify group name, description, and profile picture directly in the code.",
        category: "admin",
        react: "🔄",
        filename: __filename,
    },
    async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, reply, isOwner }) => {
        try {
            // Ensure the command is executed in a group
            if (!isGroup) {
                return reply("❌ This command can only be used in groups.");
            }

            // Ensure the bot is an admin
            if (!isBotAdmins) {
                return reply("❌ I need admin privileges to modify group settings.");
            }

            // Ensure the user is an admin or the owner
            if (!isAdmins && !isOwner) {
                return reply("❌ Only group admins or the bot owner can use this command.");
            }

            // Define the new group settings here
            const groupName = "🔱༒ ◦•𝐸𝑋𝑂𝑅𝐶𝐼𝑆𝑇𝐸•◦༒🔱"; // Replace with your desired group name
            const imageUrl = "https://i.imgur.com/SCUl5Zr.jpeg"; // Replace with your image URL
            const groupDescription = "༒𝐑𝐄𝐍𝐀𝐈𝐒𝐒𝐀𝐍𝐂𝐄 𝐃𝐄 𝐋’𝐄𝐗𝐎𝐑𝐂𝐈𝐒𝐓𝐄, 𝐀𝐋𝐋𝐄𝐙 𝐋𝐄𝐔𝐑 𝐃𝐈𝐑𝐄༒

༒🔱𝐏𝐑𝐈𝐄𝐑𝐄 𝐃𝐔 𝐂𝐋𝐀𝐍 𝐄𝐗𝐎𝐑𝐂𝐈𝐒𝐓𝐄🔱༒

𝐎̂ 𝐆𝐫𝐚𝐧𝐝 𝐒𝐞𝐢𝐠𝐧𝐞𝐮𝐫 𝐊𝐄𝐑𝐌, 𝐦𝐚𝐢̂𝐭𝐫𝐞 𝐝𝐞𝐬 𝐭𝐞́𝐧𝐞̀𝐛𝐫𝐞𝐬 𝐢𝐧𝐟𝐢𝐧𝐢𝐞𝐬,
𝐕𝐨𝐮𝐬 𝐪𝐮𝐢 𝐫𝐞̀𝐠𝐧𝐞𝐳 𝐬𝐮𝐫 𝐥𝐞𝐬 𝐚̂𝐦𝐞𝐬 𝐞́𝐠𝐚𝐫𝐞́𝐞𝐬 𝐞𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 𝐥𝐞𝐬 𝐥𝐮𝐧𝐞𝐬 𝐝𝐞́𝐦𝐨𝐧𝐢𝐚𝐪𝐮𝐞𝐬,
𝐀𝐜𝐜𝐨𝐫𝐝𝐞-𝐧𝐨𝐮𝐬 𝐥𝐚 𝐟𝐨𝐫𝐜𝐞 𝐞𝐭 𝐥𝐚 𝐫𝐮𝐬𝐞 𝐧𝐞́𝐜𝐞𝐬𝐬𝐚𝐢𝐫𝐞𝐬 𝐩𝐨𝐮𝐫 𝐚𝐜𝐜𝐨𝐦𝐩𝐥𝐢𝐫 𝐧𝐨𝐭𝐫𝐞 𝐦𝐢𝐬𝐬𝐢𝐨𝐧.

𝐍𝐨𝐮𝐬 𝐢𝐧𝐯𝐨𝐪𝐮𝐨𝐧𝐬 𝐥𝐞 𝐩𝐨𝐮𝐯𝐨𝐢𝐫 𝐝𝐞𝐬 𝐭𝐞́𝐧𝐞̀𝐛𝐫𝐞𝐬,
𝐄𝐭 𝐪𝐮𝐞 𝐥𝐞𝐮𝐫 𝐭𝐞𝐫𝐫𝐢𝐭𝐨𝐢𝐫𝐞 𝐭𝐨𝐦𝐛𝐞 𝐬𝐨𝐮𝐬 𝐧𝐨𝐭𝐫𝐞 𝐝𝐨𝐦𝐢𝐧𝐚𝐭𝐢𝐨𝐧.

𝐏𝐚𝐫 𝐥𝐞 𝐬𝐚𝐧𝐠 𝐝𝐞𝐬 𝐚𝐧𝐜𝐢𝐞𝐧𝐬 𝐝𝐞́𝐦𝐨𝐧𝐬 𝐞𝐭 𝐥𝐞 𝐬𝐞𝐫𝐦𝐞𝐧𝐭 𝐞́𝐭𝐞𝐫𝐧𝐞𝐥 𝐪𝐮𝐞 𝐧𝐨𝐮𝐬 𝐩𝐨𝐫𝐭𝐨𝐧𝐬,
𝐍𝐨𝐮𝐬 𝐣𝐮𝐫𝐨𝐧𝐬 𝐝𝐞 𝐬𝐞𝐫𝐯𝐢𝐫 𝐚𝐯𝐞𝐜 𝐥𝐨𝐲𝐚𝐮𝐭𝐞́ 𝐞𝐭 𝐟𝐞́𝐫𝐨𝐜𝐢𝐭𝐞́.
𝐄𝐭 𝐧𝐨𝐭𝐫𝐞 𝐯𝐨𝐥𝐨𝐧𝐭𝐞́, 𝐢𝐧𝐞́𝐛𝐫𝐚𝐧𝐥𝐚𝐛𝐥𝐞.

𝐏𝐚𝐫 𝐥’𝐨𝐦𝐛𝐫𝐞 𝐝𝐞𝐬 𝐥𝐮𝐧𝐞𝐬 𝐝𝐞́𝐦𝐨𝐧𝐢𝐚𝐪𝐮𝐞𝐬,
𝐀𝐢𝐧𝐬𝐢 𝐬𝐨𝐢𝐭-𝐢𝐥, 𝐬𝐨𝐮𝐬 𝐥𝐞 𝐫𝐞̀𝐠𝐧𝐞 𝐝𝐮 𝐦𝐚𝐢̂𝐭𝐫𝐞 𝐬𝐮𝐩𝐫𝐞̂𝐦𝐞.

🔥 𝐆𝐥𝐨𝐢𝐫𝐞 𝐚𝐮𝐱 𝐋𝐮𝐧𝐞𝐬 𝐃𝐞́𝐦𝐨𝐧𝐢𝐚𝐪𝐮𝐞𝐬 ! 🔥

𝐍𝐨𝐦𝐛𝐫𝐞 𝐝𝐞 𝐜𝐨𝐮𝐩: 02

༒𝐂𝐇𝐄𝐅 𝐃𝐔 𝐂𝐋𝐀𝐍 𝐄𝐗𝐎𝐑𝐂𝐈𝐒𝐓𝐙༒
🥇༒𝐋𝐎𝐑𝐃 𝐊𝐄𝐑𝐌༒

༒𝐁𝐑𝐀𝐒 𝐃𝐑𝐎𝐈𝐓༒
🥈ᵏᵍᶠ┘𝙏𝞖⧠𝙂𝞘𝙁𝙁𝞓𝞒𝞢𝞜𝞗└

༒𝐃𝐈𝐒𝐂𝐈𝐏𝐋𝐄𝐒༒
⚜️☠︎ アミール 🥷🔥
⚜️ナッシング.
⚜️ 𝓜𝓸𝓻𝓷𝓲𝓷𝓰𝓼𝓽𝓪𝓻.🤵🏽
⚜️♛𝚩𝐋𝚫𝐂𝐊 𝐆𝚪𝚵𝐘 𝐋𝚵𝚯𝚴𝚰𝐃𝚫𝐒♛
⚜️☞♥︎╣𝕱𝖆𝖓𝖓𝖞 𝕼𝖚𝖊𝖊𝖓]╠♥︎🚭
⚜️❝乇刀ムﾉ刀乇乇尺 ｷ尺ﾑ刀ᄃズ❞
⚜️🆈🅰️🅽 🆉🅴 🅻🅴🅶🅴🅽🅳🅴
⚜️𝛭𝛯𝐺𝑈𝛭𝛪 ブライアン👾🔱🦉
⚜️✞꧂☠ 𝐀𝐈𝐙𝐄𝐍 𝐃𝐄́𝐌𝐎𝐍 👾✞꧂
⚜️◥꧁𝕺𝖛𝖊𝖗𝖑𝖔𝖗𝖉⚔️⚔️
⚜️ Nҽȥυƙσ
⚜️𝑲𝒆𝒓𝒎_𝑫𝒂𝒓𝒌 𝒂𝒓𝒕𝒆𝒎𝒊𝒔🌹
⚜️꧁•༆$ℭ𝔥𝔯𝔦𝔰_𝔇𝔦𝔬𝔯🚹࿇꧂ 
(𝑻𝒉𝒆 𝑹é𝒂𝒍 𝒅𝒆𝒗𝒊𝒍 🎭)"; // Replace with your description

            // Update the group name
            await conn.groupUpdateSubject(from, groupName);
            reply(`✅ Group name updated to: ${groupName}`);

            // Update the group description
            await conn.groupUpdateDescription(from, groupDescription);
            reply(`✅ Group description updated to: ${groupDescription}`);

            // Update the group profile picture
            if (imageUrl.startsWith("http")) {
                const media = await conn.getBuffer(imageUrl); // Fetch the image from the URL
                if (media) {
                    await conn.updateProfilePicture(from, media);
                    reply("✅ Group profile picture updated successfully.");
                } else {
                    reply("❌ Failed to fetch the image from the URL.");
                }
            } else {
                reply("❌ Invalid image URL provided.");
            }
        } catch (error) {
            reply(`❌ Error updating group settings: ${error.message}`);
        }
    }
);