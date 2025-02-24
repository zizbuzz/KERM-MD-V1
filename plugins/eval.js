const { cmd } = require('../command');
const util = require('util');
const fs = require("fs");
const path = require("path");

cmd({
  
    pattern: "eval",
    desc: "system",
    Xinfo: "Evaluate code",
    Xpath: __filename,
  },
  async (m, match) => {
    let c = match;
    if (!c) return m.reply(`_Please provide code to run_`);

    try {
      let s = await eval(c);
      if (typeof s !== "string") s = util.inspect(s);
      await m.reply(s);
    } catch (e) {
      await m.reply(util.format(e));
    }
  }
);