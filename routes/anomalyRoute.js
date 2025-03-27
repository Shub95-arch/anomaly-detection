const express = require('express');
const router = express.Router();

const multer = require('multer'); // uploader multer
const storage = multer.memoryStorage();
const upload = multer({ dest: `${__dirname}/../upload/` });

const anomalyController = require('../controller/anomalyController');

router.post('/:method', upload.single('file'), anomalyController.getAnomaly);

module.exports = router;
