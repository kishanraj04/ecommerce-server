import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { handleSendContact } from '../controller/contact.controller.js'
const contactRouter = express.Router()


// send message
contactRouter.post('/contact/message',isAuthenticated,handleSendContact)


export default contactRouter