import mongoose from 'mongoose';
import session from 'express-session';
export default () => {
	mongoose.Promise = global.Promise;
	return mongoose.connect(process.env.MONGO_DB, {
		dbName: process.env.DB_NAME,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}
