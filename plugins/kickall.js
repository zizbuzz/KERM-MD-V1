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
const { cmd, commands } = require('../command');

let stopKickall = false; // Variable to stop the execution of the kickall command

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cmd({
    pattern: "kicklist",
    desc: "Kicks members from a provided list.",
    react: "🧨",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    isGroup,
    isAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`❌ This command can only be used in groups.`);

        // Check if the user is an admin
        if (!isAdmins) return reply(`❌ Only group admins can use this command.`);

        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`❌ I need admin privileges to remove group members.`);

        // Extract text from the quoted message or reply
        const quotedText = mek.message.extendedTextMessage?.text || quoted?.text;
        if (!quotedText) return reply(`❌ Please reply to a message containing the list of members to remove.`);

        // Extract phone numbers from the quoted message
        const phoneNumbers = quotedText.match(/\d{6,}/g); // Adjust regex to match phone numbers
        if (!phoneNumbers || phoneNumbers.length === 0) {
            return reply(`❌ No valid phone numbers found in the provided list.`);
        }

        // Filter out duplicate or invalid numbers
        const uniqueNumbers = [...new Set(phoneNumbers)];

        // Notify about the process
        reply(`⚠️ Removing ${uniqueNumbers.length} members from the group...`);

        // Remove members from the group
        for (let number of uniqueNumbers) {
            const jid = `${number}@s.whatsapp.net`;
            try {
                await conn.groupParticipantsUpdate(from, [jid], "remove");
            } catch (err) {
                console.error(`⚠️ Failed to remove ${jid}:`, err);
            }
        }

        // Confirm completion
        reply(`✅ All listed members have been removed from the group.`);
    } catch (e) {
        console.error('Error while executing kicklist:', e);
        reply('❌ An error occurred while executing the command.');
    }
});

// Command to stop kickall execution
cmd({
    pattern: "restart",
    desc: "Stops the kickall command.",
    react: "⏹️",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { reply }) => {
    stopKickall = true; // Set the stop flag to true
    reply(`✅ *Kickall operation has been canceled.*`);
});

/*
cmd({
    pattern: "kickall",
    desc: "Kicks all non-admin members from the group.",
    react: "🧨",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, {
    from,
    quoted,
    isCmd,
    command,
    isGroup,
    sender,
    isAdmins,
    isOwner,
    groupMetadata,
    groupAdmins,
    isBotAdmins,
    reply
}) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply(`❌ This command can only be used in groups.`);

        // Check if the user is an admin
        if (!isAdmins) return reply(`❌ Only group admins can use this command.`);

        // Check if the bot has admin privileges
        if (!isBotAdmins) return reply(`❌ I need admin privileges to remove group members.`);

        stopKickall = false; // Reset the stop flag

        // Send warning message before execution
        reply(`⚠️ *Warning!* All non-admin members will be removed in *5 seconds*.\nTo cancel this operation, type *restart*.`);
        
        // Countdown before execution with a chance to cancel
        for (let i = 5; i > 0; i--) {
            if (stopKickall) {
                return reply(`✅ *Operation canceled.* No members were removed.`);
            }
            await delay(1000); // Wait for 1 second
        }

        // Filter out non-admin members
        const allParticipants = groupMetadata.participants;
        const nonAdminParticipants = allParticipants.filter(member => 
            !groupAdmins.includes(member.id) && member.id !== conn.user.jid
        );

        if (nonAdminParticipants.length === 0) {
            return reply(`✅ There are no non-admin members to remove.`);
        }

        // Remove non-admin members
        for (let participant of nonAdminParticipants) {
            if (stopKickall) {
                return reply(`✅ *Operation canceled.* Some members may not have been removed.`);
            }
            await conn.groupParticipantsUpdate(from, [participant.id], "remove")
                .catch(err => console.error(`⚠️ Failed to remove ${participant.id}:`, err));
        }

        // Send success confirmation
        reply(`✅ *Success!* All non-admin members have been removed from the group.`);
    } catch (e) {
        console.error('Error while executing kickall:', e);
        reply('❌ An error occurred while executing the command.');
    }
});
*/