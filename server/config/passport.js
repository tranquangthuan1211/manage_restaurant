const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Adjust the path to your User model

const MESSAGE_REFUSE = 'Email or password was incorrect'; 

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({ where: { email: email } })
        .then(user => {
          if (!user) {
            return done(null, false, { message: MESSAGE_REFUSE });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: MESSAGE_REFUSE });
            }
          });
        })
        .catch(err => console.log(err));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => done(err, null));
  });
};