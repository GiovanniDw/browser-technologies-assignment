import User, { Class } from "../models/User.js";

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

      await classes.forEach((element) => {
       user.classes.set({
          name: element,
        });
      });

      // user.classes.set({
      // 	name: name,
      // });
      await user.save();
      resolve("user");
    } catch (err) {
      reject(err);
    }
  });
};

export const addClass = (userID, ClassName) => {
  console.log(userID)
  return new Promise(async (resolve, reject) => {
    try {
      let classItem = {
        name: ClassName,
      };
      const user = await User.findById(userID);
      const checkDup = await user.classes.some(
        (item) => item.name !== classItem.name
      );
      console.log(ClassName);

      if (!checkDup) {
        user.classes.create(classItem);
        await user.save();
      }
      resolve("has resolved");
    } catch (err) {
      reject(err);
    }
  });
};

export const updateClass = (userID, classID, classInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        teachers,
        dateStart,
        dateEnd,
        classRating,
        difficultyRating,
        explanationRating,
        personalUnderstanding,
      } = classInfo;
      console.log(classInfo)
      const user = await User.findById(userID);
      const classes = user.classes;
      const currentClass = classes.id(classID)
      console.log('classes');
      console.log(classes);
      console.log('classID');
      console.log(classID);
      // const currentClass = await user.classes.name(classID);
      currentClass.set({
        dateStart: dateStart,
        dateEnd: dateEnd,
        classRating: classRating,
        difficultyRating: difficultyRating,
        explanationRating: explanationRating,
        personalUnderstanding: personalUnderstanding,
        teachers: teachers
      });
      await user.save();
      resolve("has resolved");
    } catch (err) {
      reject(err);
    }
  });
};

export const myClasses = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(userID)
        .select("classes")
        .populate("classes");
      resolve(user.classes);
    } catch (err) {
      reject({
        type: "error",
      });
    }
  });
};

export const getFirstClass = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(userID);
      if (user) {
        const firstClass = user.classes[0];
        return firstClass;
      }
      resolve(firstClass);
    } catch (err) {
      reject({
        type: "error",
      });
    }
  });
};
