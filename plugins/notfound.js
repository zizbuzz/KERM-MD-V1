const fs = require('fs');
const path = require('path');

// Load the not-found configuration file (contains sticker and voice note paths)
const notFoundConfig = require('../my_data/notfound.json');

/**
 * Sends an unknown command response: a sticker and a voice note.
 * @param {Object} conn - The bot connection instance.
 * @param {String} chatId - The ID of the chat to send the message to.
 */
async function sendUnknownCommandResponse(conn, chatId) {
  try {
    // Read the sticker file as a buffer
    const stickerPath = path.resolve(__dirname, notFoundConfig.sticker);
    const stickerBuffer = fs.readFileSync(stickerPath);

    // Send the sticker (adjust the method if necessary for your library)
    await conn.sendMessage(chatId, { sticker: stickerBuffer });

    // Read the voice note file as a buffer
    const voicePath = path.resolve(__dirname, notFoundConfig.voice);
    const voiceBuffer = fs.readFileSync(voicePath);

    // Send the voice note as a push-to-talk audio message
    await conn.sendMessage(chatId, {
      audio: voiceBuffer,
      mimetype: 'audio/ogg; codecs=opus',
      ptt: true
    });
  } catch (error) {
    console.error("Error sending unknown command response:", error);
  }
}

/**
 * Reads all plugin files from the "plugins" folder and returns an array of available commands.
 * Each plugin is expected to export an object with a string property "pattern".
 * @returns {Array<String>} An array of available command patterns.
 */
function getAvailableCommands() {
  const pluginsDir = path.join(__dirname, 'plugins');
  let availableCommands = [];

  if (fs.existsSync(pluginsDir)) {
    fs.readdirSync(pluginsDir).forEach(file => {
      if (file.endsWith('.js')) {
        try {
          const plugin = require(path.join(pluginsDir, file));
          // If the plugin exports a string "pattern", add it to the list
          if (plugin && plugin.pattern && typeof plugin.pattern === 'string') {
            availableCommands.push(plugin.pattern);
          }
        } catch (err) {
          console.error(`Error loading plugin ${file}:`, err);
        }
      }
    });
  }
  return availableCommands;
}

/**
 * Main command handler.
 * If the user-input command does not exist among the available commands from plugins,
 * the bot sends a sticker and a voice note as a response.
 *
 * @param {Object} conn - The bot connection instance.
 * @param {Object} m - The message object (should contain at least "body" and "chat").
 */
async function handleCommand(conn, m) {
  // Extract the command text (e.g. ".dem")
  const userInput = m.body;
  // Remove the prefix (here, the dot)
  const inputCmd = userInput.startsWith('.') ? userInput.slice(1) : userInput;
  
  // Retrieve available commands from the plugins folder
  const availableCommands = getAvailableCommands();

  // If the input command is not found, send the unknown command response
  if (!availableCommands.includes(inputCmd)) {
    await sendUnknownCommandResponse(conn, m.chat);
  } else {
    // If the command exists, continue normal processing (code à compléter selon vos besoins)
    console.log(`Command .${inputCmd} found. Processing normally...`);
  }
}

// -----------------------
// Example usage:
// -----------------------

// Assume 'conn' is your bot's connection instance and is already defined globally.
const conn = global.conn; // or your connection instance
// Simulate a message object from a user who types ".dem" (an unknown command)
const m = {
  body: '.dem', 
  chat: '1234567890@s.whatsapp.net'
};

// Call the handler to process the command.
handleCommand(conn, m);