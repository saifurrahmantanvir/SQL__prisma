import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import postRouter from '@routes/postRoutes';
import userRouter from '@routes/userRoutes';
import commentRouter from '@routes/commentRoutes';

import globalErrorHandler from '@controllers/errorController';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server running successfully!' });
});

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

/* app.all('*', (req, res) => {
   res.status(200).render('error')
}) */

app.use(globalErrorHandler);

export default app;
