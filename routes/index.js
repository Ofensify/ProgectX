const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const User = require('../models/User');
const Relation = require('../models/Relation');
const Rating = require('../models/Rating');
const fs = require('fs');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/home', isLoggedIn, (req, res, next) => {
  let objectsArray = [];
  var offPromises
  Relation.find()
  .limit(2) //limitar a x mas adelante
  .populate("destination_Id")
  .populate("offense_Id")
  .then(off => {
    offPromises = off.map((o)=>{
      let object = {
        offense : o,
        isRated :false
      };
     return Rating.findOne({user_Id:req.user._id, offense_Id:o.offense_Id._id })
      .then (votado => {
          if (votado != null) { 
             object.isRated = true;
          }
          return object
      })
    })
    Promise.all(offPromises).then(objectsArray=>{
      console.log(objectsArray[0])
      res.render('home',{objectsArray})
    })
   
  })
  .catch((e) => { next(e) })
})

router.post('/vote/:id', isLoggedIn, (req,res,next) => {
    let off_id = req.params.id;
    let user_id = req.user._id;
    let r = req.body.value;
    const newRating = new Rating ({
      offense_Id: off_id,
      user_Id:user_id,
      rating: r
    })
    newRating.save((err) => {
      if (err) {
        res.render("home", { message: "Something went wrong" });
      } else {
        res.redirect("/home");
      }
    })
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
