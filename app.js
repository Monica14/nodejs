var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var cors = require('cors')
var app = express();
var Promise = require('promise');
var mongojs = require('mongojs');
mongojs_db = mongojs('test', ['pmsdata']);
mongoose.connect("mongodb://127.0.0.1:27017/skillmanage", {
  useMongoClient: true,
});
require('./api/models/skillmanageModel');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  //global.listdata = 'fgdfgfd';
  next();
})

var func_chk = function (req, res, next) {

  var people = {
    name: "dsfdsfsd",
    city: "mumbai"
  }
  var arr = ['ggg', 'ttt', 'yyy'];
  var data = JSON.stringify(arr);
  //console.log(typeof '2');
  //res.send(mongojs_db.pmsdata.find());
  //list = mongojs_db.pmsdata.find();
  // list = {
  //   goaldata: '10',
  //   name: 'hjjkhjk'
  // };
  if (req.url === '/') {
    res.render("home", { datalist: list })
  }
  // else {
  //   res.send("Page not found")
  // }
  //console.log(req.url);
  next();
}
app.use(func_chk);
var library = require('./routes/library.js');
app.use('/things', function (req, res, next) {
  // mongojs_db.pmsdata.find(function(err,docs){
  //   if(err)
  //   {
  //     res.send("hfgfghfg")
  //   }
  //   else
  //   {
  //     res.send(docs);
  //   }

  // });
  //var records = '';
  promis = [];
  records = library.findall();
  promis.push(library.findall());
  promis.push(library.assign_data());
  // records1 = records.then(function(value){
  //   records1 = [];
  //   records1.push(value);
  //   console.log(records1)
  // })
  var cnt = 0;
  Promise.resolve().then(function(data){ library.assign_data(); }).then(function(data) { library.findall(); });
  Promise.all(promis).then(function(rslt){
    // cnt++;
    // console.log(cnt);
    // console.log(rslt[1]); 
    res.render("home")
  })
  
  //res.render("home", { records: locals.listdata })
  // console.log("A request for things received at " + Date.now());
  // next();
});
app.get('/result',function(req,res){
    mongojs_db.pmsdata.find(function(err,docs){
    if(err)
    {
      res.send("hfgfghfg")
    }
    else
    {
      res.send(docs);
    }
  });
});

  // rest = mongojs_db.pmsdata.find();
  // pd = Promise.resolve(rest);
  
      // if (err) { Promise.reject(err) }
      // else 
      // { 
        //pd = Promise.resolve(mongojs_db.pmsdata.find());
        //pd.then(function(value) {
          //console.log(value);
          // vl = value;
          // return vl;
        //});
      //}
   // });   
  //});
  //pd = Promise.resolve();
  //console.log(pd);
  
//   return pd;
// }
// app.use('/', index);
app.use('/users', users);
var route = require('./api/routes/skillmanageRoute');
route(app)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
