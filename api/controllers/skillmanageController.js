var mongoose = require("mongoose");
skillmanage = mongoose.model("skillmanage");

exports.list_skills = function(req,res){
    skillmanage.find({},function(err,result){
        if(err)
            res.send(err)
        else
            res.json(result)
    })
}

exports.save_skill = function(req,res)
{
    // var skill_details = new Skills({
    //     _id : new Date().getTime(),
    //     skill_name : req.body.name,
    //     status : req.body.status,
    // })
    var skill_details = new skillmanage(req.body)
    //res.send(skill_details)
    skill_details.save(function(err,result){
        if(err)
            res.send(err)
        else
            res.send("Save")
    })
}

exports.update_skills = function(req,res)
{
    //res.send(req.params.id)
    skillmanage.findOneAndUpdate({_id : req.params.id},req.body,{new:true},function(err,result){
        if(err)
            res.send(err)
        else
        res.send("Update")
    })
}