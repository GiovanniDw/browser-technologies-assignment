
import express from  'express';
import multer from 'multer';
import {register, doRegister, login, doLogin} from '../controllers/AuthController.js';
import User from '../models/User.js';

const upload = multer();
const router = express.Router();
router.get('/login', login);
router.post('/login',upload.array(), doLogin);

router.get('/register', register);
router.post('/register', upload.array(), doRegister);


export default router;