const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const User = require('../models/User')
const Relation = require('../models/Relation')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/home', isLoggedIn, (req,res,next) =>{
  Relation.find()
          .limit(2)
          .populate("destination_Id")
          .populate("offense_Id")
          .then((off) => {
            // console.log(off[0].destination_Id.username);
            res.render('home',{user:req.user._id, off});})
          .catch((e) => {next(e)})
})

router.get('/createnew', isLoggedIn, (req,res,next) =>{
  res.render('createnew',{user:req.user._id});
})


module.exports = router;
