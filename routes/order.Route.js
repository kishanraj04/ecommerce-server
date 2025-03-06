import express from 'express'
import { getAllOrder, getLoggedInUser, getSingleOrder, orderTheProduct, updateShippingAddress } from '../controller/order.controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { authorizedRoles } from '../middleware/authorizedRoles.js' 
const orderRouter = express.Router() 

// creating order
orderRouter.post('/order',isAuthenticated,orderTheProduct)

// get all order
orderRouter.get('/all-order',isAuthenticated,authorizedRoles,getAllOrder)

// get single order
orderRouter.get('/single/order/:id',isAuthenticated,authorizedRoles,getSingleOrder)

// get logged-in user order
orderRouter.get('/my/order',isAuthenticated,getLoggedInUser)

// update shipping address
orderRouter.post('/update/shipping/address/:orderId',isAuthenticated,authorizedRoles,updateShippingAddress)

export default orderRouter