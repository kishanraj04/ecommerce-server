import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { getAllDeliveryAddress, handleSendContact, saveDeliveryAddress } from '../controller/contact.controller.js'
const contactRouter = express.Router()


// send message
contactRouter.post('/contact/message',isAuthenticated,handleSendContact)

// save user delivery address
contactRouter.post('/user/delivery-address',isAuthenticated,saveDeliveryAddress)

// get all delivery address
contactRouter.get('/user/delivery-address/:uid',isAuthenticated,getAllDeliveryAddress)

export default contactRouter