import User from '../models/User.js';


export const saveClasses = (username, classes) => {
	return new Promise(async (resolve, reject) => {
		// let {name, teachers, dateStart,dateEnd, weeks, classRating, difficulityRating, explanationRating, personalUnderstanding} = classInfo;
		try {
			const user = await User.findByUsername(username);
			// let newUserInfo = ({
			// 	name: name,
			// 	platforms: platforms,
			// 	genres: genres,
			// 	about: about
			// });

			classes.forEach(element => {
				user.classes.set({
					name: element,
				});
			});

			// user.classes.set({
			// 	name: name,
			// });
			await user.save();
			resolve('user');
		} catch (err) {
			reject(err);
		}
	});
};

export const addClass = (userID, Class) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findByUsername(userID);
			// const checkDup = await user.classes.includes(Class);
			if (user) {
				user.classes.push({name: Class });
				await user.save();
			}
			resolve('has resolved');
		} catch (err) {
			reject(err);
		}
	});
}
