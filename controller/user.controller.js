const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Users = require("./../model/usersSchema");
require("./../model/roleSchema");

// registration api started

const registerUser = async (req,res)=>{
  try {
    const {
        firstName,
        lastName,
        gender,
        role,
        email,
        contact,
        password,
        createdOn,
        profilePic,
        status,
      } = req.body;
    
        const userExist = await Users.findOne({
          email: email,
          contact: contact
        }).populate("role");
        if (userExist) {
          return res
            .status(400)
            .json({ error: "It seems you already have an account" });
        }
    
        //hash password
        const saltRounds = Number(process.env.SALTROUNDS);
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        const user = new Users({
          firstName,
          lastName,
          gender,
          role,
          email,
          contact,
          password :hash ,
          createdOn,
          profilePic,
          status,
        });
    
        await user.save();
        return res.status(200).json({ message: "user registered successfully" });
      } 
      catch (err) {
        return res.status(400).json({ error: "failed to register user" });
      }
 
}

// registration api ended


// login api started

const loginUser = async (req,res)=>{
  try{
    const {email, password } = req.body;

    let token;

    const checkUser = await Users.findOne({email: email})
    if(checkUser){
      if(bcrypt.compareSync(password, checkUser.password)){
        token = jwt.sign({_id: this._id, email: this.email}, process.env.SECRET_TOKEN, {expiresIn: "24h"});

        res.status(200).json({
          message: "You logged in successfully",
          data:{
            email: email,
            name: checkUser.firstName,
            token: token
          }
        });
      }else{
        return res.status(400).json({error: "Invalid Password"});
      }

    }else{
      return res.status(400).json({error: "Email does not exist"});
    }
   
  }
  catch(err){
    res.status(400).json({error: "Failed to login user"})
  }
}


// login api ended

module.exports = {
    registerUser,
    loginUser
}