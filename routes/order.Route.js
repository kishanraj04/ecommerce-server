import express from 'express'
import { getAllOrder, getSingleOrder, orderTheProduct } from '../controller/order.controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { authorizedRoles } from '../middleware/authorizedRoles.js' 
const orderRouter = express.Router() 

// creating order
orderRouter.post('/order',isAuthenticated,orderTheProduct)

// get all order
orderRouter.get('/all-order',isAuthenticated,authorizedRoles,getAllOrder)

// get single order
orderRouter.get('/single/order/:id',isAuthenticated,authorizedRoles,getSingleOrder)
export default orderRouter