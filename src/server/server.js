import express from "express";
import ViteExpress from "vite-express";
import { createServer as createViteServer } from "vite";
import bodyParser from "body-parser";
import nunjucks from "nunjucks";
import expressNunjucks from "express-nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import logger from "morgan";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "node:fs";
import multer from "multer";
import routes from "./routes/index.js";
// import mongoose from 'mongoose';
import mongoose from "./config/middleware/mongoose.js";
import passport from "./config/passport.js";
import cors from "cors";
import compression from "compression";

dotenv.config();

// const isDev = process.env.NODE_ENV === 'development'

const upload = multer();
const PORT = process.env.PORT || 3000;

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

const CorsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  exposedHeaders: "*",
  credentials: true,
  // optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);
app.use(cors(CorsOptions));
app.options("*", cors(CorsOptions));
app.use(logger("dev"));
app.use(compression());
app.use("/", express.static(path.join(__dirname, "static")));
app.use("/", express.static(path.join(__dirname, "../assets")));
app.use("/", express.static(path.join(__dirname, "../../public")));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
    credentials: true,
  })
);

// app.use(flash());

app.set("view engine", "njk");
app.set("views", path.join(__dirname, "views"));

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

app.get("*", function (req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
  err.statusCode = 404;
  err.shouldRedirect = true; //New property on err so that our middleware will redirect
  next();
});

app.use((req, res, next) => {
  // Make `user` and `authenticated` available in templates
  res.locals.user = req.user;
  res.locals.authenticated = !req.user.anonymous;
  next();
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error.njk", {
    layout: "base.njk",
    message: err.message,
    error: err.status,
  });
});

// app.get('/step1', indexRouter);
// router.get('/', async  function(req, res, next) {
//   let  data = {
//     message: 'Hello world!',
//     layout:  'base.njk',
//     title: 'Nunjucks example'
//   }

//   res.render('index.njk', data)
// })

// const startServer = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_DB, {
//       dbName: process.env.DB_NAME,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');

//     ViteExpress.listen(app, PORT, () => {
//       console.log(`Server is listening on port ${PORT}...`);
//     });
//   } catch (err) {
//     console.error('Unable to connect to mongo.');
//     console.error(err);
//     process.exit(1);
//   }
// };

// startServer();

mongoose()
  .then(() => {
    console.log("mongo connected");
    ViteExpress.listen(app, PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    // an error occurred connecting to mongo!
    // log the error and exit
    console.error("Unable to connect to mongo.");
    console.error(err);
  });
