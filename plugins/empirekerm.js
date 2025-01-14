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
      *│  ◦* *▢➠ *
      *│  ◦* *▢➠ 𝖥𝖠𝖭𝖭𝖸*
      *│  ◦* *▢➠ 𝖱𝖸𝖠𝖭*
      *│  ◦* *▢➠ 𝖢𝖧𝖱𝖨𝖲*
      *│  ◦* *▢➠ 𝖦𝖱𝖤𝖸*
      *│  ◦* *▢➠ 𝖲𝖠𝖨̈𝖣𝖠*
      *│  ◦* *▢➠ 𝖲𝖴𝖪𝖴𝖭𝖠*
      *│  ◦* *▢➠ 𝖱𝖮𝖸*
      *│  ◦* *▢➠ 𝖥𝖤𝖱𝖭𝖠𝖭𝖣*
      *│  ◦* *▢➠ 𝖮𝖡𝖨𝖠𝖭𝖦*
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
