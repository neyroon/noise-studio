const path = require("path");

module.exports = {
  images: {
    domains: ["noise-studio.ru", "localhost"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
