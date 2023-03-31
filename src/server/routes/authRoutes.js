
import express from  'express';
import multer from 'multer';
import passport from 'passport';
import passportLocal from 'passport-local';
import {register, doRegister, login, doLogin, logout} from '../controllers/AuthController.js';
import User from '../models/User.js';

const upload = multer();
const router = express.Router();

router.get('/login', login);
router.post('/login', upload.array(), doLogin);

router.get('/register', register);
router.post('/register', upload.array(), doRegister);

router.get('/logout', logout);
router.post('/logout', logout);



// router.get('/', async (req, res, next) => {
//   console.log(req.session)
//   try {
//     let  data = {
//       message: 'Hello world!',
//       layout:  'layout.njk',
//       title: 'Nunjucks example',
//       user: req.session.user,
//       error: {
//         message: req.session.message
//       }
//     }
    
//     return res.render('index.njk', data)
    
//   } catch (err) {
//     console.log(err)
// 		next(err);
//   } 
// })

export default router;
