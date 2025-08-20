const express = require('express');
const { matchMatchingResponce } = require('../controller/matchMatchingResponce')

const router = express.Router();

router.post('/match', matchMatchingResponce)


module.exports = router