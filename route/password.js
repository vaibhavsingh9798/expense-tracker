const express = require('express')
const passwordController = require('../controller/password')
const router = express.Router();

router.post('/forgotpassword',passwordController.postMail)

module.exports = router;