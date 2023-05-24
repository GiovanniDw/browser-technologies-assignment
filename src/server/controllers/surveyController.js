import passport from "passport";
import User, { Class } from "../models/User.js";
import { addClass, updateClass } from "../helpers/SurveyHelper.js";
import { user } from "../config/middleware/auth.js";
import { courseData } from "../helpers/courseData.js";
const classes = [
  "css-to-the-rescue",
  "web-app-from-scratch",
  "browser-technologies",
  "progressive-web-apps",
];

export const start = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = {
      message: "Hello world!",
      layout: "base.njk",
      title: "Nunjucks example",
      user: req.user,
      userClasses: req.user.classes,
      classes: classes,
    };
    console.log("requser");
    console.log(req.user);
    res.render("survey-start.njk", data);
  } catch (err) {
    next(err);
  }
};

export const saveClasses = async (req, res, next) => {
  // const classInfo = req.body;

  // console.log(userID)
  try {
    const { user } = req.user;
    const userID = user._id;
    const selectedClasses = req.body.classes;
    console.log(selectedClasses);

    const thisUser = await User.findById(userID);
    await selectedClasses.forEach(async (element) => {
      console.log(element);

      console.log("1");
      console.log(thisUser);
      let alreadyExists = await thisUser.classes.some(
        (item) => item.name == element
      );
      try {
        console.log("alreadyExists");
        console.log(alreadyExists);

        if (alreadyExists) {
          console.log(`${element} already in user classes`);
          next();
        } else {
          await addClass(userID, element);
          console.log("classes saved");
          // const UserClasses = await User.findById(userID).classes;
        }
        console.log("2");
        console.log(thisUser);
        res.redirect("/course/css-to-the-rescue");
        next();
      } catch (err) {
        next(err);
      }
    });
    console.log("3");
    console.log(thisUser);
    // const UserClasses = await User.findById(userID).classes;

    // if (UserClasses) res.redirect(`/course/${UserClasses[0].name}`);
    if (thisUser.classes[0].name !== undefined) {
      await res.redirect(`/course/${thisUser.classes[0].name}`);
    } else {
      res.redirect("back");
    }
    res.send("ok");
  } catch (err) {
    next(err);
  }
};

export const surveyClass = async (req, res, next) => {
  try {
    const className = req.params.id;
    // let classID = req.params.id;
    const { user } = req.user;
    const userID = req.user._id;
    // let thisClass = await User.findById(classID);
    const thisUser = await User.findById(userID);

    const { classes } = thisUser;
    console.log("classes");
    console.log(classes);
    // const {classes} = user;
    console.log(user);
    // if(classID)
    if (classes.some((obj) => obj.name == className)) {
      classID === obj._id;
      console.log(classID);
      // return res.redirect(`/course/survey/${classes[0].name}`)
    } else {
      console.log("no calss page");
    }
    let data = {
      message: "1",
      layout: "base.njk",
      title: "Nunjucks example",
      user: req.user,
      classes: thisUser.classes,
      currentClass: req.params.name,
      currentPage: req.route.path,
      firstClass: thisUser.classes[0],
      secondClass: thisUser.classes[1],
      thirdClass: thisUser.classes[2],
      fourthClass: thisUser.classes[3],
    };
    for (let i of classes) {
      if (i.name == req.params.id) {
        console.log(i);
        data = {
          message: "2",
          layout: "base.njk",
          title: "Nunjucks example",
          user: req.user,
          currentClass: i,
          nextClass: (i += 1),
          classes: thisUser.classes,
        };
      }
    }

    res.render("survey-class.njk", data);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const postSurveyClass = async (req, res, next) => {
  try {
    console.log(req.body);
    const userID = req.user._id;
    const classID = req.params.name;
    const thisUser = await User.findById(userID);
    const thisClass = await Class.findById(classID);
    const { classInfo } = req.body;

    // await updateClass(userID, classID, classInfo);
    console.log(classInfo);
    const { classes } = req.user;
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const filterValue = (obj, key, value) => obj.filter((v) => v[key] === value);

const getObjBySlug = (objArray, slug) =>
  objArray.find((obj) => obj.url === slug);

export const courseElement = async (req, res, next) => {
  console.log(req)
  const user = req.user;
  console.log("req.params");
  console.log(req.params);
  const page = req.route.path;
  // const currentCourse = filterValue(courseData, 'slug', page)

  const currentCourse = getObjBySlug(courseData, page);

  console.log("currentCourse");
  console.log(currentCourse);
  console.log("page");
  console.log(page);
  try {
    let data = {
      user: user,
      message: "",
      layout: "base.njk",
      title: "Nunjucks example",
      classes: courseData,
      currentClass: currentCourse,
      currentCourse: currentCourse,
      currentPage: req.params.id,
      nextCourse: currentCourse.nextCourse,
      prevCourse: currentCourse.prevCourse,
    };

    res.render("survey-class.njk", data);
  } catch (error) {
    console.log(error);
  }
};
