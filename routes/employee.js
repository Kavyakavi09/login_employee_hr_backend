import express from 'express';
import { signin, signup } from '../controllers/employeeAuth.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to my App😊');
});

router.post('/signup', signup);

router.post('/signin', signin);

export default router;
