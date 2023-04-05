import express from  'express'


import {saveData} from '../helpers/saveData.js'
import bodyParser from 'body-parser';
import multer from 'multer';
import User from '../models/User.js'
const upload = multer();
import {register, doRegister, login, doLogin} from '../controllers/AuthController.js'
// import {default as homeRoutes} from './homeRoutes.js';
import connectEnsureLogin from 'connect-ensure-login';
import homeRoutes from "./homeRoutes.js";
import authRoutes from "./authRoutes.js";
import surveyRoutes from "./surveyRoutes.js";
import { isAuthenticated } from '../config/middleware/auth.js';

let router = express.Router();
// export const indexRouter = (req, res, next) => {

// }


router.get('/', homeRoutes);
router.use('/', authRoutes);
router.use('/classes', surveyRoutes);

// router.get('/welcome', async (req, res, next)=> {
// const user = req.user;

// try {
  
// } catch (error) {
  
// }


// })


// module.exports = router


export default router;




