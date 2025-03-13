import mongoose, { Mongoose } from 'mongoose'

const wishListSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodel",
        required:true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true
    }
})

export const wishListModel = mongoose.model("wishListModel",wishListSchema)