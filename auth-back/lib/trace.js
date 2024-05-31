const bunyan = require("bunyan");

const log = bunyan.createLogger({
  name: "Todo List",
  stream: process.stdout,
});

module.exports = log;
