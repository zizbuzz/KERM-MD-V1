const fs = require("fs");
const config = require("../config");
const { cmd } = require("../command");

cmd({
    pattern: "antilink",
    desc: "Enable or disable the antilink feature.",
    category: "admin",
    react: "🔗",
    filename: __filename,
    use: "<on/off>",
}, async (conn, mek, m, { from, isGroup, isAdmins, isOwner, args, reply }) => {
    try {
        // Vérifie si la commande est dans un groupe
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        // Vérifie si l'utilisateur est un admin ou le propriétaire
        if (!isAdmins && !isOwner) return reply("❌ You must be an admin to use this command.");

        const option = args[0]?.toLowerCase(); // "on" ou "off"

        // Vérifie si l'utilisateur a donné un argument valide
        if (option !== "on" && option !== "off") {
            return reply("⚠️ Please specify `on` or `off`.\n\nExample:\n.antilink on\n.antilink off");
        }

        // Met à jour la valeur d'antilink dans le fichier config.js
        const newValue = option === "on";
        config.antilink = newValue;

        // Sauvegarde le fichier config.js avec la nouvelle valeur
        fs.writeFileSync(
            require.resolve("../config"),
            `module.exports = ${JSON.stringify(config, null, 4)};`,
            "utf8"
        );

        // Retourne un message confirmant le changement
        reply(`✅ Antilink has been turned *${option.toUpperCase()}* successfully!`);

    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while processing your request. Please try again later.");
    }
});