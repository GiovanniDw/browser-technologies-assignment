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

export const addClass = (userID, ClassName) => {
	return new Promise(async (resolve, reject) => {
		try {
			console.log(ClassName)
			const classItem = {
				name: ClassName
			}
			const user = await User.findById(userID);
			const checkDup = await user.classes.includes(classItem);
			if (!checkDup) {
				await user.classes.push(classItem);
				await user.save();
			}
			resolve('has resolved');
		} catch (err) {
			reject(err);
		}
	});
}

export const myClasses = (userID) => {
	return new Promise(async (resolve, reject) => {
		try {
			const user = await User.findById(userID).select('classes').populate('classes');
			resolve(user.classes);
		} catch (err) {
			reject({
				type: 'error'
			});
		}
	});
}