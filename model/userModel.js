import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
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

export default  mongoose.model("usermodel",userSchema)