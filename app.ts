import * as createError from 'http-errors';
import * as express from 'express';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as errorHandler from 'api-error-handler';

import usersRouter from './routes/users';

mongoose.connect('mongodb://localhost:27017/slugger-demo');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/users', usersRouter);

app.use((req, res, next) => next(createError(404)));
app.use(errorHandler());

const server = app.listen(3000);
server.on('listening', () => console.log(`Running on port ${server.address().port}`));
server.on('error', error => console.log('Error', error));
