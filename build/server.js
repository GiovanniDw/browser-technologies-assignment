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
import cors from "cors";
import compression from "compression";
const Schema = mongoose$1.Schema;
const ClassSchema = new Schema({
  name: {
    type: String
  },
  teachers: {
    type: Array,
    default: [""]
  },
  dateStart: {
    type: Date,
    default: "2023-04-06"
  },
  dateEnd: {
    type: Date,
    default: "2023-04-30"
  },
  weeks: Number,
  classRating: {
    type: Number,
    default: 5
  },
  difficultyRating: {
    type: Number,
    default: 5
  },
  explanationRating: {
    type: Number,
    default: 5
  },
  personalUnderstanding: {
    type: Number,
    default: 5
  }
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
    unique: true
  },
  password: String,
  classes: [ClassSchema],
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
      layout: "base.njk",
      title: "Welcome"
    };
    res.render("register.njk", data);
  } catch (err) {
    let data = {
      error: { message: err },
      layout: "base.njk"
    };
    res.render("register.njk", data);
    next();
  }
};
const doRegister = async (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  let data = {
    layout: "base.njk",
    title: "Welcome",
    error: null,
    message: "",
    succes: ""
  };
  try {
    await User.register(
      new User({
        username: req.body.username,
        email: req.body.username,
        name: req.body.name,
        id
      }),
      username,
      function(err, user) {
        if (err) {
          data.succes = false;
          data.message = err;
          res.render("register.njk", data);
        } else {
          req.login(user, (er) => {
            if (er) {
              data.succes = false;
              data.message = er;
              res.render("register.njk", data);
            } else {
              res.redirect("/course/start");
            }
          });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};
const doLogin = async (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  console.log("req.login");
  console.log(req.login);
  let data = {
    layout: "base.njk",
    title: "Welcome",
    error: null,
    message: "",
    error: ""
  };
  try {
    if (req.body.username) {
      console.log(username);
      await User.findByUsername(username, username, function(err, user) {
        if (err) {
          console.log(err);
          data.succes = false;
          data.error = err;
          res.render("login.njk", data);
        } else {
          req.login(user, (er) => {
            if (er) {
              console.log(er);
              data.succes = false;
              data.error = "Email not found";
              res.render("login.njk", data);
            } else {
              console.log("req.login");
              console.log(req.login);
              res.redirect("/course/start");
            }
          });
        }
      });
    } else {
      res.render("login.njk", data);
    }
  } catch (error) {
    res.render("login.njk", data);
    next(error);
  }
};
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
const addClass = (userID, ClassName) => {
  console.log(userID);
  return new Promise(async (resolve, reject) => {
    try {
      let classItem = {
        name: ClassName
      };
      const user = await User.findById(userID);
      const checkDup = await user.classes.some(
        (item) => item.name !== classItem.name
      );
      console.log(ClassName);
      if (!checkDup) {
        user.classes.create(classItem);
        await user.save();
      }
      resolve("has resolved");
    } catch (err) {
      reject(err);
    }
  });
};
const updateClass = (userID, classID, classInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      let {
        teachers,
        dateStart,
        dateEnd,
        classRating,
        difficultyRating,
        explanationRating,
        personalUnderstanding
      } = classInfo;
      console.log(classInfo);
      const user = await User.findById(userID);
      const classes = user.classes;
      const currentClass = classes.id(classID);
      console.log("classes");
      console.log(classes);
      console.log("classID");
      console.log(classID);
      currentClass.set({
        dateStart,
        dateEnd,
        classRating,
        difficultyRating,
        explanationRating,
        personalUnderstanding,
        teachers
      });
      await user.save();
      resolve("has resolved");
    } catch (err) {
      reject(err);
    }
  });
};
const courseData = [
  {
    id: 1,
    name: "Css to the rescue",
    slug: "css-to-the-rescue",
    url: "/css-to-the-rescue",
    teachers: ["Sanne", "Vasilis"],
    dateStart: "2023-02-06",
    dateEnd: "2023-03-06",
    weeks: 4,
    classRating: Number,
    difficultyRating: Number,
    explanationRating: Number,
    personalUnderstanding: String,
    prevCourse: "/start",
    nextCourse: "/web-app-from-scratch"
  },
  {
    id: 2,
    name: "Webapp from Scratch",
    slug: "web-app-from-scratch",
    url: "/web-app-from-scratch",
    teachers: ["Robert", "Joost"],
    dateStart: "2023-02-06",
    dateEnd: "2023-03-06",
    weeks: 4,
    classRating: Number,
    difficultyRating: Number,
    explanationRating: Number,
    personalUnderstanding: String,
    prevCourse: "/css-to-the-rescue",
    nextCourse: "/progressive-web-apps"
  },
  {
    id: 3,
    name: "Progressive Web App",
    slug: "progressive-web-apps",
    url: "/progressive-web-apps",
    teachers: ["Janno", "Declan"],
    dateStart: "2023-03-20",
    dateEnd: "2023-04-02",
    weeks: 3,
    classRating: Number,
    difficultyRating: Number,
    explanationRating: Number,
    personalUnderstanding: String,
    prevCourse: "/web-app-from-scratch",
    nextCourse: "/browser-technologies"
  },
  {
    id: 4,
    name: "Browser Technologies",
    slug: "browser-technologies",
    url: "/browser-technologies",
    teachers: ["Vasillis", "Peter-Paul"],
    dateStart: "2023-03-20",
    dateEnd: "2023-04-02",
    weeks: 3,
    classRating: Number,
    difficultyRating: Number,
    explanationRating: Number,
    personalUnderstanding: String,
    prevCourse: "/progressive-web-apps",
    nextCourse: "/end"
  }
];
console.log(courseData);
const start = (req, res, next) => {
  if (!req.user)
    return res.redirect("/login");
  console.log("req.user");
  console.log(req.user);
  let data = {
    message: "Hello world!",
    layout: "base.njk",
    title: "Start Survey",
    userClasses: req.user.classes,
    classes: courseData,
    error: null
  };
  try {
    console.log(req.body);
    console.log("requser");
    console.log(req.user);
    data.user = req.user;
    res.render("survey-start.njk", data);
  } catch (err) {
    data.error = err;
    next(err);
  }
};
const saveClasses = (req, res, next) => {
  ({
    message: "Hello world!",
    layout: "base.njk",
    title: "Nunjucks example",
    user: req.user,
    userClasses: null,
    classes: courseData,
    error: null
  });
  if (!req.user)
    return res.redirect("/login");
  const userID = req.user._id;
  try {
    const { user } = req.user;
    console.log(req.user);
    const selectedClasses = req.body.classes;
    console.log("selectedClasses");
    console.log(selectedClasses);
    if (req.user.classes) {
      Promise.all(selectedClasses.map(async (element) => {
        console.log("element");
        console.log(element);
        console.log("1");
        let alreadyExists = req.user.classes.some(
          (item) => item.name == element
        );
        if (!alreadyExists) {
          await addClass(userID, element);
          console.log("classes saved");
        } else {
          console.log(`${element} already in user classes`);
        }
      }));
    } else {
      return res.redirect("/course/css-to-the-rescue");
    }
    console.log("3");
    return res.redirect("/course/css-to-the-rescue");
  } catch (err) {
    next(err);
  }
};
const postSurveyClass = async (req, res, next) => {
  if (!req.user)
    return res.redirect("/login");
  console.log("req.user");
  console.log(req.user);
  try {
    const courseToSave = req.params.id;
    const className = req.params.id;
    const nextPage2 = req.body.nextClass;
    const {
      dateStart,
      dateEnd,
      classRating,
      difficultyRating,
      explanationRating,
      personalUnderstanding,
      teachers
    } = req.body;
    const userID = req.user._id;
    const thisUser = await User.findById(userID);
    const { classes } = thisUser;
    if (classes.some((obj2) => obj2.name == className)) {
      const classItem = obj;
      let classID = classItem._id;
      const classInfo = {
        dateStart,
        dateEnd,
        classRating,
        difficultyRating,
        explanationRating,
        personalUnderstanding,
        teachers
      };
      await updateClass(userID, classID, classInfo);
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
    return res.redirect(nextPage);
  }
};
const getObjBySlug = (objArray, slug) => {
  return objArray.find((obj2) => obj2.slug === slug);
};
const courseElement = async (req, res, next) => {
  if (!req.user)
    return res.redirect("/login");
  const user = req.user;
  req.route.path;
  let pathArray = req.route.path.split("/");
  let currentSlug = pathArray[2].toString();
  const currentCourse = await getObjBySlug(courseData, currentSlug);
  try {
    let data = {
      user,
      message: "",
      layout: "base.njk",
      title: "Nunjucks example",
      classes: courseData,
      currentClass: currentCourse,
      currentCourse,
      currentPage: req.params.id,
      nextCourse: currentCourse.nextCourse,
      prevCourse: currentCourse.prevCourse
    };
    res.render("survey-class.njk", data);
  } catch (error) {
    console.log("courseElement error");
    console.log(error);
    next(error);
  }
};
const upload = multer();
const router = express.Router();
router.get("/", doRegister);
router.post("/", upload.array(), doRegister);
router.get("/login", doLogin);
router.post("/login", upload.array(), doLogin);
router.get("/register", register);
router.post("/register", upload.array(), doRegister);
router.get("/logout", logout);
router.post("/logout", logout);
router.get("/course", (req, res, next) => {
  if (!req.user)
    return res.redirect("/login");
});
router.get("/course/start", start);
router.post("/course/start", upload.array(), saveClasses);
router.get("/course/end", (req, res, next) => {
  let data = {
    user: req.user,
    classes: courseData
  };
  res.render("survey-end.njk", data);
});
courseData.forEach((course) => {
  console.log("Name: " + course.name + ", Route: " + course.slug);
  router.get(`/course/${course.slug}`, courseElement);
  router.post(`/course/${course.slug}`, upload.none(), postSurveyClass);
});
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
  app2.use(
    session({
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
    })
  );
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
const CorsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "*",
  exposedHeaders: "*",
  credentials: true
  // optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.set("trust proxy", ["loopback", "linklocal", "uniquelocal"]);
app.use(cors(CorsOptions));
app.options("*", cors(CorsOptions));
app.use(logger("dev"));
app.use(compression());
app.use("/", express.static(path.join(__dirname, "./static")));
app.use("/", express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    credentials: true
  })
);
app.set("view engine", "njk");
app.set("views", path.join(__dirname, "./views"));
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
    layout: "base.njk",
    message: err.message,
    error: err.status
  });
});
mongoose().then(() => {
  console.log("mongo connected");
  app.listen(app, PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
}).catch((err) => {
  console.error("Unable to connect to mongo.");
  console.error(err);
});
//# sourceMappingURL=server.js.map
