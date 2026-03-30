const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: 'key.json',
});

const bucketName = 'govind-file-storage-001';

const bucket = storage.bucket(bucketName);

module.exports = bucket;