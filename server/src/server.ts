import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

import { mongoDBConnect } from './schemas';

// Routers
import indexRouter from './routes/indexRoute';
import categoryRouter from './routes/categoryRoute';

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 8001);
mongoDBConnect();

// Middlewares
app.use(morgan('dev'));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/category', categoryRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
  const error: any = new Error(`${req.method} ${req.url} invalid router`);
  error.status = 404;
  next(error);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json(err);
};
app.use(errorHandler);

const server = app.listen(app.get('port'), () =>
  console.log(`Listening on port ${app.get('port')}`),
);

export default server;
