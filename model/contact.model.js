import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    message:{
        type:String,
        required:true,
        minlength:[20,"please write a long message"]
    }
})

export const contactModel = mongoose.model('contactModel',contactSchema)