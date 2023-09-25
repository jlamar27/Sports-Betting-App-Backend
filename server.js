import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import morgan from 'morgan';

import './connection/db.js'

import authRouter from './routes/auth.js';
import betRouter from './routes/bet.js';
import userRouter from './routes/users.js'
import matchRouter from './routes/match.js';


const { PORT = 8080 } = process.env

// The Application Object
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// app.use('/api/user/', userRouter)
app.use('/api/auth/', authRouter)
app.use('/bet/', betRouter )
app.use('/user/', userRouter)
app.use('/match/', matchRouter)

// Server listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`))