const KVAModel = require('./kva.model');

/**
 * Creates Key Value Object
 * 
 * @param {any} req  HTTP Request
 * @param {any} res  HTTP Response
 * @param {callback} next 
 */
module.exports.createKeyValue = function(req, res, next){
    const userObject = req.body;
    const userKey = Object.keys(userObject)[0]; //get the first key. We have already verified that userObject will be a map
    const userValue = userObject[userKey];

    const dbObj = {
        key:userKey,
        value: userValue
    }
    KVAModel.create(dbObj, (err, savedObj)=>{
        if(!err){
            res.json({
                    key: savedObj.key,
                    value: savedObj.value,
                    timestamp: savedObj.createdAt            
            })
        } else{
            next(e)
        }
        
    })
}

/**
 * Find the Key Value By the time and key provided by the user
 * 
 * Return Key - Value Object if it exists with Http Status 200, otherwise returns 404
 * @param {any} req 
 * @param {any} res 
 * @param {callback} next 
 */
module.exports.findByKey = function(req, res, next){
    const userKey = req.params.key;
    const requestedTimeStamp = req.query.timestamp;
    let time = Date.now();
    if(req.query.timestamp){
        time = req.query.timestamp * 1000;

    }

    //find the kva object by first arranging all the time less than the given time and then picking up the first value
    KVAModel.findOne({key:userKey, createdAt: {$lte: time}}).sort({createdAt: 'desc'}).exec(function(err,docs){
        if(!err){
            if(docs != null) {
                res.json({
                    key: docs.key,
                    value: docs.value,
                });
            } else {
                res.sendStatus(404);
            }
            

        } else{
            next(err);
        }
    })



}