import express from  'express'


import {saveData} from '../helpers/saveData.js'
import bodyParser from 'body-parser';
import multer from 'multer';
import User from '../models/User.js'
const upload = multer();
import {register, doRegister, login, doLogin} from '../controllers/AuthController.js'
// import {default as homeRoutes} from './homeRoutes.js';

import defaultExport, * as homeRoutes from "./homeRoutes.js";

let router = express.Router();
// export const indexRouter = (req, res, next) => {

// }


router.use('/', async () => homeRoutes);

// router.get('/welcome', async (req, res, next)=> {
// const user = req.user;

// try {
  
// } catch (error) {
  
// }


// })


// module.exports = router


export default router;


