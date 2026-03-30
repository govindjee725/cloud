const bucket = require('../config/gcs');
const File = require('../models/File');

// 📤 UPLOAD FILE
exports.uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const fileName = Date.now() + '-' + req.file.originalname;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (err) => {
      res.status(500).send(err.message);
    });

    stream.on('finish', async () => {
      const url = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

      // 🔥 SAVE TO MONGODB
      const newFile = new File({
        url: url,
      });

      await newFile.save();

      res.status(200).json({
        message: 'Upload success',
        url: url,
        data: newFile,
      });
    });

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// 📂 GET FILES
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// ❌ DELETE FILE
exports.deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;

    await bucket.file(filename).delete();

    // 🔥 DELETE FROM DB
    await File.deleteOne({
      url: { $regex: filename },
    });

    res.send('File deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
};