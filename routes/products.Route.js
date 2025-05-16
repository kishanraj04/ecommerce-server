import express from 'express'
import { createNewProduct, createProduct, deleteReview, deletSingleProduct, getAllPoduct, getAllReview, getCategoryProduct, getDistinceCategory, getFilteredProducts, getSingleProduct, handlePagination, priceFilter, searchProduct, showMoreProduct, updateProduct, updateSingleProduct, writeReview } from '../controller/product.controller.js'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { authorizedRoles } from '../middleware/authorizedRoles.js'
import multer from 'multer'

const productRoute = express.Router()


// get all products
productRoute.get('/all-product',getAllPoduct)

// get category
productRoute.get('/product/category/:category',isAuthenticated,getCategoryProduct)

// get single products
productRoute.get('/product/:id',isAuthenticated,getSingleProduct)

// delete a single product -- admin
productRoute.delete('/product/:id',isAuthenticated,authorizedRoles,deletSingleProduct)

// update a single product -- admin
productRoute.put('/product/:id',isAuthenticated,authorizedRoles,updateProduct)

// create a product -- admin
productRoute.post('/product/create',isAuthenticated,authorizedRoles,createProduct)

// search a product
productRoute.get('/product/search/:name',isAuthenticated,searchProduct)

// price filter 
productRoute.get('/product/price/:gt/:lt',isAuthenticated,priceFilter)

// writing review
productRoute.post('/product/review/:id',isAuthenticated,writeReview)

// get all review 
productRoute.get('/product/get-review/:id',isAuthenticated,getAllReview)

// delete a review
productRoute.delete('/product/review/delete/:id',isAuthenticated,authorizedRoles,deleteReview)

// pagination route
productRoute.get('/page/limit/:no',isAuthenticated,handlePagination)

// fiter product
productRoute.get('/porduct/filter/:categories/:price',isAuthenticated,getFilteredProducts)

// get distinct category
productRoute.get('/product/distinct/category',isAuthenticated,getDistinceCategory)

// show more product
productRoute.get('/product/showmore/:range',isAuthenticated,authorizedRoles,showMoreProduct)

// create new product

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // ⚠️ Be cautious: this may overwrite files
  },
});

const upload = multer({ storage });

const multipleUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'images', maxCount: 10 },
]);


productRoute.post('/create/product',isAuthenticated,authorizedRoles,multipleUpload,createNewProduct)


// update product
productRoute.post('/product/single/update',isAuthenticated,authorizedRoles,updateSingleProduct)


export default productRoute