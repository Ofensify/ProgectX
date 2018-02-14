const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const User = require('../models/User');
const Relation = require('../models/Relation');
const fs = require('fs');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/home', isLoggedIn, (req, res, next) => {
  Relation.find()
    .limit(2)
    .populate("destination_Id")
    .populate("offense_Id")
    .then((off) => {
      // console.log(off[0].destination_Id.username);
      res.render('home', { user: req.user._id, off });
    })
    .catch((e) => { next(e) })
})

router.get('/createnew', isLoggedIn, (req, res, next) => {
  let memes = fs.readdirSync('public/images/memes');
  User.find().exec()
  res.render('createnew', { user: req.user._id, memes });
})

router.post('/createnew', isLoggedIn, (req, res, next) => {
  // let src = $('.active').children().attr('src');
  // console.log (src)
  res.redirect('/home')
})
module.exports = router;
