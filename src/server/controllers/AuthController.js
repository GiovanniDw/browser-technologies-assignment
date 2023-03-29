import passport from 'passport';
import User from '../models/User.js';

export const register = async (req, res, next) => {
  try {
      res.render('register.njk', {
        flash: req.flash('error'),
      });
  } catch (err) {
    next();
  }
};

export const doRegister = async (req, res, next) => {
  let newUser = new User(req.body);
  newUser.provider = 'local';
try {
	  User.findOne({
	    username: newUser.username,
	  }).exec(function (err, user) {
	    if (err) return next(err);
	    if (!user) {
	      newUser.save(function (err) {
	        if (err) {
	          return res.render('error.njk', {
	            errors: req.flash,
	            user: newUser,
	          });
	        }
	        req.logIn(newUser, function (err) {
	          if (err) return next(err);
	          return res.redirect('/');
	        });
	      });
	    } else {
	      return res.render('error.njk', {
	        errors: [
	          {
	            message: 'email already registered',
	          },
	        ],
	        user: newUser,
	      });
	    }
	  });
} catch (err) {
	next()
}
};

export const login = async (req, res, next) => {
	res.render('login.njk', {
		flash: req.flash('error')
	});
};
// Post login
export const doLogin = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
});