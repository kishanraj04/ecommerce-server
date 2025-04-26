import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import { addressmodel } from "../model/address.model.js";
import { contactModel } from "../model/contact.model.js";

// saving the user message
export const handleSendContact = asyncHandler(async(req,res)=>{
    const contact = req?.body
    
    if(!contact){
       return res.status(404).json({success:false,message:"message not sent"})
    }

    const savedMessage = await contactModel.create({name:contact?.name,email:contact?.email,message:contact?.message})
    
    if(savedMessage){
        res.status(200).json({success:true,message:"message saved",savedMessage})
    }
})

// save user delivery address
export const saveDeliveryAddress = asyncHandler(async(req,res)=>{
    const address = req?.body 
    const userId = req?.user?._id;
    const newAddress = await addressmodel.create({...address,userId})
    if(!newAddress){
        return res.status(500).json({success:false,message:"address not saved"})
    }
    res.status(200).json(newAddress)
})