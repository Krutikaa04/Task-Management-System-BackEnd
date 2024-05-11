const joi = require("joi");

exports.validateRegister = (req, res, next) =>{

    const userSchema = joi.object({
        firstName: joi.string().required().min(3),
        lastName: joi.string().required(),
        contact: joi.number().integer().min(10 ** 9).max(10 ** 10 - 1).required(),
        password: joi.string().required().min(5),
        email: joi.string().email().required(),
        gender: joi.string().required(),
        role: joi.string().required(),
        profilePic: joi.string().allow("", null),
        status: joi.string().required()
    })
    const options = {
        abortEarly:false,
        allowUnknown:true,
        stripUnknown:true
    }
    const {error,value} = userSchema.validate(req.body,options);
    if(error){
        return res.json({
            status: 400,
            data:`Validation Error : ${error.details.map(data => data.message).join(", ")}`
        })
    }
    else{
        next();
    }
} 

exports.validateLogin = (req, res, next) =>{
    const loginSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required().min(5)
    })

    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    }
    const {error, value} = loginSchema.validate(req.body, options);
    if(error){
        return res.json({
            status: 400,
            data: `Validation Error : ${error.details.map(data => data.message).join(", ")}`
        })
    }
    else{
        next();
    }
}
