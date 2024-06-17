var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collaboratorRouter = require('./routes/collaborator'); // Add this line

var app = express();

app.use(cors()); // Add this line, esta permite todas as origens do front-end
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/collaborator', collaboratorRouter); // Add this line
app.use('/users', usersRouter);

module.exports = app;
