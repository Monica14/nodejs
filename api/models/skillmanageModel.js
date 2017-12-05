var mongoose = require('mongoose');
var schema = mongoose.Schema;

var skill_schema = new schema({
    _id : { 
        type : String,
        default : new Date().getTime()
    },
    name : {
        type : String
    },
    status : {
        type : String
    }    
});

module.exports = mongoose.model('skillmanage',skill_schema);
