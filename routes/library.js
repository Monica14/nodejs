exports.findall = function () {
    return new Promise(function (resolve, reject) {
        mongojs_db.pmsdata.find({}, function (err, docs) {
            if (err) {
                reject(err)
            }
            else {
                resolve(docs);
                console.log(docs)
            }
        })
    })
}

exports.assign_data = function (data) {
    return new Promise(function (resolve, reject) {
        mongojs_db.pmsdata.find({}, function (err, docs) {
            if (err) {
                reject(err)
            }
            else {
                resolve(docs);
                console.log("docs")
            }
        })
    })
}