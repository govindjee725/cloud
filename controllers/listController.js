// controllers/listController.js
const bucket = require('../config/gcs');

exports.getFiles = async (req, res) => {
  const [files] = await bucket.getFiles();

  const fileUrls = files.map(file => 
    `https://storage.googleapis.com/${bucket.name}/${file.name}`
  );

  res.json(fileUrls);
};