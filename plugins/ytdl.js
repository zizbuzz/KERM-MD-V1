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

const {
  cmd,
  commands
} = require("../command");
const yts = require("yt-search");
const {
  fetchJson
} = require("../lib/functions");
const axios = require('axios');
async function ytmp4(_0x32b019, _0x339734) {
  try {
    if (!_0x32b019 || !_0x339734) {
      throw new Error("url and format parameters are required.");
    }
    const _0xd702fb = parseInt(_0x339734.replace('p', ''), 0xa);
    const _0x3cc703 = {
      'button': 0x1,
      'start': 0x1,
      'end': 0x1,
      'format': _0xd702fb,
      'url': _0x32b019
    };
    const _0x5a1205 = {
      'Accept': '*/*',
      'Accept-Encoding': "gzip, deflate, br",
      'Accept-Language': "en-GB,en-US;q=0.9,en;q=0.8",
      'Origin': 'https://loader.to',
      'Referer': "https://loader.to",
      'Sec-Ch-Ua': "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': "\"Android\"",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Mode': "cors",
      'Sec-Fetch-Site': "cross-site",
      'User-Agent': "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    };
    const _0x4ee39c = await axios.get('https://ab.cococococ.com/ajax/download.php', {
      'params': _0x3cc703,
      'headers': _0x5a1205
    });
    const _0x2d1163 = _0x4ee39c.data.id;
    const _0x137113 = async () => {
      const _0xab25fa = {
        'id': _0x2d1163
      };
      try {
        const _0xeafb6b = await axios.get("https://p.oceansaver.in/ajax/progress.php", {
          'params': _0xab25fa,
          'headers': _0x5a1205
        });
        const {
          progress: _0x48ee9e,
          download_url: _0xd7e658,
          text: _0x245ada
        } = _0xeafb6b.data;
        return _0x245ada === "Finished" ? _0xd7e658 : (await new Promise(_0x485c8a => setTimeout(_0x485c8a, 0x3e8)), _0x137113());
      } catch (_0x27cb21) {
        throw new Error("Error in progress check: " + _0x27cb21.message);
      }
    };
    return await _0x137113();
  } catch (_0x1503ed) {
    console.error("Error:", _0x1503ed);
    return {
      'error': _0x1503ed.message
    };
  }
}
module.exports = {
  'ytmp4': ytmp4
};
function extractYouTubeId(_0x46641b) {
  const _0x4d2333 = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const _0x4136c6 = _0x46641b.match(_0x4d2333);
  return _0x4136c6 ? _0x4136c6[0x1] : null;
}
function convertYouTubeLink(_0x584404) {
  const _0x58dae8 = extractYouTubeId(_0x584404);
  if (_0x58dae8) {
    return "https://www.youtube.com/watch?v=" + _0x58dae8;
  }
  return _0x584404;
}
cmd({
  pattern: "play",
  desc: "To download songs.",
  react: '☃️',
  category: "download",
  filename: __filename
}, async (bot, message, chat, {
  from,
  quoted,
  body,
  isCmd,
  command,
  args,
  q,
  isGroup,
  sender,
  senderNumber,
  botNumber2,
  botNumber,
  pushname,
  isMe,
  isOwner,
  groupMetadata,
  groupName,
  participants,
  groupAdmins,
  isBotAdmins,
  isAdmins,
  reply
}) => {
  try {
    if (!q) {
      return reply("Please provide a URL or title.");
    }

    // Convert YouTube URL or search term
    q = convertYouTubeLink(q);
    const searchResult = await yts(q);
    const video = searchResult.videos[0];
    const videoUrl = video.url;

    // Send thumbnail and options to the user
    const messageResponse = await bot.sendMessage(from, {
      image: { url: video.thumbnail },
      caption: `🎶 *𝖪𝖤𝖱𝖬-𝖬𝖣－𝖵1* 🎶\n━━━━━━━━━━━━━━━━━\n*⟣ Kᴇʀᴍ Sᴏɴɢ Dᴏᴡɴʟᴏᴀᴅᴇʀ ⟢*\n━━━━━━━━━━━━━━━━━\n• 𝒟ℴ𝓃’𝓉 𝒻ℴ𝓇𝑔ℯ𝓉 𝓉ℴ 𝒿ℴ𝒾𝓃 𝓂𝓎 𝒸𝒽𝒶𝓃𝓃ℯ𝓁\nhttps://whatsapp.com/channel/0029Vafn6hc7DAX3fzsKtn45\n━━━━━━━━━━━━━━━━━━\n\n> ℹ️ ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ғᴏʀᴍᴀᴛ\n\n*1 ┃ ᴀᴜᴅɪᴏ sᴏɴɢ 🎵*\n*2 ┃ ᴅᴏᴄᴜᴍᴇɴᴛ sᴏɴɢ 🗂️*\n\n> © 2025 || Kᴇʀᴍ ᴍᴅ`
    }, { quoted });

    const messageId = messageResponse.key.id;

    // Listen for user response and handle download selection
    bot.ev.on("messages.upsert", async (newMessage) => {
      const receivedMessage = newMessage.messages[0];
      if (!receivedMessage.message) return;

      const userResponse = receivedMessage.message.conversation || receivedMessage.message.extendedTextMessage?.text;
      const messageSender = receivedMessage.key.remoteJid;

      // Check if the response is to the download options message
      const isReplyToDownloadMessage = receivedMessage.message.extendedTextMessage &&
        receivedMessage.message.extendedTextMessage.contextInfo.stanzaId === messageId;

      if (isReplyToDownloadMessage) {
        // React to the user's response
        await bot.sendMessage(messageSender, {
          react: { text: '⬇️', key: receivedMessage.key }
        });

        // Fetch download URL
        const downloadData = await fetchJson(`https://api.giftedtech.my.id/api/download/y2mate?apikey=gifted&url=${videoUrl}`);
        const downloadUrl = downloadData.result.download_url;

        // Delete the original message and react again
        await bot.sendMessage(messageSender, { delete: messageResponse.key });
        await bot.sendMessage(messageSender, { react: { text: '⬆️', key: receivedMessage.key } });

        // Check the user's selection and send the appropriate file
        if (userResponse === '1') {
          await bot.sendMessage(messageSender, {
            audio: { url: downloadUrl },
            mimetype: "audio/mpeg",
            contextInfo: {
              externalAdReply: {
                title: video.title,
                body: video.videoId,
                mediaType: 1,
                sourceUrl: video.url,
                thumbnailUrl: video.thumbnail,
                renderLargerThumbnail: true,
                showAdAttribution: true
              }
            }
          }, { quoted: receivedMessage });

          await bot.sendMessage(messageSender, {
            react: { text: '✅', key: receivedMessage.key }
          });

        } else if (userResponse === '2') {
          await bot.sendMessage(messageSender, {
            document: { url: downloadUrl },
            mimetype: "audio/mp3",
            fileName: `${video.title}.mp3`,
            caption: "\n> *© Generated for you By Kerm MD V1 ❤️*\n "
          }, { quoted: receivedMessage });

          await bot.sendMessage(messageSender, {
            react: { text: '✅', key: receivedMessage.key }
          });
        }
      }
    });

  } catch (error) {
    console.log(error);
    reply(`${error}`);
  }
});

cmd({
  'pattern': 'video',
  'desc': "To download videos.",
  'react': '🎥',
  'category': "download",
  'filename': __filename
}, async (_0x2a6587, _0x4b0a32, _0x3ae238, {
  from: _0x2b34ab,
  quoted: _0x2ba078,
  body: _0x46f813,
  isCmd: _0x3262b0,
  command: _0x17c989,
  args: _0x7df19c,
  q: _0x2f11f7,
  isGroup: _0xd32a93,
  sender: _0x4f21a1,
  senderNumber: _0x3cbd23,
  botNumber2: _0x423dc5,
  botNumber: _0x117579,
  pushname: _0x256e29,
  isMe: _0x10a986,
  isOwner: _0x5415e8,
  groupMetadata: _0x24abd2,
  groupName: _0x31f52b,
  participants: _0x3ff081,
  groupAdmins: _0x5f0186,
  isBotAdmins: _0xe9b71d,
  isAdmins: _0x3186a2,
  reply: _0x419796
}) => {
  try {
    if (!_0x2f11f7) {
      return _0x419796("Please give me a URL or title.");
    }
    _0x2f11f7 = convertYouTubeLink(_0x2f11f7);
    const _0x516cf9 = await yts(_0x2f11f7);
    const _0x546126 = _0x516cf9.videos[0x0];
    const _0x16c3d4 = _0x546126.url;
    const _0x51503b = await _0x2a6587.sendMessage(_0x2b34ab, {
      'image': {
        'url': _0x546126.thumbnail
      },
      'caption': "\n*🎶KERM-MD-V1🎶* \n\n┏━━━━━━━━━━━━━\n┃Kᴇʀᴍ ᴍᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ✻\n┗━━━━━━━━━━━━━\n┏━━━━━━━━━━━━━━\n\n🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴛᴏ*\n*ᴅᴏᴡɴʟᴏᴀᴅ ꜰʀᴏᴍᴀᴛ*\n\n*ᴅᴏᴡɴʟᴏᴀᴅ ᴠɪᴅᴇᴏ 🎬*\n\n*1.1*     ┃  *360ᴘ*\n*1.2*     ┃  *480ᴘ*\n*1.3*     ┃  *720ᴘ*\n*1.4*     ┃  *1080ᴘ*\n\n*ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴏᴄᴜᴍᴇɴᴛ 📁*\n\n*2.1*     ┃  *360ᴘ*\n*2.2*     ┃  *480ᴘ*\n*2.3*     ┃  *720ᴘ*\n*2.4*     ┃  *1080ᴘ*\n\n> Kᴇʀᴍ ᴍᴅ✻\n"
    }, {
      'quoted': _0x4b0a32
    });
    ;
    const _0x333085 = _0x51503b.key.id;
    _0x2a6587.ev.on('messages.upsert', async _0xe7662f => {
      const _0x3dce21 = _0xe7662f.messages[0x0];
      if (!_0x3dce21.message) {
        return;
      }
      const _0x1acf8d = _0x3dce21.message.conversation || _0x3dce21.message.extendedTextMessage?.["text"];
      const _0x5cd381 = _0x3dce21.key.remoteJid;
      const _0x5e3294 = _0x3dce21.message.extendedTextMessage && _0x3dce21.message.extendedTextMessage.contextInfo.stanzaId === _0x333085;
      if (_0x5e3294) {
        await _0x2a6587.sendMessage(_0x5cd381, {
          'react': {
            'text': '⬇️',
            'key': _0x3dce21.key
          }
        });
        if (_0x1acf8d === "1.1") {
          const _0x404514 = await ytmp4('' + _0x16c3d4, "360p");
          await _0x2a6587.sendMessage(_0x5cd381, {
            'delete': _0x51503b.key
          });
          await _0x2a6587.sendMessage(_0x5cd381, {
            'react': {
              'text': '⬆️',
              'key': _0x3dce21.key
            }
          });
          await _0x2a6587.sendMessage(_0x5cd381, {
            'video': {
              'url': _0x404514
            },
            'caption': "\n* Gᴇɴᴇʀᴀᴛᴇᴅ ꜰᴏʀ Yᴏᴜ Bʏ Kᴇʀᴍ❤️*\n"
          }, {
            'quoted': _0x3dce21
          });
          await _0x2a6587.sendMessage(_0x5cd381, {
            'react': {
              'text': '✅',
              'key': _0x3dce21.key
            }
          });
        } else {
          if (_0x1acf8d === "1.2") {
            const _0x13f213 = await ytmp4('' + _0x16c3d4, "480");
            await _0x2a6587.sendMessage(_0x5cd381, {
              'delete': _0x51503b.key
            });
            await _0x2a6587.sendMessage(_0x5cd381, {
              'react': {
                'text': '🔃',
                'key': _0x3dce21.key
              }
            });
            await _0x2a6587.sendMessage(_0x5cd381, {
              'video': {
                'url': _0x13f213
              },
              'caption': "\n*Gᴇɴᴇʀᴀᴛᴇᴅ Bʏ Kᴇʀᴍ❤️*\n"
            }, {
              'quoted': _0x3dce21
            });
            await _0x2a6587.sendMessage(_0x5cd381, {
              'react': {
                'text': '✅',
                'key': _0x3dce21.key
              }
            });
          } else {
            if (_0x1acf8d === "1.3") {
              const _0x3e40d4 = await ytmp4('' + _0x16c3d4, '720');
              await _0x2a6587.sendMessage(_0x5cd381, {
                'delete': _0x51503b.key
              });
              await _0x2a6587.sendMessage(_0x5cd381, {
                'react': {
                  'text': '⬆️',
                  'key': _0x3dce21.key
                }
              });
              await _0x2a6587.sendMessage(_0x5cd381, {
                'video': {
                  'url': _0x3e40d4
                },
                'caption': "\n*Gᴇɴᴇʀᴀᴛᴇᴅ Bʏ Kᴇʀᴍ❤️*\n"
              }, {
                'quoted': _0x3dce21
              });
              await _0x2a6587.sendMessage(_0x5cd381, {
                'react': {
                  'text': '✅',
                  'key': _0x3dce21.key
                }
              });
            } else {
              if (_0x1acf8d === '1.4') {
                const _0x14529b = await ytmp4('' + _0x16c3d4, "1080");
                await _0x2a6587.sendMessage(_0x5cd381, {
                  'delete': _0x51503b.key
                });
                await _0x2a6587.sendMessage(_0x5cd381, {
                  'react': {
                    'text': '⬆️',
                    'key': _0x3dce21.key
                  }
                });
                await _0x2a6587.sendMessage(_0x5cd381, {
                  'video': {
                    'url': _0x14529b
                  },
                  'caption': "\n*Gᴇɴᴇʀᴀᴛᴇᴅ ꜰᴏʀ Yᴏᴜ Bʏ Kᴇʀᴍ❤️*\n"
                }, {
                  'quoted': _0x3dce21
                });
                await _0x2a6587.sendMessage(_0x5cd381, {
                  'react': {
                    'text': '✅',
                    'key': _0x3dce21.key
                  }
                });
              } else {
                if (_0x1acf8d === "2.1") {
                  const _0x252f61 = await ytmp4('' + _0x16c3d4, "360");
                  await _0x2a6587.sendMessage(_0x5cd381, {
                    'delete': _0x51503b.key
                  });
                  await _0x2a6587.sendMessage(_0x5cd381, {
                    'react': {
                      'text': '⬆️',
                      'key': _0x3dce21.key
                    }
                  });
                  await _0x2a6587.sendMessage(_0x5cd381, {
                    'document': {
                      'url': _0x252f61
                    },
                    'mimetype': "video/mp4",
                    'fileName': _0x546126.title + ".mp4",
                    'caption': "\n*Gᴇɴᴇʀᴀᴛᴇᴅ ꜰᴏʀ Yᴏᴜ Bʏ Kᴇʀᴍ❤️*\n"
                  }, {
                    'quoted': _0x3dce21
                  });
                  await _0x2a6587.sendMessage(_0x5cd381, {
                    'react': {
                      'text': '✅',
                      'key': _0x3dce21.key
                    }
                  });
                } else {
                  if (_0x1acf8d === '2.2') {
                    const _0x1bbfe2 = await ytmp4('' + _0x16c3d4, '480');
                    await _0x2a6587.sendMessage(_0x5cd381, {
                      'delete': _0x51503b.key
                    });
                    await _0x2a6587.sendMessage(_0x5cd381, {
                      'react': {
                        'text': '⬆️',
                        'key': _0x3dce21.key
                      }
                    });
                    await _0x2a6587.sendMessage(_0x5cd381, {
                      'document': {
                        'url': _0x1bbfe2
                      },
                      'mimetype': "video/mp4",
                      'fileName': _0x546126.title + ".mp4",
                      'caption': "\n*Gᴇɴᴇʀᴀᴛᴇᴅ ꜰᴏʀ Yᴏᴜ Bʏ Kᴇʀᴍ❤️*\n"
                    }, {
                      'quoted': _0x3dce21
                    });
                    await _0x2a6587.sendMessage(_0x5cd381, {
                      'react': {
                        'text': '✅',
                        'key': _0x3dce21.key
                      }
                    });
                  } else {
                    if (_0x1acf8d === "2.3") {
                      const _0x24a2c5 = await ytmp4('' + _0x16c3d4, '720');
                      await _0x2a6587.sendMessage(_0x5cd381, {
                        'delete': _0x51503b.key
                      });
                      await _0x2a6587.sendMessage(_0x5cd381, {
                        'react': {
                          'text': '⬆️',
                          'key': _0x3dce21.key
                        }
                      });
                      await _0x2a6587.sendMessage(_0x5cd381, {
                        'document': {
                          'url': _0x24a2c5
                        },
                        'mimetype': "video/mp4",
                        'fileName': _0x546126.title + ".mp4",
                        'caption': "\n*Gᴇɴᴇʀᴀᴛᴇᴅ ꜰᴏʀ Yᴏᴜ Bʏ Kᴇʀᴍ❤️*\n"
                      }, {
                        'quoted': _0x3dce21
                      });
                      await _0x2a6587.sendMessage(_0x5cd381, {
                        'react': {
                          'text': '✅',
                          'key': _0x3dce21.key
                        }
                      });
                    } else {
                      if (_0x1acf8d === '2.4') {
                        const _0xfcc167 = await ytmp4('' + _0x16c3d4, "1080");
                        await _0x2a6587.sendMessage(_0x5cd381, {
                          'delete': _0x51503b.key
                        });
                        await _0x2a6587.sendMessage(_0x5cd381, {
                          'react': {
                            'text': '⬆️',
                            'key': _0x3dce21.key
                          }
                        });
                        await _0x2a6587.sendMessage(_0x5cd381, {
                          'document': {
                            'url': _0xfcc167
                          },
                          'mimetype': "video/mp4",
                          'fileName': _0x546126.title + ".mp4",
                          'caption': "\n*Gᴇɴᴇʀᴀᴛᴇᴅ ꜰᴏʀ Yᴏᴜ Bʏ Kᴇʀᴍ❤️*\n"
                        }, {
                          'quoted': _0x3dce21
                        });
                        await _0x2a6587.sendMessage(_0x5cd381, {
                          'react': {
                            'text': '✅',
                            'key': _0x3dce21.key
                          }
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  } catch (_0x2c8571) {
    console.log(_0x2c8571);
    _0x419796('' + _0x2c8571);
  }
});

cmd({
  'pattern': "yta",
  'alias': "ytmp3",
  'react': '⬇️',
  'dontAddCommandList': true,
  'filename': __filename
}, async (_0x47e326, _0x16846a, _0x46f567, {
  from: _0x31abbc,
  q: _0x507947,
  reply: _0x17432c
}) => {
  try {
    if (!_0x507947) {
      return await _0x17432c("*Need a YouTube URL!*");
    }
    const _0x5df9ac = await dlyta(_0x507947);
    await _0x47e326.sendMessage(_0x31abbc, {
      'audio': {
        'url': _0x5df9ac.dl_link
      },
      'mimetype': "audio/mpeg"
    }, {
      'quoted': _0x16846a
    });
  } catch (_0x42217d) {
    console.log("First attempt failed:", _0x42217d);
    try {
      const _0x9c7197 = await dlyta(_0x507947);
      await _0x47e326.sendMessage(_0x31abbc, {
        'audio': {
          'url': _0x9c7197.dl_link
        },
        'mimetype': "audio/mpeg"
      }, {
        'quoted': _0x16846a
      });
    } catch (_0x43638b) {
      console.log("Second attempt failed:", _0x43638b);
      await _0x17432c("*Failed to process the request. Please try again later!*");
    }
  }
});