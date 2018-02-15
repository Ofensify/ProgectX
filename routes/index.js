const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const User = require('../models/User');
const Relation = require('../models/Relation');
const Rating = require('../models/Rating');
const fs = require('fs');
const Dictionary = require("../models/Dictionary");
const Offense = require('../models/Offense');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'offendify@gmail.com',
    pass: '0ffendify'
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
  var offPromises
  Relation.find()
    .limit(2) //limitar a x mas adelante
    .populate("destination_Id")
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
      Promise.all(offPromises).then(objectsArray => {
        // console.log(objectsArray[0])
        res.render('home', { objectsArray })
      })

    })
    .catch((e) => { next(e) })
})

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
  let memes = fs.readdirSync('public/images/memes');
  // find({ "username": { "$regex": "Alberto", "$options": "i" } })
  User.find().exec()
  res.render('createnew', { user: req.user._id, memes, });
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

// NOTA USAR ESTO PARA BUSQUEDA DE USUARIOS.
// User.find({ username: { $regex: new RegExp(req.body.name) }},{ username:1,_id:0})
// .then(user=>console.log(user))

module.exports = router;

