
import express from  'express';
import multer from 'multer';
import {isAuthenticated} from '../config/middleware/auth.js';
import {register, doRegister, login, doLogin} from '../controllers/AuthController.js';
import {start, surveyClass, saveClasses, postSurveyClass} from '../controllers/SurveyController.js';
import User from '../models/User.js';

import connectEnsureLogin from 'connect-ensure-login';
import { getFirstClass } from '../helpers/SurveyHelper.js';

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
//     res.redirect(`/classes/${firstClass}`)
//     next()
//   } catch (err) {
//     next(err)
//   }
// });
router.get('/survey/:id', surveyClass);
router.post('/survey/:id', postSurveyClass);


// router.get('/welcome', requiresLogin , welcome);


// router.post('/login',upload.array(), doLogin);

// router.get('/register', register);
// router.post('/register', upload.array(), doRegister);


export default router;
