const crypto = require("crypto");

function generateKey() {
    return crypto.randomBytes(20).toString("hex");
}

module.exports = generateKey;
