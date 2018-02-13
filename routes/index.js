const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/profile', (req, res, next) => {
  res.render('profile');
});

router.get('/private', (req,res,next) => {
  res.render('private');
})

router.get('/onlyme', onlyMe, (req, res, next) => {
  res.render('private');
});

module.exports = router;
