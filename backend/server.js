import express from 'express';
import dotenv, { config } from 'dotenv';
import colors from 'colors';
import smartControlRoutes from './routes/smartControlRoutes.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use('/api/smartcontrol', smartControlRoutes);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
