/* eslint-disable spaced-comment */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import createError from 'http-errors';

import express from 'express';

import path from 'path';

import cookieParser from 'cookie-parser';

import logger from 'morgan';


import indexRouter from '@s-routes/index';

import usersRouter from '@s-routes/users';

//importing configurations
import configTemplateEngine from '@s-config/template-engine'

//importar modulos de webpack
import webpack from 'webpack';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackConfig from '../webpack.dev.config';
import webpackDevConfig from '../webpack.dev.config';

//consultar modo en que se ejecuta la aplicacion
const env = process.env.NODE_ENV || 'developement';

//creacion aplicacion express
var app = express();

//verficiar modo ejecucion de la aplicacion
if(env === 'development'){
  console.log('> Excecuting in Development Mode: Webpack hot Reloading');
  //ruta del Hot module replasmen
  //reload=true: habilita recarga fronted al tener cambios en codigo fuente del fronted
  //timeout=1000: Tiempo espera recarga
  WebpackConfig.entry = ['Webpack-hot-middleware/client?reload=true&timeout=1000', WebpackConfig.entry];
  //Agregar plugin
  WebpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  //compilador
  const compiler = webpack(WebpackConfig);
  //Agregando middleware a cadena
  app.use(WebpackDevMiddleware(compiler,{
  publicPath: webpackDevConfig.output.publicPath
}));
// webpack hot middleware
  app.use(WebpackHotMiddleware(compiler));
}else{
  console.log('> Excecuting in Production Mode... ');
}

// view engine setup
configTemplateEngine(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
