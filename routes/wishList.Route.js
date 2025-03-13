import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { addToWishList, deleteFromWishList, getAllWishListData } from '../controller/wishList.controller.js'

export const wishListRouter = express.Router()

// add to wishList
wishListRouter.post('/wish-list/add',isAuthenticated,addToWishList)

// get all wishlist item
wishListRouter.get('/wish-list/data',isAuthenticated,getAllWishListData)

// remove from wishlist
wishListRouter.delete('/wish-list/delete/:id',isAuthenticated,deleteFromWishList)