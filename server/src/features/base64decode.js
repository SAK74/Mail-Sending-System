function base64decode(param) {
  const buff = Buffer.from(param, "base64");
  const decoded = buff.toString("ascii").split(":");
  return decoded;
}

module.exports = base64decode;
