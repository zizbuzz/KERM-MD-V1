const { cmd } = require("../command");
const config = require("../config"); // Charger le fichier de configuration pour l'identification du propriétaire

cmd({
    pattern: "leave",
    desc: "Make the bot leave the group (owner only).",
    category: "group",
    react: "👋",
    use: "",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, sender, reply }) => {
    try {
        // Vérification si la commande est utilisée dans un groupe
        if (!isGroup) return reply("⚠️ This command can only be used in groups.");

        // Vérification si l'utilisateur est le propriétaire du bot
        const ownerNumber = config.OWNER_NUMBER || "1234567890@s.whatsapp.net"; // Remplacez par le numéro réel
        if (sender !== ownerNumber) {
            return reply("⚠️ Only the owner of the bot can use this command.");
        }

        // Message d'au revoir
        const goodbyeMessage = "👋 Goodbye, everyone! KERM MD is leaving the group. Take care!";
        await conn.sendMessage(from, { text: goodbyeMessage });

        // Le bot quitte le groupe
        await conn.groupLeave(from);
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing the leave command.");
    }
});