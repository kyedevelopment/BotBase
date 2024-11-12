const Client = require("./structures/Client");
const client = new Client();
client.start();

String.prototype.toTitleCase = function () {
  return this[0].toUpperCase() + this.slice(1).toLowerCase();
};

console.log('[PLACEHOLDER] v1.0.0 | Coded by @kyetm https://github.com/');
