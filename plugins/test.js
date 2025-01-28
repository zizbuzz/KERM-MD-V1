const { cmd, commands } = require("../command");
const yts = require("yt-search");
const { fetchJson } = require("../lib/functions");
const axios = require('axios');

function convertYouTubeLink(url) {
    const youtubeIdRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeIdRegex);
    return match ? "https://www.youtube.com/watch?v=" + match[1] : url;
}

cmd({
    pattern: "test",
    desc: "To download songs.",
    react: '☃️',
    category: "download",
    filename: __filename
}, async (conn, mek, msg, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            return reply("Please give me a URL or title.");
        }
        q = convertYouTubeLink(q);
        const searchResults = await yts(q);
        const video = searchResults.videos[0];
        const videoUrl = video.url;
        const videoTitle = video.title;
        const videoDate = video.ago;
        const videoGenre = video.genre || "Unknown";
        const videoThumbnail = video.thumbnail;
        
        const responseMessage = `
🎶 *KERM Song Downloader* 🎶

*Title:* ${videoTitle}
*Link:* ${videoUrl}
*Date:* ${videoDate}
*Genre:* ${videoGenre}

Please wait while your song is being downloaded...
        
*Reply with '1' for audio format* (voice note)
*Reply with '2' for document format*
        `;

        await reply(responseMessage);

        conn.ev.on("messages.upsert", async (chatUpdate) => {
            const response = chatUpdate.messages[0];
            const responseBody = response.message.conversation || response.message.extendedTextMessage?.text;

            if (response.key.remoteJid === from && response.message) {
                const formatChoice = responseBody.trim();
                const apiUrl = `https://api.davidcyriltech.my.id/download/ytmp3?url=${videoUrl}`;
                const apiResponse = await axios.get(apiUrl);
                if (!apiResponse.data.success) {
                    return reply(`❌ Failed to fetch audio for "${videoTitle}".`);
                }
                const { download_url } = apiResponse.data.result;

                if (formatChoice === '1') {
                    await conn.sendMessage(from, {
                        audio: { url: download_url },
                        mimetype: 'audio/mp4',
                        ptt: false,
                        contextInfo: {
                            externalAdReply: {
                                title: videoTitle,
                                body: videoGenre,
                                mediaType: 1,
                                mediaUrl: videoUrl,
                                thumbnailUrl: videoThumbnail,
                                showAdAttribution: true
                            }
                        }
                    }, { quoted: mek });
                } else if (formatChoice === '2') {
                    await conn.sendMessage(from, {
                        document: { url: download_url },
                        mimetype: 'audio/mp3',
                        fileName: `${videoTitle}.mp3`,
                        caption: `Generated for you by KERM-MD-V1`,
                        contextInfo: {
                            externalAdReply: {
                                title: videoTitle,
                                body: videoGenre,
                                mediaType: 1,
                                mediaUrl: videoUrl,
                                thumbnailUrl: videoThumbnail,
                                showAdAttribution: true
                            }
                        }
                    }, { quoted: mek });
                } else {
                    reply("Invalid choice. Please reply with '1' for audio format or '2' for document format.");
                }
            }
        });
    } catch (error) {
        console.error(error);
        reply("❌ An error occurred while processing your request.");
    }
});