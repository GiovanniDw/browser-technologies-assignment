import passport from 'passport';
import User from '../models/User.js';
import {addClass } from '../helpers/SurveyHelper.js';

const classes = ['css-to-the-rescue', 'web-app-from-scratch', 'browser-technologies', 'progressive-web-apps'];

export const start = async (req, res, next) => {
  try {
    
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
  
  
  
  console.log(req.body)

	
  // console.log(userID)
	try {
    const {user} = req.user;
    const userID = req.user._id;
    const selectedClasses = req.body.classes;
    console.log(selectedClasses);

    await selectedClasses.forEach(async element => {
      const alreadyExists = req.user.classes.some(item => item.name == element)

      if (alreadyExists) {
        console.log(`${element} already in user classes`)
      } else {
        await addClass(userID, element);
      }
    });
console.log('classes saved')

  res.redirect(`/classes/:${user.classes[0].name}`);
    next()
	} catch (err) {
		next(err);
	}
};

export const surveyClass = async (req, res, next) => {
  const classPage = req.params.id

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