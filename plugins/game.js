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

// Commande pour générer l'image avec l'effet "wanted"
cmd({
  pattern: 'wanted',
  desc: 'Generate a wanted poster for an image',
  react: '🎨',
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
    return reply('⚠️ Please send an image or tag a user to create a wanted poster.');
  }

  try {
    // URL de l'API avec l'image fournie
    const apiUrl = `https://api.caliph.biz.id/api/wanted?url=${encodeURIComponent(imageUrl)}&apikey=57a86dc033a600ac`;

    // Récupérer l'image de la réponse de l'API
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

    // Envoyer l'image générée avec l'effet "wanted" dans le groupe ou à l'utilisateur
    await conn.sendMessage(
      from,
      {
        image: Buffer.from(response.data),
        caption: '🔫 *Wanted Poster* 🔫',
      }
    );
  } catch (error) {
    console.error('Error generating wanted poster:', error);
    return reply('⚠️ An error occurred while generating the wanted poster.');
  }
});
