
import express from  'express';
import multer from 'multer';
import {isAuthenticated} from '../config/middleware/auth.js';
import {register, doRegister, login, doLogin} from '../controllers/AuthController.js';
import {start, surveyClass, saveClasses, postSurveyClass, courseElement} from '../controllers/SurveyController.js';
import User from '../models/User.js';

import connectEnsureLogin from 'connect-ensure-login';
import { getFirstClass } from '../helpers/SurveyHelper.js';
import { courseData } from '../helpers/courseData.js';

const Classes = [{
  name: "Css to the rescue",
  teachers: ["Sanne", "Vasilis"],
  dateStart: Date,
  dateEnd: Date,
  weeks: Number,
  classRating: Number,
  difficultyRating: Number,
  explanationRating: Number,
  personalUnderstanding: String
}]


const upload = multer();
const router = express.Router();



router.get('/start',start);
router.post('/start', upload.array(), saveClasses);
// router.get('/save/class', async(req, res,next) => {
//   try {
//     const user = req.user;
    
//     const firstClass = await user.classes[0].name
//     res.redirect(`/course/${firstClass}`)
//     next()
//   } catch (err) {
//     next(err)
//   }
// });

router.get('/', (req,res,next) => {
  res.redirect('/course/css-to-the-rescue')
})


courseData.forEach((course)=>{
  router.get(`/${course.slug}`, courseElement);
  console.log("Name: "+course.name+", Route: "+course.slug);
});



// router.get('css-to-the-rescue', courseElement);
// router.get('web-app-from-scratch', courseElement);
// router.get('progressive-web-app', courseElement);
// router.get('browser-technologies', courseElement);

// router.get('/css-to-the-rescue', courseElement);

router.get('/survey/:name', surveyClass);
router.post('/survey/:name', upload.none(), postSurveyClass);


// router.get('/welcome', requiresLogin , welcome);


// router.post('/login',upload.array(), doLogin);

// router.get('/register', register);
// router.post('/register', upload.array(), doRegister);


export default router;
