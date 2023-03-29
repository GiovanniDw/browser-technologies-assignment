import session from 'express-session';
import passport from 'passport';
import flash from 'connect-flash';
import LocalStrategy from 'passport-local';
import User from '../models/User.js';

export const passportMiddleware = (app) => {

  app.use(session({
		// this should be changed to something cryptographically secure for production
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
		// automatically extends the session age on each request. useful if you want
		// the user's activity to extend their session. If you want an absolute session
		// expiration, set to false
		rolling: true,
		name: 'sid', // don't use the default session cookie name
		// set your options for the session cookie
		cookie: {
			httpOnly: true,
			// the duration in milliseconds that the cookie is valid
			maxAge: 20 * 60 * 1000, // 20 minutes
			// recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
			// domain: 'party-finderr.herokuapp.com',
			// recommended you use this setting in production if your site is published using HTTPS
			// secure: true,
		}
	}));
	app.use(flash());
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
  passport.deserializeUser(async (userId, done) => {
		await User.findById(userId)
			.then(function (user) {
				done(null, user);
			})
			.catch(function (err) {
				done(err);
			});
	});
	passport.use(new LocalStrategy((usernameField, passwordField, done) => {
		const errorMsg = 'Invalid username or password';
		User.findOne({
			username: usernameField,
			password: passwordField
		})
			.then(user => {
				// if no matching user was found...
				if (!user) {
					return done(null, false, {
						message: errorMsg
					});
				}
				// call our validate method, which will call done with the user if the
				// passwords match, or false if they don't
				return user.validatePassword(password)
					.then(isMatch => done(null, isMatch ? user : false, isMatch ? null : {
						message: errorMsg
					}));
			})
			.catch(done);
	}));
	// initialize passport. this is required, after you set up passport but BEFORE you use passport.session (if using)
	app.use(passport.initialize());
	// only required if using sessions. this will add middleware from passport
	// that will serialize/deserialize the user from the session cookie and add
	// them to req.user
	app.use(passport.session());
}


export default passportMiddleware;

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://admin:<password>@browsertech.amdujfn.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// 'mongodb+srv://admin:<password>@browsertech.amdujfn.mongodb.net/?retryWrites=true&w=majority'