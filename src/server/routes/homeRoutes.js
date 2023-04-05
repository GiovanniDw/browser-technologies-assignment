import express from  'express';


import {saveData} from '../helpers/saveData.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import User from '../models/User.js';
const upload = multer();
const router = express.Router();


router.get('/', (req, res, next) => {
  try {
    
    let  data = {
      message: 'Hello world!',
      layout:  'layout.njk',
      title: 'Nunjucks example',
      error: {
        message: req.session.message
      },
      user: req.user
    }
    console.log('user')
    console.log(req.user)
    console.log('body')
    console.log(req.body)
    return res.render('index.njk', data)
  } catch (err) {
    console.log(err)
		next(err);
  } 
})


// router.post('/', upload.array(), async (req, res, next) => {
//   try {
//   let data = {
//     message: 'SPET1',
//     layout:  'layout.njk',
//     title: 'SPET1',
//   }
//     res.render('index.njk', data)
//     next()
//   } catch (err) {
//     console.log(err)
// 		next();
//   }
// })



export default router;
