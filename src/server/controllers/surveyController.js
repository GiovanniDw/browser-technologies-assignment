import passport from 'passport';
import User, { Class } from '../models/User.js';
import {addClass } from '../helpers/SurveyHelper.js';

const classes = ['css-to-the-rescue', 'web-app-from-scratch', 'browser-technologies', 'progressive-web-apps'];

export const start = async (req, res, next) => {
  try {
      console.log(req.body)
    let  data = {
      message: 'Hello world!',
      layout:  'layout.njk',
      title: 'Nunjucks example',
      user: req.user,
      userClasses: req.user.classes,
      classes: classes
    }
    console.log('requser');
    console.log(req.user);
    res.render('survey-start.njk', data)  
  } catch (err) {
		next(err);
  }
}

export const saveClasses = async (req, res, next) => {
	// const classInfo = req.body;
  
  
	
  // console.log(userID)
	try {
    const {user} = req.user;
    const userID = req.user._id;
    const selectedClasses = req.body.classes;
    console.log(selectedClasses);

    // const userToAddTo = User.findById(userID);




    // for (let i = 0; i < selectedClasses.length; i++) {
    //   let element = selectedClasses[i];
    //   console.log(selectedClasses[i]);
    //   // console.log(userToAddTo.classes[i].name)

    //   console.log(element)
    //   if  (userToAddTo.classes[i].name == undefined || userToAddTo.classes[i].name == null) {
    //    addClass(userID, element)
    //   }
    // }
      // if (userToAddTo.classes.length() !== 0) {
        
      //   // addClass(userID, element);
      //   selectedClasses.forEach(element => {
      //     let newObject = {
      //       name: element
      //     }
      //     userToAddTo.classes.push(newObject);});
        
      // } 
      // await userToAddTo.save();
  

      const thisUser = await User.findById(userID);
    selectedClasses.forEach(async element => {
      console.log(element)
      
      console.log('1')
      console.log(thisUser)
      let alreadyExists = await thisUser.classes.some(item => item.name == element);
      try {
        if (alreadyExists) {
          console.log(`${element} already in user classes`)
          next()
        } else {
        await addClass(userID, element);
          console.log('classes saved')
          // const UserClasses = await User.findById(userID).classes;
        }
        console.log('2')
        console.log(thisUser)
        next()
      } catch (err) {
        next(err)
      }

    });
    console.log('3')
    console.log(thisUser)
    // const UserClasses = await User.findById(userID).classes;

    // if (UserClasses) res.redirect(`/classes/${UserClasses[0].name}`);
    if (thisUser.classes[0].name !== undefined) {
      await res.redirect(`/classes/survey/${thisUser.classes[0].name}`)
    } else {
      res.redirect('back')
    }
    res.send('ok')
	} catch (err) {
		next(err);
	}
};


export const surveyClass = async (req, res, next) => {
  try {
    const classPage = req.params.id
    console.log(classPage)
    const user = req.user;

    const {classes} = user;
    console.log(user)
    // if(classPage)
    if (classes.some(obj => obj.name !== classPage)) {
      console.log(classPage)
      // return res.redirect(`/classes/survey/${classes[0].name}`)
    } else  {
      console.log('no calss page')
    }
    let  data = {
      message: 'Hello world!',
      layout:  'layout.njk',
      title: 'Nunjucks example',
      user: req.user,
      classes: req.user.classes,
      currentPage: req.params.id,
      firstClass: req.user.classes[0],
      secondClass: req.user.classes[1],
      thirdClass: req.user.classes[2],
      fourthClass: req.user.classes[3],
      fifthClass: req.user.classes[4],
    }
    for (let i of classes) {
      if (i.name == req.params.id) {
        console.log(i)
        data = {
          message: 'Css',
          layout:  'layout.njk',
          title: 'Nunjucks example',
          user: req.user,
          currentClass: i,
          nextClass: i++,
          classes: req.user.classes
        }
      }
    }





  
    res.render('survey-class.njk', data)  
  } catch (err) {
    console.log(err)
		next(err);
    
  }
}

export const postSurveyClass = async (req, res, next) => {
  const classPage = req.params.id;
  const {classInfo} = req.body

  try {
    const {classes} = req.user;
    let  data = {
      message: 'Hello world!',
      layout:  'layout.njk',
      title: 'Nunjucks example',
      user: req.user,
      classes: req.user.classes
    }
    for (let i of classes) {
      if (i.name == req.params.id) {
        console.log(i)
        data = {
          message: 'Css',
          layout:  'layout.njk',
          title: 'Nunjucks example',
          user: req.user,
          currentClass: i,
          nextClass: i++,
          classes: req.user.classes
        }
      }
    }





  
    res.render('survey-class.njk', data)  
  } catch (err) {
    console.log(err)
		next(err);
    
  }
}