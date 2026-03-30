const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');

const {
  uploadFile,
  deleteFile,
  getFiles,
} = require('../controllers/uploadController');

// ✅ Upload
router.post('/upload', upload.single('file'), uploadFile);

// ✅ Get files (with createdAt)
router.get('/files', getFiles);

// ❌ Delete
router.delete('/delete/:filename', deleteFile);

module.exports = router;