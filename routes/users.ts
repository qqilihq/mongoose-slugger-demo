import { Router } from 'express';
import User from '../models/userModel';
import * as createError from 'http-errors';

const router: Router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get('/:city', async (req, res, next) => {
  try {
    const users = await User.find({ city: req.params.city });
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.get('/:city/:slug', async (req, res, next) => {
  try {
    const user = await User.findOne({ city: req.params.city, slug: req.params.slug });
    if (!user) {
      return next(createError(404));
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }

});

export default router;
