// Required modules
const fs = require("fs");
const path = require("path");

// Bot-specific modules (déjà utilisés dans vos commandes)
const astro_patch = require("../astro_patch");
const { setCmdAlias } = global;

// Command implementation
astro_patch.cmd(
  {
    pattern: "setcmd",
    desc: "Set a new alias for an existing command or sticker",
    react: "⚙️",
    category: "settings",
    filename: __filename,
  },
  async (message, { text, isSticker, stickerData }) => {
    try {
      // Check if text or sticker is provided
      if (!text && !isSticker) {
        return await message.reply(
          "*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*"
        );
      }

      // Extract new alias and original command from text
      const queryParts = text ? text.split(",") : [];
      let newCommand = queryParts[0]?.trim().toLowerCase();
      const originalCommand = queryParts[1]?.trim().toLowerCase();

      // Handle stickers
      if (isSticker && stickerData) {
        newCommand = stickerData.fileSha256.toString("base64");
      }

      // Validate new alias
      if (!newCommand || newCommand.length < 1) {
        return await message.reply(
          "*_Uhh Please, Provide New_Cmd Name First_*"
        );
      }

      // Check if alias already exists
      if (setCmdAlias && setCmdAlias[newCommand]) {
        return await message.reply(
          `*_"${isSticker ? "Given Sticker" : newCommand}" Already set for "${
            setCmdAlias[newCommand]
          }" Cmd, Please try another ${isSticker ? "Sticker" : "Name"}_*`
        );
      }

      // Find the original command
      const foundCommand =
        astro_patch.commands.find((cmd) => cmd.pattern === originalCommand) ||
        astro_patch.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(originalCommand)
        );

      // If the command exists, set the alias
      if (foundCommand) {
        if (!setCmdAlias) {
          global.setCmdAlias = {};
        }

        setCmdAlias[newCommand] = foundCommand.pattern;

        // Success: Alias set
        return await message.reply(
          `*_Cmd "${setCmdAlias[newCommand]}" Successfully set to "${
            isSticker ? "Sticker" : newCommand
          }"._*\n*_These all names are reset if the bot restarts_*`
        );
      } else {
        // Command not found
        return await message.reply(
          `*_Provided Cmd (${originalCommand}) not found in bot commands. Please provide a valid command name_*`
        );
      }
    } catch (error) {
      // Catch all errors
      await message.reply(
        `❌ *An error occurred while processing your request:* ${error.message}`
      );
    }
  }
);