const axios = require("axios");
const { cmd } = require("../command");

cmd(
  {
    pattern: "welcome",
    desc: "👋 Generate a welcome image for a new group member.",
    react: "🎉",
    category: "group",
    filename: __filename,
    type: "group",
  },
  async (conn, mek, m, { from, reply, args, pushName, isGroup, sender }) => {
    try {
      // Vérification si la commande est utilisée dans un groupe
      if (!isGroup) {
        return reply("❌ This command can only be used in groups!");
      }

      // Paramètres de test pour générer une image de bienvenue
      const username = pushName || "New Member"; // Nom de l'utilisateur ajouté
      const groupname = m.groupMetadata.subject; // Nom du groupe
      const groupicon = await conn.profilePictureUrl(from, "image") || "https://i.ibb.co/G5mJZxs/rin.jpg"; // Image de l'icône du groupe
      const profile = await conn.profilePictureUrl(sender, "image") || "https://i.ibb.co/G5mJZxs/rin.jpg"; // Image de profil de l'utilisateur
      const membercount = m.groupMetadata.participants.length; // Nombre de membres dans le groupe
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

      // Envoyer l'image de bienvenue
      await conn.sendMessage(
        from,
        {
          image: Buffer.from(response.data),
          caption: `🎉 Welcome *${username}* to *${groupname}*! 🎊\nWe are now *${membercount}* members.`,
        },
        { quoted: mek }
      );
    } catch (error) {
      console.log(error);
      return reply("❌ Failed to generate welcome image. Please try again later.");
    }
  }
);