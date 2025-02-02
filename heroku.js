const Heroku = require('heroku-client');

const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });

async function getConfigVars(appName) {
  try {
    const configVars = await heroku.get(`/apps/${appName}/config-vars`);
    return configVars;
  } catch (error) {
    console.error('Failed to get config vars:', error);
  }
}

async function setConfigVar(appName, key, value) {
  try {
    await heroku.patch(`/apps/${appName}/config-vars`, {
      body: {
        [key]: value
      }
    });
    console.log(`Variable ${key} set to ${value}`);
  } catch (error) {
    console.error(`Failed to set variable ${key}:`, error);
  }
}

async function deleteConfigVar(appName, key) {
  try {
    await heroku.patch(`/apps/${appName}/config-vars`, {
      body: {
        [key]: null
      }
    });
    console.log(`Variable ${key} deleted`);
  } catch (error) {
    console.error(`Failed to delete variable ${key}:`, error);
  }
}

module.exports = { getConfigVars, setConfigVar, deleteConfigVar };