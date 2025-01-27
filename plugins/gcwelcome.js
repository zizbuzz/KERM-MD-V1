const axios = require('axios');
const { cmd } = require('../command');

// Variable globale pour savoir si les messages de bienvenue sont activés ou non
let welcomeEnabled = false;

// Commande pour activer/désactiver les messages de bienvenue
cmd({
  pattern: 'welcome (on|off)',
  desc: 'Enable or disable welcome messages',
  react: '🎉',
  category: 'group',
  filename: __filename,
}, async (conn, mek, m, { from, q, reply, match }) => {
  const action = match[1]; // 'on' ou 'off' pour activer/désactiver

  if (action === 'on') {
    welcomeEnabled = true;
    reply('✅ Welcome messages are now enabled.');
  } else if (action === 'off') {
    welcomeEnabled = false;
    reply('❌ Welcome messages are now disabled.');
  } else {
    reply('⚠️ Invalid command. Use `!welcome on` to enable or `!welcome off` to disable.');
  }
});

// Fonction pour écouter les nouveaux membres ajoutés
module.exports = async (conn, update) => {
  if (!welcomeEnabled) return; // Si les messages de bienvenue sont désactivés, ne rien faire

  try {
    // Vérifier si l'événement est un ajout de membres
    if (update.action === 'add') {
      const groupId = update.id; // ID du groupe
      const participants = update.participants; // Les utilisateurs ajoutés

      // Récupérer les informations du groupe
      const groupMetadata = await conn.groupMetadata(groupId);
      const groupname = groupMetadata.subject; // Nom du groupe
      const groupicon =
        (await conn.profilePictureUrl(groupId, 'image')) ||
        'https://i.ibb.co/G5mJZxs/rin.jpg'; // Icone du groupe
      const membercount = groupMetadata.participants.length; // Nombre de membres

      // Pour chaque utilisateur ajouté
      for (const participant of participants) {
        // Récupérer l'URL de l'image de profil de l'utilisateur
        const profile =
          (await conn.profilePictureUrl(participant, 'image')) ||
          'https://i.ibb.co/G5mJZxs/rin.jpg'; // Image de profil

        const username = (await conn.getName(participant)) || 'New Member'; // Nom de l'utilisateur ajouté
        const background = 'https://i.ibb.co/G5mJZxs/rin.jpg'; // Image de fond par défaut
        const apiKey = '57a86dc033a600ac'; // Clé API

        // Construire l'URL de l'API pour générer l'image de bienvenue
        const apiUrl = `https://api.caliph.biz.id/api/welcome?username=${encodeURIComponent(
          username
        )}&groupname=${encodeURIComponent(
          groupname
        )}&groupicon=${encodeURIComponent(
          groupicon
        )}&membercount=${membercount}&profile=${encodeURIComponent(
          profile
        )}&background=${encodeURIComponent(background)}&apikey=${apiKey}`;

        // Envoyer la requête à l'API pour récupérer l'image
        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

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
    console.error('Error in welcome event:', error);
  }
};