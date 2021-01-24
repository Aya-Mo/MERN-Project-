const express = require('express');
const blogrouter = require('./blog');
const userrouter = require('./user');


const router = express();

router.use('/Blog', blogrouter);
router.use('/User', userrouter);


module.exports = router;