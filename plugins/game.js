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


const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "beautiful",
    desc: "Create a beautiful image using the provided image.",
    react: "🌸",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, reply, isGroup, quotedMsg, mentionedJidList }) => {
    try {
        let imageUrl;

        // If the message is a reply and contains an image
        if (quotedMsg && quotedMsg.image) {
            imageUrl = await conn.downloadAndSaveMediaMessage(quotedMsg);
        }
        // If a user is tagged, get their profile picture
        else if (mentionedJidList.length > 0) {
            const userProfilePic = await conn.getProfilePicture(mentionedJidList[0]);
            imageUrl = userProfilePic;
        }
        // If no image is provided, ask the user to send an image
        else {
            return reply("Please reply to an image, mention a user, or send an image to process.");
        }

        // Sending the image to the API for modification
        const apiUrl = `https://api.caliph.biz.id/api/beautiful?url=${encodeURIComponent(imageUrl)}&apikey=57a86dc033a600ac`;
        const response = await axios.get(apiUrl);

        // Check the API response status
        if (response.data.status === "success") {
            // Prepare the formatted information to be sent
            const formattedInfo = "Here is your beautiful image! 🌸";

            // Send the modified image and the additional context info
            await conn.sendMessage(from, {
                image: { url: response.data.result },
                caption: formattedInfo,
                contextInfo: { 
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363321386877609@newsletter',
                        newsletterName: '𝐊𝐄𝐑𝐌 𝐌𝐃',
                        serverMessageId: 143
                    }
                }
            }, { quoted: mek });
        } else {
            // If the API response does not indicate success, show the error message from the API
            console.error("API error response:", response.data);
            reply("Sorry, there was an error processing the image. The API response was not successful.");
        }

    } catch (e) {
        // Log the actual error for debugging
        console.error("Error occurred:", e);
        reply("An error occurred while processing the request. Please try again later.");
    }
});