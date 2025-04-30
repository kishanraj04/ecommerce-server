import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { deleteDeliveryAddress, getAllDeliveryAddress, handleSendContact, saveDeliveryAddress, updateDeliveryAddress } from '../controller/contact.controller.js'
const contactRouter = express.Router()


// send message
contactRouter.post('/contact/message',isAuthenticated,handleSendContact)

// save user delivery address
contactRouter.post('/user/delivery-address',isAuthenticated,saveDeliveryAddress)

// get all delivery address
contactRouter.get('/user/delivery-address/:uid',isAuthenticated,getAllDeliveryAddress)

// update user delivery address
contactRouter.post('/user/update-delivery/address',isAuthenticated,updateDeliveryAddress)

// delete delivery address
contactRouter.delete('/user/delete/delivery-address/:id',isAuthenticated,deleteDeliveryAddress);

export default contactRouter