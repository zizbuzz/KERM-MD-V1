const { cmd } = require("../command");
const { audioEditor } = require("../lib");

// List of available audio effects
const effects = [
  "bass",
  "blown",
  "deep",
  "earrape",
  "fast",
  "fat",
  "nightcore",
  "reverse",
  "robot",
  "slow",
  "smooth",
  "tupai",
];

// Loop through the effects to register each command dynamically
effects.forEach((effect) => {
  cmd(
    {
      pattern: effect, // Command name
      desc: `Applies the ${effect} effect to the given audio.`,
      react: "🎵", // Emoji to react with
      category: "audio",
      use: "<reply to an audio file>",
    },
    async (conn, mek, m, { reply, isAudio, quoted }) => {
      try {
        // Check if the user replied to an audio file
        if (!isAudio) {
          return reply(
            `❌ Please reply to an audio file to apply the *${effect}* effect!`
          );
        }

        // Apply the effect to the audio
        const modifiedAudioPath = await audioEditor(conn, effect, quoted);

        // Send the modified audio back to the chat
        return await conn.sendMessage(
          mek.from, // Original chat
          {
            audio: { url: modifiedAudioPath }, // Path to the modified audio file
            mimetype: "audio/mpeg", // MIME type for audio
          },
          { quoted: mek } // Include the original message as a reply
        );
      } catch (err) {
        console.error(err);
        return reply(
          `❌ An error occurred while applying the *${effect}* effect.\n\nError: ${err}`
        );
      }
    }
  );
});