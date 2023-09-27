import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config'

import './connection/db.js'

import authRouter from './routes/auth.js';
import betRouter from './routes/bet.js';
import userRouter from './routes/users.js'
import matchRouter from './routes/match.js';


const { PORT = 3000 } = process.env.PORT

// The Application Object
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/auth/', authRouter)
app.use('/api/bet/', betRouter )
app.use('/api/user/', userRouter)
app.use('/api/match/', matchRouter)

// Server listener
app.listen(PORT, () => console.log(`listening on port ${PORT}`))