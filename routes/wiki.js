const router = require('express').Router();
// const addPage = require('../views/addPage');
const { addPage } = require('../views/');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.redirect('/')
});

router.post('/', async (req, res, next) => {
  // res.json(req.body); -- test for req.body
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error)}
  });

router.get('/add', (req, res, next) => {
  res.send(addPage())
});

module.exports = router;
