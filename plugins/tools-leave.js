const { cmd } = require("../command");

cmd({
    pattern: "kick",
    desc: "Remove a member from the group.",
    category: "group",
    react: "🔨",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, isBotAdmins, isAdmins, mentioned, reply, quoted, sender }) => {
    try {
        // Vérification si la commande est utilisée dans un groupe
        if (!isGroup) return reply("⚠️ This command can only be used in groups.");

        // Vérification si le bot est administrateur
        if (!isBotAdmins) return reply("❌ The bot must be an admin to execute this command.");

        // Vérification si l'utilisateur qui exécute la commande est administrateur
        if (!isAdmins) return reply("⚠️ You must be an admin to use this command.");

        let target;

        // Vérification si la commande mentionne un utilisateur
        if (mentioned.length > 0) {
            target = mentioned[0];
        } 
        // Vérification si la commande répond à un message
        else if (quoted) {
            target = quoted.sender;
        } 
        // Si aucune mention ou réponse, retourner une erreur
        else {
            return reply("❌ Please mention a user or reply to their message to kick them.");
        }

        // Vérification pour éviter de retirer l'administrateur ou soi-même
        if (target === sender) {
            return reply("❌ You cannot kick yourself.");
        }

        // Suppression du membre
        await conn.groupParticipantsUpdate(from, [target], "remove");
        reply(`✅ Successfully removed the user: @${target.split("@")[0]}`, { mentions: [target] });

    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing the kick command.");
    }
});