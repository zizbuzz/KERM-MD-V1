const axios = require("axios");
const { cmd } = require("../command");

// Variable pour suivre si l'accueil est activé ou non
let welcomeEnabled = false;

// Commande pour activer/désactiver l'accueil
cmd({
  pattern: "welcome (on|off)",
  desc: "Enable or disable welcome messages",
  react: "🎉",
  category: "group",
  filename: __filename,
}, async (conn, mek, m, { from, q, reply, match }) => {
  const action = match[1]; // Récupère "on" ou "off"
  
  if (action === "on") {
    welcomeEnabled = true;
    reply("✅ Welcome messages are now enabled.");
  } else if (action === "off") {
    welcomeEnabled = false;
    reply("❌ Welcome messages are now disabled.");
  } else {
    reply("⚠️ Invalid command. Use !welcome on to enable or !welcome off to disable.");
  }
});

// Fonction qui gère l'événement d'ajout de membres dans le groupe
module.exports = async (conn, update) => {
  if (!welcomeEnabled) return; // Si l'accueil est désactivé, ne rien faire

  try {
    // Vérifie si c'est un événement de membre ajouté
    if (update.action === "add") {
      const groupId = update.id; // ID du groupe
      const participants = update.participants; // Utilisateurs ajoutés

      // Récupère les informations du groupe
      const groupMetadata = await conn.groupMetadata(groupId);
      const groupname = groupMetadata.subject; // Nom du groupe
      const groupicon =
        (await conn.profilePictureUrl(groupId, "image")) ||
        "https://i.ibb.co/G5mJZxs/rin.jpg"; // Image de l'icône du groupe
      const membercount = groupMetadata.participants.length; // Nombre de membres dans le groupe

      for (const participant of participants) {
        // Récupère l'image de profil de l'utilisateur ou un avatar par défaut
        const profile =
          (await conn.profilePictureUrl(participant, "image")) ||
          "https://i.ibb.co/G5mJZxs/rin.jpg";

        const username = (await conn.getName(participant)) || "New Member"; // Nom de l'utilisateur ajouté
        const background = "https://i.ibb.co/G5mJZxs/rin.jpg"; // Arrière-plan par défaut
        const apiKey = "57a86dc033a600ac"; // Clé API valide

        // Construire l'URL de l'API
        const apiUrl = `https://api.caliph.biz.id/api/welcome?username=${encodeURIComponent(
          username
        )}&groupname=${encodeURIComponent(
          groupname
        )}&groupicon=${encodeURIComponent(
          groupicon
        )}&membercount=${membercount}&profile=${encodeURIComponent(
          profile
        )}&background=${encodeURIComponent(background)}&apikey=${apiKey}`;

        // Envoyer la requête pour générer l'image
        const response = await axios.get(apiUrl, { responseType: "arraybuffer" });

        // Envoyer l'image de bienvenue dans le groupe
        await conn.sendMessage(
          groupId,
          {
            image: Buffer.from(response.data),
            caption: `🎉 Welcome *${username}* to *${groupname}*! 🎊\nWe are now *${membercount}* members.`,
          }
        );
      }
    }
  } catch (error) {
    console.log("Error in welcome event:", error);
  }
};