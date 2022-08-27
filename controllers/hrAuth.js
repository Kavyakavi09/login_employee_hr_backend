import Hr from '../models/hr.js';
import bcrypt from 'bcrypt';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const hr = await Hr.findOne({ name: req.body.name });

    if (hr) return next(createError(401, 'Username Already Exists'));
    const newHr = new Hr({ ...req.body, password: hash });
    await newHr.save();
    res.status(200).send('hr has been created!');
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const hr = await Hr.findOne({ name: req.body.name });
    if (!hr) return next(createError(404, 'Invalid credentials'));

    const isCorrect = await bcrypt.compare(req.body.password, hr.password);

    if (!isCorrect) return next(createError(400, 'Invalid credentials'));

    const token = jwt.sign({ id: hr._id }, process.env.JWT);
    const { password, ...others } = hr._doc;

    res.status(200).json({ hr: others, token: token });
  } catch (err) {
    next(err);
  }
};
