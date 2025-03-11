import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { addToCart, decreaseItemQty, deleteCartItem, getItemFromCart,  increaseItemQtys } from '../controller/cart.controller.js'

const cartRouter = express.Router()

// add to cart
cartRouter.post('/add/cart',isAuthenticated,addToCart)

// delete cart item
cartRouter.delete('/delete/cart/:id',isAuthenticated,deleteCartItem)

// get cart item of login user
cartRouter.get('/all/cart/:uid',isAuthenticated,getItemFromCart)

// decrease item qty
cartRouter.put('/decrease/cart/:pid',isAuthenticated,decreaseItemQty)

// increase item quantity
cartRouter.put('/increase/cart/:id',isAuthenticated,increaseItemQtys)



export default cartRouter