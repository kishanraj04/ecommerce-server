import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { addToWishList } from '../controller/wishList.controller.js'

export const wishListRouter = express.Router()

// add to wishList
wishListRouter.post('/wish-list/add',isAuthenticated,addToWishList)

