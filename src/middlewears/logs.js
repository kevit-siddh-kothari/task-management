const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      `./logs/${filename}`,
      `\n${Date.now().toString()}:${req.method}: ${req.path}\n`,
      (err, data) => {
        next();
      }
    )
  };
}

module.exports = {
    logReqRes
};