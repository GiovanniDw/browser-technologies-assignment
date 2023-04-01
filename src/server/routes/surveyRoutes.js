
import express from  'express';
import multer from 'multer';
import {isAuthenticated} from '../config/middleware/auth.js';
import {register, doRegister, login, doLogin} from '../controllers/AuthController.js';
import {start, startSurvey, surveyClass} from '../controllers/SurveyController.js';
import User from '../models/User.js';

import connectEnsureLogin from 'connect-ensure-login';

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
router.get('/', start);
router.post('/set', upload.array(), startSurvey);

router.get('/classes', surveyClass);

// router.get('/welcome', requiresLogin , welcome);


// router.post('/login',upload.array(), doLogin);

// router.get('/register', register);
// router.post('/register', upload.array(), doRegister);


export default router;
