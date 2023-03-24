
import express from 'express';
import ViteExpress from 'vite-express'
import { createServer as createViteServer } from 'vite'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import nunjucks from 'nunjucks'
import path from 'path'
import { fileURLToPath } from 'url';
import logger from 'morgan'
import {indexRouter, setUser} from './routes/index.js'
import dotenv  from "dotenv"
import fs from 'fs'
import multer from 'multer';
const upload = multer()

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const classes = "web-app-from-scratch", "css-to-the-rescue-2223"

// const classes = [{
//   web-app-from-scratch: { 

//   },
//   css-to-the-rescue-2223: {

//   }
// }


// ]

const app = express();
const router = express.Router()
app.use(bodyParser.json())
// app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cookieParser())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, '../public')))
nunjucks.configure(__dirname + '/views', {
    autoescape: true,
    express: app,
});


// app.use(express.json())
// app.use(express.urlencoded({ extended:  false }))




// app.set('views', path.join(__dirname, 'views'));

// app.engine('nunjucks', nunjucks.c)

// app.set('view engine', 'njk');

app.use('/', indexRouter);
app.post('/set', upload.none(), (req, res,next) => {
  const userInfo = req.body;
  console.log(userInfo)
    try {
       res.cookie('cookie', 'userInfo').send('cookie send') m,
      //  saveData(userInfo)
      res.redirect('/');
    } catch (error) {
      next(error)
    }



} )
app.post('/set', setUser)


app.get('*', function (req, res, next) {
	let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
	err.statusCode = 404;
	err.shouldRedirect = true; //New property on err so that our middleware will redirect
	next(err);
});

// app.get('/step1', indexRouter);
// router.get('/', async  function(req, res, next) {
//   let  data = {
//     message: 'Hello world!',
//     layout:  'layout.njk',
//     title: 'Nunjucks example'
//   }

//   res.render('index.njk', data)
// })



ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

