const { getConfigVars, setConfigVar, deleteConfigVar } = require('./heroku');
const {cmd , commands} = require('../command')

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const appName = process.env.HEROKU_APP_NAME;

  if (text.startsWith('/setvar')) {
    const [command, key, value] = text.split(' ');

    if (key && value) {
      await setConfigVar(appName, key, value);
      bot.sendMessage(chatId, `Variable ${key} set to ${value}`);
    } else {
      bot.sendMessage(chatId, 'Usage: /setvar KEY VALUE');
    }
  }

  if (text.startsWith('/getvars')) {
    const vars = await getConfigVars(appName);
    bot.sendMessage(chatId, JSON.stringify(vars, null, 2));
  }

  if (text.startsWith('/newvar')) {
    const [command, key, value] = text.split(' ');

    if (key && value) {
      await setConfigVar(appName, key, value);
      bot.sendMessage(chatId, `Variable ${key} added with value ${value}`);
    } else {
      bot.sendMessage(chatId, 'Usage: /newvar KEY VALUE');
    }
  }

  if (text.startsWith('/delvar')) {
    const [command, key] = text.split(' ');

    if (key) {
      await deleteConfigVar(appName, key);
      bot.sendMessage(chatId, `Variable ${key} deleted`);
    } else {
      bot.sendMessage(chatId, 'Usage: /delvar KEY');
    }
  }
});