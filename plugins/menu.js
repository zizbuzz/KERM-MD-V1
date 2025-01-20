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
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')

cmd({

    pattern: "menu",

    react: "💀",

    alias: ["panel","commands"],

    desc: "Get bot\'s command list.",

    category: "main",

    use: '.menu',

    filename: __filename

},

async(conn, mek, m,{from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
let madeMenu = `╭━━━━━━━━━━╮

    🚀${config.BOT_NAME} 🚀
╰━━━━━━━━━━╯

📅 *Uptime*: ${runtime(process.uptime())}  
🌍 *Mode*: ${config.MODE}  
🔑 *Prefix*: ${config.PREFIX}  
💾 *RAM Usage**: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB  
⚙️ *Bot Name*: ❖『𝗞𝗘𝗥𝗠 𝗠𝗗 𝗩1』❖  
🎨 *Creator*: Kɢ Tᴇᴄʜ  
🔐 *Version*: v4.1.0  
💻 *Always Online*: ${config.ALWAYS_ONLINE} 

━━━━━━━━━━━

🌟*DOWNLOAD COMMANDS*🌟
* .fb
* .insta
* .video
* .gdrive
* .twitter
* .tt
* .mediafire
* .song
* .play
* .video2
* .spotify
* .video4
* .lyrics
* .apk
* .darama
* .play2
* .play4
* .baiscope
* .ginisisila

━━━━━━━━━━━

🎵 *MUSIC COMMANDS* 🎵
* .play
* .video2
* .spotify
* .video4
* .lyrics
* .darama
* .play2
* .play4
* .baiscope
* .ginisisila

━━━━━━━━━━━

👑 *EMPIRE KERM COMMANDS* 👑
* .family
* .vawulence
* .channel
* .support
* .promostaff
* .exor

━━━━━━━━━━━

🔍 *SEARCH COMMANDS* 🔍
* .yts
* .yta
* .loli
* .movieinfo
* .movie
* .weather
* .sticksearch
* .couplepp

━━━━━━━━━━━

💀 *NSFW COMMANDS* 💀
* .nsfw
* .ejaculation
* .penis
* .erec
* .nude
* .sex
* .cute
* .orgasm
* .anal
* .suspension
* .kiss

━━━━━━━━━━━

🤖 *AI COMMANDS* 🤖
* .gpt
* .ai
* .bot

━━━━━━━━━━━

👑 *OWNER COMMANDS* 👑
* .updatecmd
* .settings
* .owner
* .repo
* .system
* .status
* .about
* .block
* .unblock
* .shutdown
* .clearchats
* .setpp
* .broadcast
* .jid
* .gjid
* .pair
* .rank
* .restart

━━━━━━━━━━━━

👥 *GROUP COMMANDS* 👥
* .remove
* .delete
* .add
* .kick
* .kickall
* .setgoodbye
* .setwelcome
* .promote
* .demote
* .tagall
* .getpic
* .invite
* .revoke
* .joinrequests
* .allreq
* .mute
* .unmute
* .lockgc
* .unlockgc
* .leave
* .updategname
* .updategdesc
* .join
* .hidetag
* .ginfo
* .disappear on
* .disappear off
* .disappear 7d 24h 90d
* .senddm

━━━━━━━━━━━━

📃 *INFO COMMANDS* 📃
* .menu
* .menu2
* .menu3
* .about
* .dev
* .script
* .repo
* .alive
* .botinfo
* .status
* .ping
* .ping2
* .system

━━━━━━━━━━━━━

✝️ *GOD COMMANDS* ✝️
* .bible
* .biblelist

━━━━━━━━━━━━━

🎡 *CONVERTER COMMANDS* 🎡
* .sticker
* .trt
* .tts
* .url
* .age
* .tiny

━━━━━━━━━━━━━

⛱️ *RANDOM COMMANDS* ⛱️
* .kerm
* .dog
* .cat
* .anime
* .neko
* .waifu
* .cosplay
* .randomanime
* .animegirl
* .animegirl1
* .animegirl2
* .animegirl3
* .animegirl4
* .animegirl5

━━━━━━━━━━━━━

🏜️ *WALLPAPER COMMANDS* 🏜️
* .img
* .logo
* .ss

━━━━━━━━━━━━━

🌐 *OTHER COMMANDS* 🌐
* .trt
* .joke  
* .fact
* .github
* .gpass
* .hack
* .quote
* .srepo
* .rank
* .timezone
* .define
* .dailyfact
* .minutor

━━━━━━━━━━━━━

`

await conn.sendMessage(from,{image:{url:config.ALIVE_IMG},caption:madeMenu},{quoted:mek})

}catch(e){
console.log(e)
reply(`${e}`)
}
})
