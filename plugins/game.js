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


const axios = require('axios');
const { cmd } = require('../command');

// Commande pour générer une image avec l'effet "beautiful"
cmd({
  pattern: 'beautiful',
  desc: 'Generate a beautiful version of an image',
  react: '💖',
  category: 'fun',
  filename: __filename,
}, async (conn, mek, m, { from, reply, quoted, mentionedJidList }) => {
  // Vérifier si une image est envoyée ou citée
  let imageUrl = '';
  
  // Si un message est cité et contient une image
  if (quoted && quoted.image) {
    imageUrl = await quoted.download();
  }
  // Sinon, vérifier si une image est mentionnée
  else if (mentionedJidList.length > 0) {
    const mentionedUser = mentionedJidList[0];
    imageUrl = await conn.profilePictureUrl(mentionedUser, 'image');
  }
  // Si aucune image n'est fournie, envoyer un message d'erreur
  else if (mek.message.image) {
    imageUrl = await mek.message.download();
  }
  
  if (!imageUrl) {
    return reply('⚠️ Please send an image or tag a user to create a beautiful version.');
  }

  try {
    // URL de l'API avec l'image fournie
    const apiUrl = `https://api.caliph.biz.id/api/beautiful?url=${encodeURIComponent(imageUrl)}&apikey=57a86dc033a600ac`;

    // Récupérer l'image de la réponse de l'API
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

    // Envoyer l'image générée avec l'effet "beautiful" dans le groupe ou à l'utilisateur
    await conn.sendMessage(
      from,
      {
        image: Buffer.from(response.data),  // Convertir la réponse en buffer
        caption: '💖 *Beautiful Version* 💖',  // Message de caption
      }
    );
  } catch (error) {
    console.error('Error generating beautiful image:', error);
    return reply('⚠️ An error occurred while generating the beautiful image.');
  }
});