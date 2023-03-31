import express from 'express';
import ViteExpress from 'vite-express';
import { createServer as createViteServer } from 'vite';
import bodyParser from 'body-parser';
import nunjucks from 'nunjucks';
import expressNunjucks from 'express-nunjucks';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import fs from 'fs';
import multer from 'multer';
import routes from './routes/index.js';
import mongoose from './config/middleware/mongoose.js';
import passport from './config/passport.js';


const upload = multer();
const PORT = process.env.PORT || 3000;
dotenv.config();

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
app.use(logger('dev'));
app.use('/', express.static('static/'));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(flash());



app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));


const njk = expressNunjucks(app, {
  loader: nunjucks.FileSystemLoader,
});

passport(app);

// app.use((req,res,next)=> {
//   res.locals.user = req.user
//   next();
// })

// app.use(cookieParser());

// app.use(express.static(path.join(__dirname, '../public')))

// nunjucks.configure(__dirname + '/views', {
//     autoescape: true,
//     express: app,
// });

// app.use(express.json())
// app.use(express.urlencoded({ extended:  false }))

// app.set('views', path.join(__dirname, 'views'));

// app.engine('nunjucks', nunjucks.c)

// app.set('view engine', 'njk');

app.use(routes);
// app.post('/set', upload.array(), (req, res,next) => {
//   const userInfo = req.body;

//     try {
//       console.log(req.body)
//        console.log(userInfo)

//       //  saveData(userInfo)
//        res.json(req.body);
//     } catch (error) {
//       next(error)
//     }

// } )
// app.post('/set', setUser)

app.get('*', function (req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
  err.statusCode = 404;
  err.shouldRedirect = true; //New property on err so that our middleware will redirect
  next();
});

app.use((req, res, next) => {
  // Make `user` and `authenticated` available in templates
  res.locals.user = req.user
  res.locals.authenticated = !req.user.anonymous
  next()
})

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error.njk', {
    layout: 'layout.njk',
    message: err.message,
    error: {}
  });
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

mongoose()
  .then(() => {
    console.log('mongo connected');
    ViteExpress.listen(app, PORT, () => {    
    
      console.log('Server is listening on port 3000...');
    })
  }).catch((err) => {
    // an error occurred connecting to mongo!
    // log the error and exit
    console.error('Unable to connect to mongo.');
    console.error(err);
  });

