import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../models/User.js';
import express from 'express';
import jwt from 'passport-jwt';
import { Error } from 'mongoose';
const app = express();

export const register = async (req, res, next) => {
  try {
    let data = {
      layout: 'base.njk',
      title: 'Welcome',
    };

    res.render('register.njk', data);
  } catch (err) {
    let data = {
      error: { message: err },
      layout: 'base.njk',
    };
    res.render('register.njk', data);
    next();
  }
};

// export const doRegister = async (req, res, next) => {
//   let newUser = new User(req.body);
//   newUser.provider = 'local';
// 	const user = await User.findOne({ email: newUser.email }).exec();
// 	if (!user) {
// 		try {
// 			await newUser.save();
//   	  await req.login(newUser);
//     	return res.redirect('/survey/');
// 		} catch (err) {
// 			console.log(err)
// 			return res.render('register.njk', {
// 				layout: 'base.njk',
// 				error: {message: err},
// 				user: newUser,
// 			});
// 		}
// 	} else {
// 		return res.render('register.njk', {
// 			layout: 'base.njk',
// 			error: { message: user },
// 			user: newUser,
// 		});
// 	}
// }

export const doRegister = async (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  let data = {
    layout: 'base.njk',
    title: 'Welcome',
    error: null,
    message: '',
    succes: '',
  };

  try {
    await User.register(
      new User({
        username: req.body.username,
        email: req.body.username,
        name: req.body.name,
        id: id,
      }),
      username,
      function (err, user) {
        if (err) {
          data.succes = false;
          data.message = err;

          res.render('register.njk', data);
        } else {
          req.login(user, (er) => {
            if (er) {
              data.succes = false;
              data.message = er;
              res.render('register.njk', data);
            } else {
              res.redirect('/course/start');
            }
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

// export const doRegister = async (req, res, next) => {

// 	// const user = new User({username: req.body.username})
// 	// await user.register(req.body.username, req.body.password)
// 	// await user.save();

// 	// const authenticate = User.authenticate();

// 	// authenticate(req.body.username, req.body.password, function(err, result) {
// 	// 	if (err) next(err)

// 	// 	// Value 'result' is set to false. The user could not be authenticated since the user is not active
// 	// });
// 	console.log('registering user');
// 	User.register(
// 		new User({ username: req.body.username, id: req.body.id, name: req.body.name }),
// 		req.body.password,
// 		function (err) {
// 			if (err) {
// 				console.log('error while user register!', err);
// 				return next(err);
// 			}

// 			res.locals.user = req.user;
// 			console.log('user registered!');

// 			// req.session.save(function (err) {
// 			//   if (err) return next(err);
// 			//   res.redirect('/');
// 			// });

// 			res.redirect('/survey/');
// 		}
// 		)

// 	}

export const login = async (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  let data = {
    layout: 'base.njk',
    title: 'Welcome',
    error: null,
    message: '',
  };

  try {
    res.render('login.njk', {
      layout: 'base.njk',
    });
  } catch (err) {
    let data = {
      error: { message: err },
      layout: 'base.njk',
    };
    res.render('login.njk', data);
    next();
  } finally {
  }
};

// export const doLogin = (req, res, next) => {
// 	passport.authenticate('local', {
// 	successRedirect: "/survey/",
// 	failureRedirect: "/login",
// 	failureFlash: 'failed'
// },function(req, res, next) {
// 	passport.authenticate('local', function(err, user, info) {
// 			return done(null, false, {
// 					message: err
// 			});
// 	});
// })}

export const doLogin = async (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  console.log('req.login')
console.log(req.login)

  let data = {
    layout: 'base.njk',
    title: 'Welcome',
    error: null,
    message: '',
    error: '',
  };
  try {
    if (req.body.username) {
      console.log(username)
      await User.findByUsername(username, username, function (err, user) {
        if (err) {
          console.log(err);
          data.succes = false;
          data.error = err;
          res.render('login.njk', data);
        } else {
          req.login(user, (er) => {
            if (er) {
              console.log(er);
              data.succes = false;
              data.error = 'Email not found';
              res.render('login.njk', data);
            } else {
              console.log('req.login')
              console.log(req.login)
              res.redirect('/course/start');
            }
          });
        }
      });
    } else {
      res.render('login.njk', data);
    }
  } catch (error) {
    res.render('login.njk', data);
    next(error);
  }
};

export const doLoginOLD = (req, res, next) => {
  const { password, username } = req.body;

  // try {
  // 	const findThisUser = User.findByUsername(username)
  // 	return User.authenticate('local', findThisUser)
  // } catch (err) {
  // 	next(err)
  // }

  if (!req.body.username) {
    res.json({ success: false, message: 'Username was not given' });
  } else if (!req.body.password) {
    res.json({ success: false, message: 'Password was not given' });
  } else {
    console.log(req.body);
    passport.authenticate('local', function (err, user, info, status) {
      console.log(user);
      if (err) {
        res.json({ success: false, message: 'unknown error' });
        next(err);
      } else {
        if (!user) {
          res.json({
            success: false,
            message: 'username or password incorrect',
          });
        } else {
          const signInUser = User.findByUsername(user.username, user.password);
          console.log(signInUser);
          req.logIn(user, (er) => {
            if (er) {
              res.json({ success: false, message: er });
            } else {
              console.log('user login');
              console.log(user);
            }
          });
          // req.login(user, (er) => {
          // 	if (er) {
          // 		res.json({ success: false, message: er });
          // 	} else {
          // 		res.json({ success: true, message: 'Your account has been saved' });
          // 	}
          // });
          console.log(user);
          res.redirect('/classes');
        }
      }
    })(req, res, next);
  }
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};

// try {

// 	  User.findOne({
// 	    username: newUser.username,
// 	  }).exec(function (err, user) {
// 	    if (err) return next(err);
// 	    if (!user) {
// 	      newUser.save(function (err) {
// 	        if (err) {
// 	          return res.render('error.njk', {
// 	            errors: req.flash,
// 	            user: newUser,
// 	          });
// 	        }
// 	        req.logIn(newUser, function (err) {
// 	          if (err) return next(err);
// 	          return res.redirect('/');
// 	        });
// 	      });
// 	    } else {
// 	      return res.render('error.njk', {
// 					layout:  'base.njk',
// 	        errors: [
// 	          {
// 	            message: 'email already registered',
// 	          },
// 	        ],
// 	        user: newUser,
// 	      });
// 	    }
// 	  });
// } catch (err) {
// 	next()
// }

// Post login
