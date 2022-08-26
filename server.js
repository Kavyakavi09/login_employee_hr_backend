import express from 'express';
import connect from './db/connectDb.js';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeRoutes from './routes/employee.js';
import hrRoutes from './routes/hr.js';

// web server
const app = express();
app.use(express.json());

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// dotenv environment setup
dotenv.config();

// To connected with routes
app.use('/api/employee', employeeRoutes);
app.use('/api/hr', hrRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message,
    stack: err.stack,
  });
});

let port = process.env.PORT || 4009;

app.listen(port, async () => {
  console.log(`The App is running on the port ${port}`);
  // connect to the database
  await connect();
});
