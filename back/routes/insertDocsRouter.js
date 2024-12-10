const express = require('express');
const router = express.Router();

const insertDocument = require('../controllers/insertDocsController');

router.post('/docs', insertDocument);


module.exports = router;