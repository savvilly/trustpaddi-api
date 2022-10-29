import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import router from "./routes"

const app = express();
dotenv.config();
connectDB();

app.use(cors());

app.use(
  bodyParser.urlencoded({
    true: false,
    limit: '50mb',
    extended: true,
  }),
);

app.use(bodyParser.json({ limit: '50mb' }));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//all routes
app.use('/api/v1', router);
app.get('/api/v1', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to trustpaddi API',
  });
});

// Error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  console.log(error);
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`));
