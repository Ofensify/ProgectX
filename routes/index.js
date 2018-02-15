const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const User = require('../models/User');
const Relation = require('../models/Relation');
const Rating = require('../models/Rating');
const Dictionary = require("../models/Dictionary");
const Offense = require('../models/Offense');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'offensify@gmail.com',
    pass: '0ffensify'
  }
});

let mailOptions = {
  from: 'offendify@gmail.com',
  to: '',
  subject: 'Someone wanna hurt you...',
  html: ''
};

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/home', isLoggedIn, (req, res, next) => {
  let objectsArray = [];
  var offPromises;
  var conterPromises;
  Relation.find({})
    .sort({ created_at: -1 })
    .limit(5) //limitar a x mas adelante
    .populate("offense_Id")
    .then(off => {
      offPromises = off.map((o) => {
        let object = {
          offense: o,
          isRated: false
        };
        return Rating.findOne({ user_Id: req.user._id, offense_Id: o.offense_Id._id })
          .then(votado => {
            if (votado != null) {
              object.isRated = true;
            }
            return object
          })
      })
      Promise.all(offPromises)
      .then(array=>{
        array.forEach((a)=>{console.log(a)})
        res.render("home", {array})
      // DELPINO
      // User.find({}, { username: 1 }).then(users => {
      //     counterPromises = users.map(user => {
      //       return Relation.find({creator_Id: user._id})
      //   })
      // })
      //
      // ADRIAN
      // Relation.find({})
      //     .populate("creator_Id")
      //     .then((users)=> {console.log(users)})
      // Promise.all([Promise.all(counterPromises), Promise.all(offPromises)])
    
        // console.log(Math.max.apply(null,array[0]))
        // console.log(array[0])
        // console.log(array[1])
      // })
    })
  })
    .catch((e) => { next(e) })
})

// Promise.all(offPromises)
// .then(array=>{
//   array.forEach((a)=>{console.log(a)})
//   res.render("home", {array})

// console.log(Math.max.apply(null,array[0]))
// console.log(array[0])
// console.log(array[1])
// })      
// })

// Relation.find({}, 'creator_Id')
// .then(result => {
//   console.log(result)
//   checkUser(result);
// })
// .catch(err => console.log(err));

// let storedResults = {};

// const checkUser = (result) => {
//   result.forEach(user => {
//     checkStorage(user.creator_Id)
//   })
// }

// const checkStorage = (id) => {
//   if(storedResults[id]) {
//     storedResults[id] = storedResults[id] + 1;
//   }
//   storedResults[id] = 1;
// }

// let sortable = [];

// for (let id in storedResults) {
//     sortable.push([id, storedResults[id]]);
// }

// sortable.sort(function(a, b) {
//     return a[1] - b[1];
// });

// console.log(sortable);

router.post('/vote/:id', isLoggedIn, (req, res, next) => {
  let off_id = req.params.id;
  let user_id = req.user._id;
  let r = req.body.value;
  const newRating = new Rating({
    offense_Id: off_id,
    user_Id: user_id,
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

router.get('/delete/:id', isLoggedIn, (req, res, next) => {
  let off_id = req.params.id;
  let user_id = req.user._id;
  Rating.findOneAndRemove({ user_Id: user_id, offense_Id: off_id })
    .then(() => {
      res.redirect("/home");
    })
})

router.get('/createnew', isLoggedIn, (req, res, next) => {
  // find({ "username": { "$regex": "Alberto", "$options": "i" } })
  User.find().exec()
  res.render('createnew', { user: req.user._id, name: req.user.username });
})

router.post('/createnew', (req, res, next) => {
  let combi = [req.body.sexo, req.body.character, req.body.complex, req.body.color]
  mailOptions.to = req.body.name;
  Dictionary.find({ 'combination': { $all: combi } })
    .then((offensive) => {
      let off = (Math.floor(Math.random(offensive.length)));
      let text0 = offensive[off].text0;
      let text1 = offensive[off].text1;
      let template_id = req.body.img;
      let username = 'imgflip_hubot'
      let password = 'imgflip_hubot'
      let request = require('request');
      let headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      let options = {
        url: 'https://api.imgflip.com/caption_image',
        method: 'POST',
        headers: headers,
        form: { 'template_id': template_id, 'username': username, "password": password, "text0": text0, "text1": text1 },
      }
      request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          // Print out the response body
          let img_off = (JSON.parse(body).data.url)
          mailOptions.html = (`<img src="${img_off}"></img>`)
          let newOffense = new Offense({
            img: img_off
          })
          newOffense.save()
            .then(off_saved => {
              // let offsaved_id = off_saved._id
              let newRelation = new Relation({
                offense_Id: off_saved._id,
                creator_Id: req.user._id,
              })
              newRelation.save()
                .then(() => {
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                    res.redirect('/home')
                  })
                })
            })
        }
      })
    })
})

module.exports = router;

