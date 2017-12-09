import express from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import asyncErrorHandler from './middlewares/asyncErrorHandler';
import { APP_CONF } from './constants';

import indexController from './controllers/indexController';
import * as userController from './controllers/userController';
import * as channelController from './controllers/channelController';

const logger = require('./utils/logger')('server');

const MongoStore = mongo(session);
const app = express();

mongoose.Promise = global.Promise; // Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.connect(APP_CONF.MONGODB_URI, { useMongoClient: true });
mongoose.connection.on('error', () => {
  logger.log('error', 'MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
mongoose.connection.once('open', () => logger.log('info', 'MongoDB has beeen connected.'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: APP_CONF.SESSION_SECRET,
  store: new MongoStore({
    url: APP_CONF.MONGODB_URI,
    autoReconnect: true,
  }),
}));

// Publish the frontend static.
app.use(express.static(path.join(__dirname, '../', 'client', 'build'), { maxAge: 31557600000 }));

// Routes controllers
app.post('/api/registerUser', asyncErrorHandler(userController.registerUser));
app.get('/api/getMyUser', asyncErrorHandler(userController.getMyUser));
app.get('/api/getAllUsers', asyncErrorHandler(userController.getAllUsers));
app.post('/api/getUsersByType', asyncErrorHandler(userController.getUsersByType));

app.post('/api/createChannel', asyncErrorHandler(channelController.createChannel));
app.post('/api/addEntity', asyncErrorHandler(channelController.addEntity));
app.get('/api/getEntitiesByType', asyncErrorHandler(channelController.getEntitiesByType));

// Publish the frontend index.
app.use('/*', indexController);

app.use(errorHandler());

app.listen(APP_CONF.PORT, APP_CONF.HOST, () => {
  logger.log('info', `App is running at http://${APP_CONF.HOST}:${APP_CONF.PORT} in ${app.get('env')} mode.`);
});

module.exports = app;
