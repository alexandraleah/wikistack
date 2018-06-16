const express = require('express');
const userRouter = express.Router();
const viewsIndex = require('../views/index');
const { User } = require('../models');
const { Page } = require('../models');
module.exports = userRouter;
userRouter.get('/', async (rec, res, next) => {
  try {
    let users = await User.findAll();
    res.send(viewsIndex.userList(users));
    console.log('user list page');
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  //look up id in database
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    const pages = await Page.findAll({ where: { authorId: req.params.id } });
    res.send(viewsIndex.userPages(user, pages));
  } catch (error) {
    next(error);
  }
});
