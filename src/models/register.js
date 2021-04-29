const mongoose =require("mongoose");
const validator = require("validator");

//this is the schema for registration
const registerSchema = new mongoose.Schema({
    firstname:{
                type:String,
                required:true,

    },
    lastname:{
                type:String,
                required:true,
    },
    phone_no:{ 
                type:Number,
                min:10,
                required:true,

    },
    email:{
            type:String,
            required:true,
            unique:[true,"Email id is already present in the database"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error ("Invalid Email")
                }
            }

    },
    address:{
                type:String,
                required:true,

    }

    

})


//Model is defined here
const Register = new mongoose.model("Register",registerSchema);

module.exports = Register;