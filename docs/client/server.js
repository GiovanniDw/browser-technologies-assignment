import express from "express";
import ViteExpress from "vite-express";
import "vite";
import bodyParser from "body-parser";
import nunjucks from "nunjucks";
import expressNunjucks from "express-nunjucks";
import path from "node:path";
import { fileURLToPath } from "node:url";
import logger from "morgan";
import "connect-flash";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import "node:fs";
import multer from "multer";
import mongoose$1 from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import "mongoose-autopopulate";
import passport$1 from "passport";
import { Strategy } from "passport-local";
import "passport-jwt";
import "connect-ensure-login";
import session from "express-session";
import "cookie-session";
import "cors";
import compression from "compression";
const Schema = mongoose$1.Schema;
const ClassSchema = new Schema({
  name: {
    type: String
  },
  teachers: Array,
  dateStart: Date,
  dateEnd: Date,
  weeks: Number,
  classRating: Number,
  difficultyRating: Number,
  explanationRating: Number,
  personalUnderstanding: String
});
const UserSchema = new Schema({
  id: Number,
  name: String,
  email: {
    type: String
  },
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: String,
  classes: [
    {
      type: ClassSchema
    }
  ],
  admin: Boolean,
  currentClass: String
});
UserSchema.plugin(passportLocalMongoose);
const User = mongoose$1.model("User", UserSchema);
mongoose$1.model("Class", ClassSchema);
express();
const register = async (req, res, next) => {
  try {
    let data = {
      layout: "layout.njk"
    };
    res.render("register.njk", data);
  } catch (err) {
    let data = {
      error: { message: err },
      layout: "layout.njk"
    };
    res.render("register.njk", data);
    next();
  }
};
const doRegister = (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  User.register(
    new User({ username: req.body.username, email: req.body.username, name: req.body.name, id }),
    username,
    function(err, user) {
      if (err) {
        res.json({
          success: false,
          message: "Your account could not be saved. Error: " + err
        });
      } else {
        req.login(user, (er) => {
          if (er) {
            res.json({ success: false, message: er });
          } else {
            res.redirect("/survey/");
          }
        });
      }
    }
  );
};
const login = async (req, res, next) => {
  try {
    res.render("login.njk", {
      layout: "layout.njk"
    });
  } catch (err) {
    let data = {
      error: { message: err },
      layout: "layout.njk"
    };
    res.render("login.njk", data);
    next();
  }
};
const doLogin = (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  User.findByUsername(
    username,
    username,
    function(err, user) {
      if (err) {
        res.json({
          success: false,
          message: "Your account could not be saved. Error: " + err
        });
      } else {
        req.login(user, (er) => {
          if (er) {
            res.json({ success: false, message: er });
          } else {
            res.redirect("/classes/");
          }
        });
      }
    }
  );
};
const logout = (req, res, next) => {
  req.logOut();
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
multer();
const router$3 = express.Router();
router$3.get("/", (req, res, next) => {
  try {
    let data = {
      message: "Hello world!",
      layout: "layout.njk",
      title: "Nunjucks example",
      error: {
        message: req.session.message
      },
      user: req.user
    };
    console.log("user");
    console.log(req.user);
    console.log("body");
    console.log(req.body);
    return res.render("index.njk", data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});
const upload$1 = multer();
const router$2 = express.Router();
router$2.get("/login", login);
router$2.post("/login", upload$1.array(), doLogin);
router$2.get("/register", register);
router$2.post("/register", upload$1.array(), doRegister);
router$2.get("/logout", logout);
router$2.post("/logout", logout);
const addClass = (userID, ClassName) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(ClassName);
      const classItem = {
        name: ClassName
      };
      const user = await User.findById(userID);
      const checkDup = await user.classes.includes(classItem);
      if (!checkDup) {
        await user.classes.push(classItem);
        await user.save();
      }
      resolve("has resolved");
    } catch (err) {
      reject(err);
    }
  });
};
const classes = ["css-to-the-rescue", "web-app-from-scratch", "browser-technologies", "progressive-web-apps"];
const start = async (req, res, next) => {
  try {
    let data = {
      message: "Hello world!",
      layout: "layout.njk",
      title: "Nunjucks example",
      user: req.user,
      classes
    };
    console.log("requser");
    console.log(req.user);
    res.render("survey-start.njk", data);
  } catch (err) {
    next(err);
  }
};
const saveClasses = async (req, res, next) => {
  const { user } = req.user;
  console.log(req.body);
  try {
    const userID = req.user._id;
    const selectedClasses = req.body.classes;
    console.log(selectedClasses);
    await selectedClasses.forEach(async (element) => {
      const alreadyExists = req.user.classes.some((item) => item.name == element);
      if (alreadyExists) {
        console.log(`${element} already in user classes`);
      } else {
        await addClass(userID, element);
      }
    });
    res.redirect(`/survey/${user.classes[0]}`);
    next();
  } catch (err) {
    next(err);
  }
};
const surveyClass = async (req, res, next) => {
  req.params.id;
  try {
    let data = {
      message: "Hello world!",
      layout: "layout.njk",
      title: "Nunjucks example",
      user: req.user,
      classes: req.user.classes
    };
    res.render("survey-class.njk", data);
  } catch (err) {
    next(err);
  }
};
const upload = multer();
const router$1 = express.Router();
router$1.get("/", start);
router$1.post("/start", upload.array(), saveClasses);
router$1.get("/classes", surveyClass);
multer();
let router = express.Router();
router.get("/", router$3);
router.use("/", router$2);
router.use("/classes", router$1);
const mongoose = () => {
  mongoose$1.Promise = global.Promise;
  return mongoose$1.connect(process.env.MONGO_DB, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};
Strategy.Strategy;
function passport(app2) {
  app2.use(cookieParser(process.env.SESSION_SECRET));
  app2.use(session({
    // this should be changed to something cryptographically secure for production
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // automatically extends the session age on each request. useful if you want
    // the user's activity to extend their session. If you want an absolute session
    // expiration, set to false
    rolling: true,
    name: "localhost",
    // set your options for the session cookie
    cookie: {
      httpOnly: false,
      sameSite: false,
      // the duration in milliseconds that the cookie is valid
      maxAge: 60 * 60 * 1e3
      // 20 minutes
      // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
      // domain: 'party-finderr.herokuapp.com',
      // recommended you use this setting in production if your site is published using HTTPS
      // secure: true,
    }
  }));
  passport$1.use(User.createStrategy());
  passport$1.serializeUser(User.serializeUser());
  passport$1.deserializeUser(User.deserializeUser());
  app2.use(passport$1.initialize());
  app2.use(passport$1.session());
}
dotenv.config();
multer();
const PORT = process.env.PORT || 3e3;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);
app.use(logger("dev"));
app.use(compression());
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set("view engine", "njk");
app.set("views", path.join(__dirname, "server/views"));
expressNunjucks(app, {
  loader: nunjucks.FileSystemLoader
});
passport(app);
app.use(router);
app.get("*", function(req, res, next) {
  let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`);
  err.statusCode = 404;
  err.shouldRedirect = true;
  next();
});
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.authenticated = !req.user.anonymous;
  next();
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error.njk", {
    layout: "layout.njk",
    message: err.message,
    error: err
  });
});
mongoose().then(() => {
  console.log("mongo connected");
  ViteExpress.listen(app, PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
}).catch((err) => {
  console.error("Unable to connect to mongo.");
  console.error(err);
});
//# sourceMappingURL=server.js.map
