import mongoose, { SchemaTypes } from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

const WORK_FACTOR = 10;

const ClassSchema = new Schema({
  name: {
    type: String,
  },
  teachers: Array,
  dateStart: Date,
  dateEnd: Date,
  weeks: Number,
  classRating: Number,
  difficultyRating: Number,
  explanationRating: Number,
  personalUnderstanding: String,
});


// ClassSchema.plugin(mongooseAutoPopulate);



const UserSchema = new Schema({
  id: Number,
  name: String,
  email: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: String,
  classes: [
    {
      type: ClassSchema,
    },
  ],
  admin: Boolean,
  currentClass: String,
});

// UserSchema.plugin(mongooseAutoPopulate);
UserSchema.plugin(passportLocalMongoose);


// UserSchema.pre('save', function (next) {
// 	const user = this;
// 	// only hash the password if it has been modified (or is new)
// 	if (!user.isModified('password')) {
// 		return next();
// 	}
// 	// generate a salt
// 	bcrypt.genSalt(WORK_FACTOR, function (err, salt) {
// 		if (err) return next(err);

// 		// hash the password along with our new salt
// 		bcrypt.hash(user.id, salt, function (err, hash) {
// 			if (err) return next(err);

// 			// override the cleartext id with the hashed one
// 			user.id = hash;
// 			// let mongoose know we're done now that we've hashed the plaintext password
// 			next();
// 		});
// 	});
// });

// UserSchema.methods.validatePassword = function (candidatePassword) {
// 	return new Promise((resolve, reject) => {
// 		User.compare(candidatePassword, this.password, function (err, isMatch) {
// 			if (err) return reject(err);
// 			resolve(isMatch);
// 		});
// 	});
// };

const User = mongoose.model('User', UserSchema);
export const Class = mongoose.model('Class', ClassSchema);
export default User;


