const cloudinary = require("cloudinary").v2;
const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: "do2qwucmp",
  api_key: "395927197317534",
  api_secret: "jOH-NgmPdFNNgj0VaQ2ne9kpfO4",
});

module.exports = cloudinary;
