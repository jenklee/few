// dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes');
var extend = require('node.extend');
var api = require('./api/api');
var config = require('./config')

//var db_config = config.mongodb.dev;
var db_config = config.mongodb.prod;

// Start prod db
var mongojs = require('mongojs');
var db = mongojs(db_config.user + ":" + db_config.password + "@" + db_config.db_name);

ObjectID = require('mongodb').ObjectID
//End Prod db

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.post('/api/addmember', api.addmember(db));
app.get('/api/member/:id', api.member(db));
app.get('/api/members', api.members(db));
app.get('/api/stats/country', api.stats_country(db));
app.get('/api/stats/city', api.stats_city(db));
app.get('/api/stats/members', api.stats_members(db));
app.get('/api/stats/founders', api.stats_founders(db));
app.get('/api/stats/participants', api.stats_participants(db));
app.get('/*', routes.index);
/*app.get("/*", function(req, res, next) {
    if (!/^\/api/.test(req.url)) {
        res.redirect("/");
	}
});
*/

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(3000, function() {
console.log('Listening on port %d', server.address().port);
});

module.exports = app;
