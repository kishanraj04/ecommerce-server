import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated'
const contactRouter = express.Router()


// send message
contactRouter.post('/contact/message',isAuthenticated,handleSendContact)