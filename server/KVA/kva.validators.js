const errorValidation = require('../utils/validation-error');
const BAD_REQUEST_CODE = 400;
module.exports = {

    //create KVA Object
    kvaInsert : function(req, res, next) {
        const userObject = req.body;
        const userKey = Object.keys(userObject)[0];
        const userValue = userObject[userKey];

        if(Object.keys(userObject).length > 1){
            next(new errorValidation("More than 1 key Specified", BAD_REQUEST_CODE));

        } else {
            //the value part can only be string or JSON
            if(typeof userValue != "string" && typeof userValue != "object") {
                next(new errorValidation("InCorrect Value", BAD_REQUEST_CODE));
            } else {
                next();
            }
        }
    }
};