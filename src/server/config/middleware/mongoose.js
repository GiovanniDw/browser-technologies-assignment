import mongoose from 'mongoose';

export async function connectMongo() {
	mongoose.Promise = global.Promise;
	return await mongoose.connect(process.env.MONGO_DB, {
		dbName: process.env.DB_NAME,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}

export default connectMongo;
