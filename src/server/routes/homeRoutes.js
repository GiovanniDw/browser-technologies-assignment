import express from  'express';


import {saveData} from '../helpers/saveData.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import User from '../models/User.js';
const upload = multer();
const router = express.Router();


router.get('/', async (req, res, next) => {
  let  data = {
    message: 'Hello world!',
    layout:  'layout.njk',
    title: 'Nunjucks example'
  }
  try {
    res.render('index.njk', data)  
  } catch (err) {
		next(err);
  } finally {
    console.log(req.body)
  }
  
})


router.post('/', upload.array(), async (req, res, next) => {
  
  try {
  let newUser = new User(req.body);
  let data = {
    message: 'SPET1',
    layout:  'layout.njk',
    title: 'SPET1',
    user: newUser
  }
    console.log(req.body)
    return res.render('index.njk', data)  
  
  } catch (err) {
		next(err);
  } finally {
    console.log(req.body)
  }
})



export default router;
