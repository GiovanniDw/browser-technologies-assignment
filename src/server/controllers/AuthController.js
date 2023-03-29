import passport from 'passport';
import User from '../models/User.js';

export const register = (req, res, next) => {
	if (req.user) {
		console.log(req.user)
		return res.redirect('/')
	} else {
  try {
		let data = {
			error: req.flash('error'),
			layout:  'layout.njk',
		}
      res.render('register.njk', data);
  } catch (err) {
    next();
  }}
};

export const doRegister = async (req, res, next) => {
  let newUser = new User(req.body);
  newUser.provider = 'local';
	const user = await User.findOne({ username: newUser.username }).exec();
	if (!user) {
		try {
			await newUser.save();
  	  await req.logIn(newUser);
    	return res.redirect('/survey');
		} catch (err) {
			return res.render('error.njk', {
				layout: 'layout.njk',
				errors: req.flash,
				user: newUser,
			});
		}
	} else {
		return res.render('error.njk', {
			layout: 'layout.njk',
			errors: [{ message: 'email already registered' }],
			user: newUser,
		});
	}



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
// 					layout:  'layout.njk',
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
};

export const login = (req, res, next) => {
	console.log(req.user)
try {
	res.render('login.njk', {
		layout:  'layout.njk',
		error: req.flash('error'),
		user: req.user
	});
} catch (err) {
	next()
}

};
// Post login
export const doLogin = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
});