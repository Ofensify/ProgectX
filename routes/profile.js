const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const onlyMe = require('../middlewares/onlyMe');
const User = require('../models/User')
const Relation = require('../models/Relation');
const Offense = require('../models/Offense')

router.get('/profile/:id', onlyMe , (req, res, next) => {
    let user = req.user._id;
    Relation.find({ 'destination_Id': req.user._id })
        .populate("offense_Id")
        .then(relationd => {
            //   console.log(relationd);
            Relation.find({ 'creator_Id': req.user._id })
                .populate("offense_Id")
                .then(relationc => {
                    // console.log(relationc);
                    res.render('profile', { relationc, relationd, user })
                })
                .catch((e) => {
                    next(e);
                })
        });
})

router.get("/delete/:id", (req, res, next) => {
    let off = req.params.id;
    Relation.findById(off)
        .populate("offense_Id")
        .then(c => {
            console.log(c.offense_Id._id)
            Offense.remove({ _id: c.offense_Id._id })
                .then(() => {
                    Relation.findByIdAndRemove(off)
                        .then(() => {
                            res.redirect('/profile')
                        })
                })
        })
        .catch((e) => {
            next(e);
        })
})

router.get('/onlyme', onlyMe, function (req, res, next) {
    res.render('private');
});

module.exports = router;
