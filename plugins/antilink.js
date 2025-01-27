const { cmd } = require("../command");
const config = require("../config");

let userWarnings = {}; // Stockage des avertissements pour chaque utilisateur
let groupWarningLimit = {}; // Stockage des limites spécifiques par groupe
const DEFAULT_WARN_LIMIT = config.ANTILINK_WARN_LIMIT || 3; // Limite par défaut si non définie

// Commande pour activer/désactiver l'antilink
cmd({
    pattern: "antilink",
    desc: "Enable or disable the anti-link feature.",
    category: "group",
    react: "🔗",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, isAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("❌ You must be an admin to use this command.");

        const action = args[0]?.toLowerCase();
        if (!action || !["on", "off"].includes(action)) {
            return reply("❌ Usage: .antilink on | off");
        }

        config.ANTILINK = action === "on";
        return reply(`✅ Antilink has been turned ${action.toUpperCase()}.`);
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing the antilink command.");
    }
});

// Commande pour définir le nombre maximal d'avertissements
cmd({
    pattern: "antilinkwarn",
    desc: "Set the maximum warnings before a user is kicked.",
    category: "group",
    react: "⚠️",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, isAdmins, args, reply }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        if (!isAdmins) return reply("❌ You must be an admin to use this command.");

        const newLimit = parseInt(args[0]);
        if (isNaN(newLimit) || newLimit <= 0) {
            return reply("❌ Please specify a valid number greater than 0. Example: .antilinkwarn 5");
        }

        groupWarningLimit[from] = newLimit; // Enregistrer la limite spécifique pour le groupe
        return reply(`✅ The warning limit has been set to ${newLimit} for this group.`);
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing the antilinkwarn command.");
    }
});

// Surveillance des messages pour détecter les liens
cmd({
    pattern: "message", // S'exécute sur tous les messages
    category: "monitor",
    filename: __filename,
},
async (conn, mek, m, { from, isGroup, sender, reply, body, isAdmins }) => {
    try {
        if (!isGroup || !config.ANTILINK) return;

        const linkRegex = /(https?:\/\/[^\s]+)/g; // Regex pour détecter les liens
        if (linkRegex.test(body)) {
            if (isAdmins) return; // Ignore les admins

            // Si l'utilisateur n'a pas encore de warnings, initialisez son compteur
            if (!userWarnings[from]) userWarnings[from] = {};
            if (!userWarnings[from][sender]) userWarnings[from][sender] = 0;

            userWarnings[from][sender] += 1;

            const maxWarnings = groupWarningLimit[from] || DEFAULT_WARN_LIMIT; // Limite spécifique ou par défaut

            // Avertir l'utilisateur
            const warningMessage = `⚠️ @${sender.split("@")[0]}, sending links is not allowed in this group! (Warning: ${userWarnings[from][sender]}/${maxWarnings})`;

            await conn.sendMessage(from, {
                text: warningMessage,
                mentions: [sender],
            });

            // Si l'utilisateur dépasse la limite, il est kické
            if (userWarnings[from][sender] >= maxWarnings) {
                await conn.groupParticipantsUpdate(from, [sender], "remove");
                delete userWarnings[from][sender]; // Réinitialiser les warnings après expulsion
                await conn.sendMessage(from, { text: `🚨 @${sender.split("@")[0]} has been removed for exceeding the warning limit.`, mentions: [sender] });
            }
        }
    } catch (error) {
        console.error(error);
    }
});