const express = require('express');

const { AdminLogin, Authen } = require('../controllers/AdminController');

const router = express.Router();

router.post('/login', AdminLogin);
router.get('/authen', Authen);

module.exports = router;