module.exports = function(app)
{
    var cors = require('cors')
    app.use(cors())
    var skill_manage = require("../controllers/skillmanageController");
    app.route("/api/skills").get(skill_manage.list_skills);
    app.route("/api/skills").post(skill_manage.save_skill);
    app.route("/api/skills/:id/update").put(skill_manage.update_skills);
    app.route("/api/skills/:id/approve").put(skill_manage.update_skills);
}