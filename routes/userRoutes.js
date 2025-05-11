const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const expressLayouts = require('express-ejs-layouts');
const passport = require('passport')

router.use(expressLayouts);

router.get('/signin', async (req, res) => {
    res.render('pages/users/signin', {title : "Sign In"})
})

router.get('/signup', async (req, res) => {
    res.render('pages/users/signup', {title : "Sign Up"})
})

router.get('/success', async (req, res) => {
    res.render('pages/users/success', {title : "Sign Up Success"})
})
//router.post('/signup', userController.registerUser)

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        res.redirect('/users/signin');
      });
  });

router.post('/signup', userController.registerUser)

router.post('/signin', userController.authenticateUser);

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', {title: "Unauthenticated"});
  }

  res.render('pages/users/profile', {
    title: 'Your Profile',
    user: req.user || { name: 'Guest', email: 'Not logged in' },
    error: null,
  });
});

router.post('/update/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', {title: "Unauthenticated"});
  };

  userController.updateUserById(req, res);
});

router.get('/change-password', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', {title: "Unauthenticated"});
  }

  res.render('pages/users/change_password', {
    title: 'Change Password',
    user: req.user || { name: 'Guest', email: 'Not logged in' },
    error: null,
  });
});

router.post('/change-password/:id', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.render('pages/users/unauthenticated', {title: "Unauthenticated"});
  }

  userController.changePassword(req, res);
});
module.exports = router;

