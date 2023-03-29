
import express from  'express';
import multer from 'multer';
import { requiresLogin } from '../config/middleware/auth.js';
import {register, doRegister, login, doLogin} from '../controllers/AuthController.js';
import {welcome} from '../controllers/SurveyController.js';
import User from '../models/User.js';

const upload = multer();
const router = express.Router();
router.get('/', requiresLogin , welcome);
router.get('/welcome', requiresLogin , welcome);


// router.post('/login',upload.array(), doLogin);

// router.get('/register', register);
// router.post('/register', upload.array(), doRegister);


export default router;