import passport from 'passport';
import User from '../models/User.js';

export const welcome = async (req, res, next) => {
  try {
    console.log(req.session);
    console.log(req.locals);
    let  data = {
      message: 'Hello world!',
      layout:  'layout.njk',
      title: 'Nunjucks example',
      user: req.user,
      session: req.session
    }
    res.render('welcome.njk', data)  
  } catch (err) {
		next(err);
  }
}