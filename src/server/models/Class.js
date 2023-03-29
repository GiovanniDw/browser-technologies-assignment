import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WORK_FACTOR = 10
const ClassSchema = new Schema({
  name: {
		type: String,
		index: {unique: true}
	},
  teachers: String,
  weeks: Number,
  email: {
		type: String,
		required: true,
		index: {unique: true}
	},
  classRating: Number,
  difficultyRating: Number,
  explanationRating: Number,
  personalUnderstanding: String
})

const Class = mongoose.model('Class', ClassSchema);

export default Class