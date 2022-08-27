import Employee from '../models/employee.js';
import bcrypt from 'bcrypt';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const employee = await Employee.findOne({ name: req.body.name });
    if (employee) return next(createError(401, 'Username Already Exists'));
    const newEmployee = new Employee({ ...req.body, password: hash });

    await newEmployee.save();
    res.status(200).send('Employee has been created!');
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ name: req.body.name });
    if (!employee) return next(createError(404, 'Invalid credentials'));

    const isCorrect = await bcrypt.compare(
      req.body.password,
      employee.password
    );

    if (!isCorrect) return next(createError(400, 'Invalid credentials'));

    const token = jwt.sign({ id: employee._id }, process.env.JWT);
    const { password, ...others } = employee._doc;

    res.status(200).json({ employee: others, token: token });
  } catch (err) {
    next(err);
  }
};
