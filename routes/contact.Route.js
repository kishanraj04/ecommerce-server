import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { handleSendContact, saveDeliveryAddress } from '../controller/contact.controller.js'
const contactRouter = express.Router()


// send message
contactRouter.post('/contact/message',isAuthenticated,handleSendContact)

// save user delivery address
contactRouter.post('/user/delivery-address',isAuthenticated,saveDeliveryAddress)

export default contactRouter