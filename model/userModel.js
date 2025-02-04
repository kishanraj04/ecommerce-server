import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    avatar:{
        url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        required:true
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpire:{
        type:Date
    }
})


//hash the password before saving the user details
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password , 10)
})


export default  mongoose.model("usermodel",userSchema)