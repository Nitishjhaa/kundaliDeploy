const express = require('express');
const { kundaliResponce } = require('../controller/kundaliResponce')

const router = express.Router();

router.post('/kundali', kundaliResponce)


module.exports = router