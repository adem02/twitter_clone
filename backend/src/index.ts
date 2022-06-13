import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import 'dotenv/config'
import cors from 'cors'

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { Routes } from './routes';

const allowedOrigin = ['http://localhost:3000']
const options: cors.CorsOptions = {
  origin: allowedOrigin,
  allowedHeaders: ['Access-Control-Allow-Headers', "Authorization", "Content-Type"],
  methods: ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS']
}

const app = express();
app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(json());

//Routes
app.use(Routes)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER_USERNAME}:${process.env.DATABASE_USER_PASSWORD}@${process.env.DATABASE_URL}/twitter_clone?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  const PORT = process.env.PORT || 3001

  app.listen(PORT, () => {
    console.log('Listening on port 3001!!!!!!!!');
  });
};

start();
