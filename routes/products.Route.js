import express from 'express'
import { createProduct, deletSingleProduct, getAllPoduct, getSingleProduct, priceFilter, searchProduct, updateProduct, writeReview } from '../controller/product.controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { authorizedRoles } from '../middleware/authorizedRoles.js'

const productRoute = express.Router()


// get all products
productRoute.get('/all-product',isAuthenticated,getAllPoduct)

// get single products
productRoute.get('/product/:id',isAuthenticated,getSingleProduct)

// delete a single product -- admin
productRoute.delete('/product/:id',isAuthenticated,authorizedRoles,deletSingleProduct)

// update a single product -- admin
productRoute.put('/product/:id',isAuthenticated,authorizedRoles,updateProduct)

// create a product -- admin
productRoute.post('/product/create',isAuthenticated,authorizedRoles,createProduct)

// search a product
productRoute.get('/product/search/:category',isAuthenticated,searchProduct)


// price filter 
productRoute.get('/product/price/:gt/:lt',isAuthenticated,priceFilter)

// writing review
productRoute.post('/product/review/:id',isAuthenticated,writeReview)

export default productRoute