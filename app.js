const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const rateLimit = require('express-rate-limit'); //security lib
const hpp = require('hpp');
const compression = require('compression');
const helmet = require('helmet');
const xss = require('xss-clean');

const anomalyRouter = require('./routes/anomalyRoute');
const viewRouter = require('./routes/viewRoute');

const morgan = require('morgan');
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');

app.set('view engine', 'pug'); // rendering engine

app.use(cors());
app.options('*', cors());
// security middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);

app.use(morgan('dev'));
app.use(xss());
app.use(hpp());
app.use(compression());
const limiter = rateLimit({
  //PREVENTS FROM DDOS
  max: 100, // No. of requests
  windowMs: 60 * 60 * 1000, // Time in Ms
  message: 'Too many requests from this IP, Please try again in an hour', // Error message
});

app.use('/api', limiter);

app.use('/', viewRouter);
app.use('/api/v1/anomaly', anomalyRouter);

app.use(express.static(`${__dirname}/data`));

app.all('*', (req, res, next) => {
  console.log('error router');
  next(new AppError(`Cant Find ${req.originalUrl} on this server`, 404)); //ERROR HANDLERS
});
app.use(globalErrorHandler);

module.exports = app;
