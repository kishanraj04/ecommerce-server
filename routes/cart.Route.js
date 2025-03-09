import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { addToCart, deleteCartItem, getItemFromCart } from '../controller/cart.controller.js'

const cartRouter = express.Router()

// add to cart
cartRouter.post('/add/cart',isAuthenticated,addToCart)

// delete cart item
cartRouter.delete('/delete/cart',isAuthenticated,deleteCartItem)

cartRouter.get('/all/cart/:uid',isAuthenticated,getItemFromCart)

export default cartRouter