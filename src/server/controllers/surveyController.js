import passport from "passport";
import User, { Class } from "../models/User.js";
import { addClass, updateClass } from "../helpers/SurveyHelper.js";
import { user } from "../config/middleware/auth.js";
import { courseData } from "../helpers/courseData.js";

console.log(courseData)

// const classes = [
//   "css-to-the-rescue",
//   "web-app-from-scratch",
//   "browser-technologies",
//   "progressive-web-apps",
// ];

export const start = (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  console.log('req.user');
console.log(req.user);
  let data = {
    message: "Hello world!",
    layout: "base.njk",
    title: "Start Survey",
    userClasses: req.user.classes,
    classes: courseData,
    error: null
  };
  try {
    console.log(req.body);
    
    console.log("requser");
    console.log(req.user);
    data.user = req.user
    res.render("survey-start.njk", data);
  } catch (err) {
    data.error = err;
    next(err);
  }
};

export const saveClasses = (req, res, next) => {


  let data = {
    message: "Hello world!",
    layout: "base.njk",
    title: "Nunjucks example",
    user: req.user,
    userClasses: null,
    classes: courseData,
    error: null
  };
  

  if (!req.user) return res.redirect('/login');

  const userID = req.user._id;
  // const classInfo = req.body;

  // console.log(userID)
  try {
    const { user } = req.user;
    console.log(req.user)
    
    const selectedClasses = req.body.classes;
    console.log('selectedClasses');
    console.log(selectedClasses);

    // const thisUser = await User.findById(userID);
    // data.classes = thisUser.classes

    // if (classes.some((obj) => obj.name == selectedClasses)) {
    //   // classID === obj._id;
    //   console.log('if')
    //   // console.log(classID);
    //   // return res.redirect(`/course/survey/${classes[0].name}`)
    // } else {
    //   console.log('else')
    //   // console.log("no calss page");
    // }




if  (req.user.classes) {
   Promise.all(selectedClasses.map(async (element) => {
    console.log('element');
    console.log(element);

    console.log("1");
    // console.log(thisUser);
    let alreadyExists = req.user.classes.some(
      (item) => item.name == element
    );

    if (!alreadyExists) {
      await addClass(userID, element);
      console.log("classes saved");
    } else {
      console.log(`${element} already in user classes`);
      // res.redirect('/course/css-to-the-rescue')
      
    }
  }));
} else {
  return res.redirect('/course/css-to-the-rescue');
}
  



    // await selectedClasses.forEach(async (element) => {
    //   console.log(element);

    //   console.log("1");
    //   console.log(thisUser);
    //   let alreadyExists = await thisUser.classes.some(
    //     (item) => item.name == element
    //   );

    //   if (alreadyExists) {
    //     console.log(`${element} already in user classes`);
        
    //   } else {
    //     await addClass(userID, element);
    //     console.log("classes saved");
    //     // const UserClasses = await User.findById(userID).classes;
    //   }

    //   // try {
    //   //   console.log("alreadyExists");
    //   //   console.log(alreadyExists);

      
    //   //   console.log("2");
    //   //   console.log(thisUser);
    //   //   res.redirect("/course/css-to-the-rescue");
    //   // } catch (err) {
    //   //   next(err);
    //   // }
    // });
    console.log("3");
    // console.log(thisUser);
    // const UserClasses = await User.findById(userID).classes;

    // if (UserClasses) res.redirect(`/course/${UserClasses[0].name}`);
    // if (thisUser.classes[0].name !== undefined) {
    //   await res.redirect(`/course/${thisUser.classes[0].name}`);
    // } else {
    //   res.redirect("back");
    // }
    // res.render("survey-start.njk", data);
    return res.redirect('/course/css-to-the-rescue');
  } catch (err) {
    // data.error = err
    next(err);
    
  }
};

export const surveyClass = async (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  try {
    const className = req.params.id;
    const userID = req.user._id;
    const thisUser = await User.findById(userID);
    const { classes } = thisUser;
    // let classID = req.params.id;
    const { user } = req.user;
    
    // let thisClass = await User.findById(classID);
    

    
    // console.log("classes");
    // console.log(classes);
    // const {classes} = user;
    // console.log(user);
    // if(classID)
    if (classes.some((obj) => obj.name == className)) {
      // classID === obj._id;
      data.currentClassItem = obj
      // console.log(classID);
      // return res.redirect(`/course/survey/${classes[0].name}`)
    }
    let data = {
      message: "1",
      layout: "base.njk",
      title: "Nunjucks example",
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
        // console.log(i);
        data = {
          message: "2",
          layout: "base.njk",
          title: `${currentClass}`,
          nextClass: (i += 1),
          classes: thisUser.classes,
        };
      }
    }

    res.render("survey-class.njk", data);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

export const postSurveyClass = async (req, res, next) => {
  if (!req.user) return res.redirect('/login');
  console.log('req.user')
console.log(req.user)
  try {

    const courseToSave = req.params.id
    const className = req.params.id;
    // const classInfo = req.body;
  
    const nextPage = req.body.nextClass;
  
    const {
      dateStart,
      dateEnd,
      classRating,
      difficultyRating,
      explanationRating,
      personalUnderstanding,
      teachers
    } = req.body;

    // console.log(req.body);
    const userID = req.user._id;
    const thisUser = await User.findById(userID);
    // const thisClass = await Class.findOne(className);
    // console.log('thisClass')
    // console.log(thisClass)
    const {classes}= thisUser;
    if (classes.some((obj) => obj.name == className)) {
      // classID === obj._id;
      const classItem = obj
      let classID = classItem._id
      const classInfo = {
        dateStart,
        dateEnd,
        classRating,
        difficultyRating,
        explanationRating,
        personalUnderstanding,
        teachers
      }

      await updateClass(userID, classID, classInfo);
      // console.log(classID);
      // return res.redirect(`/course/survey/${classes[0].name}`)
    }


    

    
    

 

    // console.log(classInfo);
    // const { classes } = req.user;
    next()
  } catch (err) {
    
    console.log(err);
    next(err)

    return res.redirect(nextPage);
  }
};

const filterValue = (obj, key, value) => obj.filter((v) => v[key] === value);

const getObjBySlug = (objArray, slug) => {
//   console.log('objArray')

//   console.log(objArray)
//   console.log('slug')
// console.log(slug)

  return objArray.find((obj) => obj.slug === slug);
  }

export const courseElement = async (req, res, next) => {
  if (!req.user) return res.redirect('/login');



  const user = req.user;
  // console.log("req.params");
  // console.log(req.params.path);
  
  const path = req.route.path;
  // const currentCourse = filterValue(courseData, 'slug', path)
  // console.log('path')
  // console.log(path)

  let pathArray = req.route.path.split('/');
  let currentSlug = pathArray[2].toString();

  
  // console.log("currentSlug");
  // console.log(currentSlug);
  // console.log('courseData');
  // console.log(courseData);
  

  const currentCourse = await getObjBySlug(courseData, currentSlug);

  // console.log("currentCourse");
  // console.log(currentCourse);
  
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
    console.log("courseElement error")
    console.log(error);
    next(error)
  }
};
