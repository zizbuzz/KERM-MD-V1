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

const config = require('../config');
const { cmd, commands } = require('../command');
const { fetchJson } = require('../lib/functions');

cmd({
  pattern: "ai",
  alias: ["chatgpt","gpt"],
  react: "🤖",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/gpt4omini?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 AI RESPONSE:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

//==========SUBZERO MISTRA

cmd({
  pattern: "mistraai",
  alias: ["mistra", "mitra"],
  react: "🪄",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://pikabotzapi.vercel.app/ai/mistral/?apikey=anya-md&message=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 MISTRA AI:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

//====SUBZERO GPT 3

cmd({
  pattern: "gpt3",
  alias: ["gptturbo", "chatgpt3"],
  react: "😇",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/gpt3?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 CHATGPT 3:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

//==========SUBZERO GPT 4

cmd({
  pattern: "gpt4",
  alias: ["ai4", "chatgpt4"],
  react: "🪄",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/gpt4omini?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 CHATGPT 4:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

//==========SUHZERO LLAMA
cmd({
  pattern: "llama3",
  alias: ["llama", "llama2"],
  react: "✅",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/llama3?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 LLAM AI:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

//==========SUBZERO META AI

cmd({
  pattern: "metaai",
  alias: ["meta", "whatsappai"],
  react: "🔄",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/metaai?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 META AI:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

//==========SUBZERO GPT 4o

cmd({
  pattern: "gpt4o",
  alias: ["ai4", "chatgpt4"],
  react: "🟢",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/gpt4omini?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 CHATGPT 4o:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

//==========SUBZERO GEMINI
cmd({
  pattern: "gemini",
  alias: ["bard", "googleai"],
  react: "🪄",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.dreaded.site/api/gemini2?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 GOOGLE AI:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});


 
//==========SUBZERO CLAUDE
cmd({
  pattern: "claudeai",
  alias: ["claude", "cloud"],
  react: "⏳",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/claude?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 CLAUDE AI:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});


//==========SUBZERO AI
cmd({
  pattern: "subzero",
  alias: ["subzeroai", "deeai"],
  react: "⏳",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/wizardlm?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 AI:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});

//==========SUBZERO LORI

cmd({
  pattern: "lori",
  alias: ["mrsfrank", "zim"],
  react: "⏳",
  desc: "AI chat.",
  category: "main",
  filename: __filename
}, async (conn, mek, m, {
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
    if (!q) return reply("Please ask a question or provide input for the AI.");

    const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/lori?text=${q}`);
    console.log(data);

    if (!data.message) return reply("No response from the AI.");

    return reply(` \`🤖 KERM V1 LORI AI:\` \n\n${data.message}`);
  } catch (error) {
    console.error(error);
    reply(`An error occurred: ${error.message}`);
  }
});


 //=========SUHZERO LUDO AI
cmd({
pattern: "ludoai",
alias: ["ludo", "ludi"],
react: "🤖",
desc: "AI chat.",
category: "main",
filename: __filename
}, async (conn, mek, m, {
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
if (!q) return reply("Please ask a question or provide input for the AI.");

// Send processing message
await reply("Please wait... Processing your request ");

const data = await fetchJson(`https://api.davidcyriltech.my.id/ai/gpt4omini?text=${q}`);
console.log(data);
if (!data.message) return reply("No response from the AI.");
return reply(`\`\`\`🤖 KERM V1 GOOGLE AI:\`\`\` \n\n${data.message}`);

} catch (error) {
console.error(error);
reply(`An error occurred: ${error.message}`);
}
});