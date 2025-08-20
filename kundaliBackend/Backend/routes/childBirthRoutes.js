const express = require('express');
const { childResponce } = require('../controller/childResponce')

const router = express.Router();

router.post('/child',childResponce)


module.exports = router


