export const saveSurvey = (userID, userInfo, avatar) => {
	return new Promise(async (resolve, reject) => {
		let {name, platforms, genres, about} = userInfo;
		try {
			const user = await db.User.findById(userID);
			// let newUserInfo = ({
			// 	name: name,
			// 	platforms: platforms,
			// 	genres: genres,
			// 	about: about
			// });
			user.set({
				name: name,
				platforms: platforms,
				genres: genres,
				about: about,
				picture: avatar
			});
			await user.save();
			resolve('user');
		} catch (err) {
			reject(err);
		}
	});
};