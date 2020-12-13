// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt-nodejs");
// const jwt = require("jsonwebtoken");

// const User = require("../models/users");

// exports.user_signup = (req, res, next) => {console.log(req.body.email);
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Mail exists"
//         });
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: err
//             });
//           } else {
//             const user = new User({
//               _id: new mongoose.Types.ObjectId(),
//               email: req.body.email,
//               password: hash
//             });
//             user
//               .save()
//               .then(result => {
//                 console.log(result);
//                 res.status(201).json({
//                   message: "User created"
//                 });
//               })
//               .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                   error: err
//                 });
//               });
//           }
//         });
//       }
//     });
// };

// exports.user_login = (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: "Auth failed"
//         });
//       }
//       bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//         if (err) {
//           return res.status(401).json({
//             message: "Auth failed"
//           });
//         }
//         if (result) {
//           const token = jwt.sign(
//             {
//               email: user[0].email,
//               userId: user[0]._id
//             },
//             process.env.JWT_KEY,
//             {
//               expiresIn: "1h"
//             }
//           );
//           return res.status(200).json({
//             message: "Auth successful",
//             token: token
//           });
//         }
//         res.status(401).json({
//           message: "Auth failed"
//         });
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };

// exports.user_delete = (req, res, next) => {
//   User.remove({ _id: req.params.userId })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "User deleted"
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };


const User = require("../models/users");

exports.getUserById=(req,res,next,id)=>{
    User.findById(id).exec((err,user)=>{
        if(err|| !user){
            return res.status(400).json({
                error:"no user found"
            })
        }
        req.profile = user
        next()
    })
}
exports.getUser = (req ,res)=>{
  let limit = req.query.limit ? parseInt(req.query.limit) : 8
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"

  User.find()
  
  .sort([[sortBy,"asc"]])
  .limit(limit)
  .exec((err,users)=>{
      if(err){
          return res.status(400).json({
              error:"no product"
          })
      }
      res.json(users)
  })
}

exports.updateUser = (req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new: true, useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error:"error"
                })
            }
            
            res.json(user)
        }
    )
}
