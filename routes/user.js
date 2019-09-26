const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

// //POST login
router.route('/signin')
  .get((req, res) => {
    res.render('signin')
  }).post(async (req, res, next) => {
      const login = req.body.login;
      const password = req.body.password;

      if(!login || !password) {
        const fields = [];
        if (!login) fields.push('login');
        if (!password) fields.push('password');

        res.json({
          ok: false,
          error: "Все поля должны быть заполнены",
          fields
        });
      } else {
        User.findOne({
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
            bcrypt.compare(password, user.password, function(err, result) {
              if(!result) {
                res.json({
                  ok: false,
                  error: 'Логин или пароль не верный',
                  fields: ['login', 'password']
                });
              } else {
                req.session.userId = user.id;
                req.session.userLogin = user.login;
                res.json({
                  ok:true
                })
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

//POST register
router.route('/signup')
  .get((req, res) => {
    res.render('signup')
  })
  .post(async (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const login = req.body.login;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    if( !firstName || !lastName || !login || !password || !passwordConfirm) {
      const fields = [];
      if (!firstName) fields.push('firstName');
      if (!lastName) fields.push('lastName');
      if (!login) fields.push('login');
      if (!password) fields.push('password');
      if (!passwordConfirm) fields.push('passwordConfirm');
      res.json({
        ok: false,
        error: 'Все поля должны быть заполнены',
        fields
      });
    } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
      res.json({
        ok: false,
        error: 'Только латинские буквы и цифры',
        fields: ['login']
      });
     } else if (password != passwordConfirm) {
      res.json({
        ok: false,
        error: 'Пароли не совпадают',
        fields: ['password', 'passwordConfirm']
      });
    } else if (password.length < 5) {
    res.json({
      ok: false,
      error: 'Минимальная длина пароля 5 символов!',
      fields: ['password']
    });
  }else {
      User.findOne({
        login
      }).then(user => {
        if (!user) {
          const username = firstName + " " + lastName; 
          bcrypt.hash(password, null, null, function(err, hash) {
            User.create({
              username,
              login,
              password: hash
            }).then(user =>{
              console.log(user);
              req.session.userId = user.id;
              req.session.userLogin = user.login;
              res.json({
                ok:true
              });
            }).catch(err => {
              console.log(err);
              res.json({
                ok:false,
                error: 'Ошибка, попробуйте позже'
              });
            });
          });
        } else {
          res.json ({
            ok: false,
            error: 'Логин занят',
            fields: ['login']
          });
        }
      });
      
    }
  });
 
// GET for logout
router.get('/logout', (req, res) => {
  if (req.session) {
    // delete session object
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router