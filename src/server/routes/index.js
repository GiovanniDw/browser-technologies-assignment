import express from "express";

import { saveData } from "../helpers/saveData.js";
import bodyParser from "body-parser";
import multer from "multer";
import User from "../models/User.js";

import {
  register,
  doRegister,
  login,
  doLogin,
  logout,
} from "../controllers/AuthController.js";
import {
  start,
  surveyClass,
  saveClasses,
  postSurveyClass,
  courseElement,
} from "../controllers/SurveyController.js";
// import {default as homeRoutes} from './homeRoutes.js';
import connectEnsureLogin from "connect-ensure-login";
// import homeRoutes from "./homeRoutes.js";
// import authRoutes from "./authRoutes.js";
// import surveyRoutes from "./surveyRoutes.js";
import { isAuthenticated } from "../config/middleware/auth.js";
import { courseData } from "../helpers/courseData.js";


const upload = multer();
const router = express.Router();
// export const indexRouter = (req, res, next) => {

// }

// router.use("/", authRoutes);

router.get("/", doRegister);
router.post("/", upload.array(), doRegister);

router.get("/login", doLogin);
router.post("/login", upload.array(), doLogin);

router.get("/register", register);
router.post("/register", upload.array(), doRegister);

router.get("/logout", logout);
router.post("/logout", logout);

// router.use("/course", surveyRoutes);




// router.get("/course", (req, res, next) => {
//   res.redirect("/login");
// });

router.get("/course/start", start);
router.post("/course/start", upload.array(), saveClasses);



router.get("/course/end", (req, res, next) => {
  let data = {
    user: req.user,
    classes: courseData
  };

  res.render("survey-end.njk", data);
});



courseData.forEach((course) => {
  console.log("Name: " + course.name + ", Route: " + course.slug);
  router.get(`/course/${course.slug}`, courseElement);
});

router.post("/course/:id", upload.none(), postSurveyClass);


// router.get('/welcome', async (req, res, next)=> {
// const user = req.user;

// try {

// } catch (error) {

// }

// })

// module.exports = router

export default router;
