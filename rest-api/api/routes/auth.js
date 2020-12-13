const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);
const service = process.env.service;

const {signout, signup} = require("../controllers/auth")
const { body, validationResult, check } = require('express-validator');

const express = require("express");
const { delay } = require('lodash');
const router = express.Router();
router.post("/", (req, res, next) => {
    console.log(req.body.email)
    client.verify.services(service)
        .verifications
        .create({ to: req.body.email, channel: 'email' })
        .then(verification => {
            console.log(verification.status)
            res.status(200).json({
                verification
            })
        }).catch(err => {
            console.log(err),
                res.status(500).json({
                    err: err
                });
        })
});

router.post("/phone", (req, res, next) => {
    console.log(req.body.phone);
    client.verify.services(service)
        .verifications
        .create({ to: '+91' + req.body.phone, channel: 'sms' })
        .then((verification) => {
            console.log(verification.status); res.status(200).json({
                status: "ok"
            })
        }).catch(err => {
            console.log(err);
            res.status(401).json({
                status: "failed",

            });
        });
});
router.post("/call", (req, res, next) => {
    console.log(req.body.phone);
    client.verify.services(service)
        .verifications
        .create({ to: '+91' + req.body.phone, channel: 'call' })
        .then((verification) => {
            console.log(verification.status); res.status(200).json({
                status: "ok"
            })
        }).catch(err => {
            res.status(401).json({
                status: "failed",

            });
        });
});

router.post("/phone/verify", (req, res, next) => {
    console.log("otp" + req.body.phone);
    client.verify.services(service)
        .verificationChecks
        .create({ to: '+91' + req.body.phone, code: req.body.otp })
        .then(verification_check => {
            console.log(verification_check.status);
            res.status(200).json({
                status: verification_check.status
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                status: "failed"
            })
        });
});
router.post("/confirm", (req, res, next) => {
    console.log("otp" + req.body.phone);
    client.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: '+91'+req.body.phone,
            from:  process.env.Twilio_phone
        })
        .then(call => {
            console.log(call.sid);
            res.status(200).json({
                status: "ok"
            });
            setTimeout(function (){

                client.messages 
                .create({ 
                   body: 'Hello!\nYour Booking was Confirmed\nThankyou for using MEDIC😊\n\n\nHave a great day,\nTeam MEDIC😎', 
                   from: 'whatsapp:'+Twilio_phone,       
                   to: 'whatsapp:+91'+req.body.phone 
                 }) 
                .then(message => console.log(message.sid)) 
                .done();
              
              }, 10000);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                status: "failed"
            })
        });
});


router.post("/signup",[
    check("name","name must be 3 chara").isLength({min:3}),
    check("email","enter valid email").isEmail(),
],signup)


router.get("/signout",signout)


module.exports = router;