import passport from 'passport';
import User from '../models/User.js';

export const welcome = async (req, res, next) => {
  let  data = {
    message: 'Hello world!',
    layout:  'layout.njk',
    title: 'Nunjucks example',
    user: req.user,
  }
  try {
    res.render('welcome.njk', data)  
  } catch (err) {
		next(err);
  } finally {
    console.log(req.body)
  }
}