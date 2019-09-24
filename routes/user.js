const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const Joi = require('joi');
const User = require('../models/user');

// //POST is login
router.route('/signin')
  .get((req, res) => {
    res.render('signin')
  }).post(async (req, res, next) => {
      const login = req.body.login;
      const password = req.body.password;

      if(!login || !password) {
        const fields = 0;
        if (!login) fields.push('login');
        if (!password) fields.push('password');

        res.json({
          ok: false,
          error: "Все поля должны быть заполнены",
          fields
        });
      } else {
        models.user,findOne({
          login
        })
        .then(user => {
          if(!user){
            res.json({
              ok: false,
              error: 'Логин или пароль не верный',
              fields: ['login', 'password']
            });
          } else {
            bcrypt.compare(password, user.password, function(err, res) {
              if(!result) {
                res.json({
                  ok: false,
                  error: 'Логин или пароль не верный',
                  fields: ['login', 'password']
                });
              } else {
                
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.json({
            ok: false,
            error: "Ошибка, попробуйте позже"
          });
        });
      }
});
//validation schema
 
// const userSchema = Joi.object().keys({
//   email: Joi.string().email().required(),
//   username: Joi.string().required(),
//   password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required(),
//   confirmationPassword: Joi.any().valid(Joi.ref('password')).required()
// })

//POST register
router.route('/signup')
  .get((req, res) => {
    res.render('signup')
  })
  .post(async (req, res, next) => {
    console.log(req.body);
    res.json({
      ok: true
    })
  });

//     try {
//       const result = Joi.validate(req.body, userSchema)
//       if (result.error) {
//         req.flash('error', 'Data entered is not valid. Please try again.')
//         res.redirect('/users/signup')
//         return
//       }
 
//       const user = await User.findOne({ 'email': result.value.email })
//       if (user) {
//         req.flash('error', 'Email is already in use.')
//         res.redirect('/users/signup')
//         return
//       }
 
//       const hash = await User.hashPassword(result.value.password)
 
//       delete result.value.confirmationPassword
//       result.value.password = hash
 
//       const newUser = await new User(result.value)
//       await newUser.save()
 
//       req.flash('success', 'Registration successfully, go ahead and login.')
//       res.redirect('/users/signin')
 
//     } catch(error) {
//       next(error)
//     }
//   })

//   router.route('/signin')
//   .get((req, res) => {
//     res.render('signin')
//   })
//   .post(async (req, res, next) => {
//     try {
//       const result = Joi.validate(req.body, userSchema)
//       if (result.error) {
//         req.flash('error', 'Data entered is not valid. Please try again.')
//         res.redirect('/users/signin')
//         return
//       }
 
 
//       const hash = await User.hashPassword(result.value.password)
 
//       delete result.value.confirmationPassword
//       result.value.password = hash
 
//       const newUser = await new User(result.value)
//       await newUser.save()
 
//       req.flash('success', 'Registration successfully, go ahead and login.')
//       res.redirect('/users/signin')
 
//     } catch(error) {
//       next(error)
//     }
//   })
 
  module.exports = router