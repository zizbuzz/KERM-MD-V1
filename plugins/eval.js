const { cmd } = require('../command');
const util = require('util');
const fs = require("fs");
const path = require("path");

cmd({
    pattern: "eval",
    desc: "system",
    category: "Evaluate code",
    filename: __filename,
  },
  async (m, match) => {
    let c = match;
    if (!c) return m.send(`_Please provide code to run_`);

    try {
      let s = await eval(c);
      if (typeof s !== "string") s = util.inspect(s);
      await m.send(s);
    } catch (e) {
      await m.send(util.format(e));
    }
  }
);