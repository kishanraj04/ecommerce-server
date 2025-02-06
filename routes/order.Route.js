import express from 'express'
import { orderTheProduct } from '../controller/order.controller.js'

const orderRouter = express.Router() 

orderRouter.post('/order',orderTheProduct)

export default orderRouter