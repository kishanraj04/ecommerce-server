import { asyncHandler } from "../middleware/asyncErrorHandler.js";
import { addressmodel } from "../model/address.model.js";
import { contactModel } from "../model/contact.model.js";

// saving the user message
export const handleSendContact = asyncHandler(async (req, res) => {
  const contact = req?.body;

  if (!contact) {
    return res
      .status(404)
      .json({ success: false, message: "message not sent" });
  }

  const savedMessage = await contactModel.create({
    name: contact?.name,
    email: contact?.email,
    message: contact?.message,
  });

  if (savedMessage) {
    res
      .status(200)
      .json({ success: true, message: "message saved", savedMessage });
  }
});

// save user delivery address
export const saveDeliveryAddress = asyncHandler(async (req, res) => {
  const address = req?.body;
  const userId = req?.user?._id;
  console.log(address);
  const newAddress = await addressmodel.create({ ...address,userId});
  if (!newAddress) {
    return res
      .status(500)
      .json({ success: false, message: "address not saved" });
  }
  res.status(200).json(newAddress);
});

// get user delivery address
export const getAllDeliveryAddress = asyncHandler(async (req, res) => {
  const { uid } = req?.params;

  const response = await addressmodel.find({ userId: uid });
  if (!response) {
    return res
      .status(404)
      .json({ success: false, message: "delivery address not found" });
  }

  res.status(200).json({ success: true, data: response });
});

// update user delivery address
export const updateDeliveryAddress = asyncHandler(async (req, res) => {
  const updateDeliveryAddress = req?.body;
  const updateAddress = await addressmodel.findByIdAndUpdate({"_id":updateDeliveryAddress?._id},{$set:{...updateDeliveryAddress}},{new:true}) 
  
  if(!updateAddress){
    return res.status(500).json({success:false,message:"update failed"})
  }
  return res.json(updateAddress);
});


// delete address
export const deleteDeliveryAddress = asyncHandler(async(req,res)=>{
    const {id} = req?.params
    const deletedAddress = await addressmodel.findByIdAndDelete({_id:id})
    if(!deleteDeliveryAddress){
      res.status(500).json({success:false,message:"deletion failed"})
  
    }
    res.status(200).json({success:true,message:"address deleted"})

})