const express = require('express');
const blogrouter = require('./blog');
const userrouter = require('./user');
const AuthMw = require('../middelwares/Auth');

const router = express();

router.use('/Blog', blogrouter, AuthMw);
router.use('/User', userrouter);


module.exports = router;