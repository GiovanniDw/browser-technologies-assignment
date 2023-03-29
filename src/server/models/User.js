import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WORK_FACTOR = 10
const UserSchema = new Schema({
  id: {
		type: Number,
		required: true,
		index: {unique: true}
	},
  name: String,
  email: {
		type: String,
		required: true,
		index: {unique: true}
	},
})

const User = mongoose.model('User', UserSchema);

export default User