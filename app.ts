import * as express from 'express';
import * as expressLayouts from 'express-ejs-layouts';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as  bodyParser from 'body-parser';


import { router as home } from './routes/index';
import { router as user } from './routes/user';
import { router as post } from './routes/post'
import { router as reg } from './routes/post'
import { router as login } from './routes/post'
import { router as logout } from './routes/post'

export var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', home);
app.use('/u', user);
app.use('/post', post);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use((req:express.Request, res:express.Response, next:express.NextFunction) => {
  let err = new Error('Not Found');  
  (<any>err).status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err:any, req:express.Request, res:express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err:any, req:express.Request, res:express.Response, next: express.NextFunction) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});