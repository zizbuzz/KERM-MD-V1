const { cmd } = require("../command");

cmd({
    pattern: "spam",
    desc: "Repeat a provided phrase a specified number of times (owner only).",
    category: "admin",
    react: "📣",
    filename: __filename,
    use: "<text>|<number>"
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    try {
        // Vérifier que seul le propriétaire peut utiliser cette commande
        if (!isOwner) {
            return reply("❌ You are not authorized to use this command.");
        }

        // Combiner les arguments en une seule chaîne de caractères
        const input = args.join(" ");
        if (!input.includes("|")) {
            return reply("❌ Please use the format: .spam <text>|<number>");
        }

        // Séparer la phrase et le nombre de répétitions
        const [text, countStr] = input.split("|");
        const count = parseInt(countStr.trim());

        // Vérifier la validité des entrées
        if (!text || isNaN(count) || count <= 0) {
            return reply("❌ Invalid format or number. Usage: .spam <text>|<number>");
        }

        // Limiter le nombre de répétitions pour éviter un spam excessif
        if (count > 100) {
            return reply("❌ The maximum spam count allowed is 100.");
        }

        // Construire le message à envoyer
        let spamMessage = "";
        for (let i = 0; i < count; i++) {
            spamMessage += text + "\n";
        }

        // Envoyer le message final
        await reply(spamMessage.trim());
    } catch (error) {
        console.error("Spam command error:", error);
        reply("❌ An error occurred while processing the spam command.");
    }
});