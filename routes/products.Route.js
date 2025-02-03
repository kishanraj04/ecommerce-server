import express from 'express'
import { createProduct, deletSingleProduct, getAllPoduct, getSingleProduct, updateProduct } from '../controller/product.controller.js'

const productRoute = express.Router()


// get all products
productRoute.get('/all-product',getAllPoduct)

// get single products
productRoute.get('/product/:id',getSingleProduct)

// delete a single product
productRoute.delete('/product/:id',deletSingleProduct)

// update a single product
productRoute.put('/product/:id',updateProduct)

// create a product
productRoute.post('/product/create',createProduct)

export default productRoute