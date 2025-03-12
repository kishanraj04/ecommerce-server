import { asyncHandler } from "../middleware/asyncErrorHandler.js";
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