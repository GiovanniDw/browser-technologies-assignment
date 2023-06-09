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
dotenv.config();
const Schema = mongoose$1.Schema;
const ClassSchema = new Schema({
  _id: Number,
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
const Class = mongoose$1.model("Class", ClassSchema);
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
const doRegister = (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  User.register(
    new User({
      username: req.body.username,
      email: req.body.username,
      name: req.body.name,
      id
    }),
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
            res.redirect("/course/start");
          }
        });
      }
    }
  );
  next();
};
const login = async (req, res, next) => {
  req.body;
  try {
    res.render("login.njk", {
      layout: "base.njk"
    });
  } catch (err) {
    let data = {
      error: { message: err },
      layout: "base.njk"
    };
    res.render("login.njk", data);
    next();
  } finally {
  }
};
const doLogin = (req, res, next) => {
  const { username, email, password, name, id } = req.body;
  User.findByUsername(username, username, function(err, user) {
    if (err) {
      res.json({
        success: false,
        message: "Can Not Login. Error: " + err
      });
    } else {
      req.login(user, (er) => {
        if (er) {
          res.json({ success: false, message: er });
        } else {
          res.redirect("/course/css-to-the-rescue");
          next();
        }
      });
    }
  });
};
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};
multer();
const router$3 = express.Router();
const upload$1 = multer();
const router$2 = express.Router();
router$2.get("/", register);
router$2.post("/", upload$1.array(), doRegister);
router$2.get("/login", login);
router$2.post("/login", upload$1.array(), doLogin);
router$2.get("/register", register);
router$2.post("/register", upload$1.array(), doRegister);
router$2.get("/logout", logout);
router$2.post("/logout", logout);
const addClass = (userID, ClassName) => {
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
        user.classes.push(classItem);
        await user.save();
      }
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
    dateStart: "06-02-2023",
    dateEnd: "06-03-2023",
    weeks: 4,
    classRating: Number,
    difficultyRating: Number,
    explanationRating: Number,
    personalUnderstanding: String,
    prevCourse: null,
    nextCourse: "/web-app-from-scratch"
  },
  {
    id: 2,
    name: "Webapp from Scratch",
    slug: "web-app-from-scratch",
    url: "/web-app-from-scratch",
    teachers: ["Robert", "Joost"],
    dateStart: "06-02-2023",
    dateEnd: "06-03-2023",
    weeks: 4,
    classRating: Number,
    difficultyRating: Number,
    explanationRating: Number,
    personalUnderstanding: String,
    prevCourse: "/css-to-the-rescue",
    nextCourse: "/progressive-web-app"
  },
  {
    id: 3,
    name: "Progressive Web App",
    slug: "progressive-web-app",
    url: "/progressive-web-app",
    teachers: ["Janno", "Declan"],
    dateStart: "20-03-2023",
    dateEnd: "03-03-2023",
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
    dateStart: "20-03-2023",
    dateEnd: "03-03-2023",
    weeks: 3,
    classRating: Number,
    difficultyRating: Number,
    explanationRating: Number,
    personalUnderstanding: String,
    prevCourse: "/progressive-web-app",
    nextCourse: "/end"
  }
];
const classes = [
  "css-to-the-rescue",
  "web-app-from-scratch",
  "browser-technologies",
  "progressive-web-apps"
];
const start = async (req, res, next) => {
  try {
    console.log(req.body);
    let data = {
      message: "Hello world!",
      layout: "base.njk",
      title: "Nunjucks example",
      user: req.user,
      userClasses: req.user.classes,
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
  try {
    const { user } = req.user;
    const userID = user._id;
    const selectedClasses = req.body.classes;
    console.log(selectedClasses);
    const thisUser = await User.findById(userID);
    await selectedClasses.forEach(async (element) => {
      console.log(element);
      console.log("1");
      console.log(thisUser);
      let alreadyExists = await thisUser.classes.some(
        (item) => item.name == element
      );
      try {
        console.log("alreadyExists");
        console.log(alreadyExists);
        if (alreadyExists) {
          console.log(`${element} already in user classes`);
          next();
        } else {
          await addClass(userID, element);
          console.log("classes saved");
        }
        console.log("2");
        console.log(thisUser);
        res.redirect("/course/css-to-the-rescue");
        next();
      } catch (err) {
        next(err);
      }
    });
    console.log("3");
    console.log(thisUser);
    if (thisUser.classes[0].name !== void 0) {
      await res.redirect(`/course/${thisUser.classes[0].name}`);
    } else {
      res.redirect("back");
    }
    res.send("ok");
  } catch (err) {
    next(err);
  }
};
const postSurveyClass = async (req, res, next) => {
  try {
    console.log(req.body);
    const userID = req.user._id;
    const classID = req.params.name;
    const thisUser = await User.findById(userID);
    const thisClass = await Class.findById(classID);
    const { classInfo } = req.body;
    console.log(classInfo);
    const { classes: classes2 } = req.user;
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getObjBySlug = (objArray, slug) => objArray.find((obj) => obj.url === slug);
const courseElement = async (req, res, next) => {
  console.log(req);
  const user = req.user;
  console.log("req.params");
  console.log(req.params);
  const page = req.route.path;
  const currentCourse = getObjBySlug(courseData, page);
  console.log("currentCourse");
  console.log(currentCourse);
  console.log("page");
  console.log(page);
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
    console.log(error);
  }
};
const upload = multer();
const router$1 = express.Router();
router$1.get("", (req, res, next) => {
  res.redirect("/login");
});
router$1.get("/start", start);
router$1.post("/start", upload.array(), saveClasses);
courseData.forEach((course) => {
  console.log("Name: " + course.name + ", Route: " + course.slug);
  router$1.get(`/${course.slug}`, courseElement);
});
router$1.get("/end", (req, res, next) => {
  let data = {
    user: req.user,
    classes: courseData
  };
  res.render("survey-end.njk", data);
});
router$1.post("/course/:id", upload.none(), postSurveyClass);
multer();
const router = express.Router();
router.get("/", router$3);
router.use("/", router$2);
router.use("/course", router$1);
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
app.use("/", express.static(path.join(__dirname, "static")));
app.use("/", express.static(path.join(__dirname, "../assets")));
app.use("/", express.static(path.join(__dirname, "../../public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    credentials: true
  })
);
app.set("view engine", "njk");
app.set("views", path.join(__dirname, "views"));
expressNunjucks(app, {
  loader: nunjucks.FileSystemLoader
});
passport(app);
app.use("/", router);
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
  app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is listening on port ${PORT}...`);
  });
}).catch((err) => {
  console.error("Unable to connect to mongo.");
  console.error(err);
});
//# sourceMappingURL=server.js.map
