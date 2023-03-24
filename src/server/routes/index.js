import express from  'express'
const router = express.Router()
import {saveData} from '../helpers/saveData.js'
// export const indexRouter = (req, res, next) => {

// }

export const indexRouter = router.use('/', async (req, res, next) => {
  req.cookies['user']
  let  data = {
    message: 'Hello world!',
    layout:  'layout.njk',
    title: 'Nunjucks example'
  }
  try {
    res.render('index.njk', data)  
  } catch (error) {
		next(error);
  } 
  
})


export const setUser = router.use('/set', async (req, res, next) => {
  let  data = {
    message: 'SPET1',
    layout:  'layout.njk',
    title: 'SPET1'
  }
  try {
    res.render('index.njk', data)  
  } catch (error) {
    res.redirect('/');
		next(error);
  } finally {
    next()
  }
})


// module.exports = router


export default router;

