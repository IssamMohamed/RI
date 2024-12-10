const express = require('express');
const { responceQuery } = require('../controllers/queryController');
const router = express.Router();



router.post('/query', responceQuery);


module.exports = router;