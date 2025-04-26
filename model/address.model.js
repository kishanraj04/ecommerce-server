import mongoose from "mongoose";

const address_schema = mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        contact:{
            type:Number,
            required:true
        },
        pincode:{
            type:Number,
            required:true
        },
        locality:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        landmark:{
            type:String,
            required:true
        },
        alternatecontact:{
            type:Number,
            required:true
        }
})

export const addressmodel = mongoose.model("addressmodel",address_schema) 