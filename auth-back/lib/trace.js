const bunyan = require("bunyan");

const log = bunyan.createLogger({
  name: "DOVOS",
  stream: process.stdout,
});

module.exports = log;
