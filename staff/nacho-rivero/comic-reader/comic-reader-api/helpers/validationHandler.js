const {validationResult} = require('express-validator')

module.exports = req => {
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        const error = new Error("Validation Failed");
        error.statusCode = 422; //this error code refers to not proper data
        error.validation = validationErrors.array();
        throw error;
    }
};