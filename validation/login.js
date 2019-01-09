const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : ''; 
    data.password = !isEmpty(data.password) ? data.password : ''; 

    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is Required";
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password is Required";
    }

    if(!Validator.isLength(data.password , {min : 6 , max : 12})){
        errors.password = "Password Must be atleast 6 characters";
    }

    return {
        errors,
        isValid : isEmpty(errors)
    }
}