var express = require('express');
var app = express();

app.get('/',function(req,res){
    console.log("Hello Demo!!!")
})

app.listen(3044);
console.log("Listening to 3044");