require('dotenv').config();
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: process.env.GCP_KEY_PATH, // ✅ correct
});

const bucket = storage.bucket(process.env.BUCKET_NAME);

module.exports = bucket;