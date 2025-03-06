import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { addToCart } from '../controller/cart.controller.js'

const cartRouter = express.Router()

// add to cart
cartRouter.post('/add/cart',isAuthenticated,addToCart)


export default cartRouter