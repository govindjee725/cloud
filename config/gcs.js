
require('dotenv').config();
const { Storage } = require('@google-cloud/storage');
require('dotenv').config();

const credentials = JSON.parse(process.env.GCP_KEY);

// 🔥 FIX PRIVATE KEY NEWLINE ISSUE
credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

const storage = new Storage({
  credentials,
});

const bucket = storage.bucket('YOUR_BUCKET_NAME');

module.exports = bucket;