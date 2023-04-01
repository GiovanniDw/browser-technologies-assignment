import passport from 'passport';
import User from '../models/User.js';
import {addClass, saveClasses } from '../helpers/SurveyHelper.js';

const classes = ['css-to-the-rescue', 'web-app-from-scratch', 'browser-technologies', 'progressive-web-apps'];

export const start = async (req, res, next) => {
  try {
    console.log(req.session);
    console.log(req.locals);
    let  data = {
      message: 'Hello world!',
      layout:  'layout.njk',
      title: 'Nunjucks example',
      user: req.user,
      classes: classes
    }
    res.render('survey-start.njk', data)  
  } catch (err) {
		next(err);
  }
}

export const startSurvey = async (req, res, next) => {
	// const classInfo = req.body;
  const selectedClasses = req.body.classes;

	const userID = req.username;
	try {
    console.log(selectedClasses);

    await selectedClasses.forEach(async element => {
  await addClass(userID, element);
    });
  res.redirect('/survey/classes');
    next()
	} catch (err) {
		next(err);
	}
};

export const surveyClass = async (req, res, next) => {
  try {
    let  data = {
      message: 'Hello world!',
      layout:  'layout.njk',
      title: 'Nunjucks example',
      user: req.user,
      classes: req.user.classes
    }
    res.render('survey-class.njk', data)  
  } catch (err) {
		next(err);
  }


}