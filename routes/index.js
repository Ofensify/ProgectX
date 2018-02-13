const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const User = require('../models/User')
const Relation = require('../models/Relation')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

module.exports = router;
