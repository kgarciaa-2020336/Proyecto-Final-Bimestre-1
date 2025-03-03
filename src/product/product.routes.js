import {  Router } from 'express'
import { isAdmin, isClient, validateJwt } from '../../middlewares/validate.jwt.js'
import { catalogProduct, creatProduct, deleteProduct, filterProductsByCategory, getBestSellers, searchProduct, searchProducts, updateProduct } from './product.controller.js'
import { productInfoUpdateValidator, productUpdateValidator, productValidator } from '../../helpers/validator.js'

const api = Router()

//Rutas privadas
api.post('/creatProduct',
    productValidator,
    validateJwt,
    isAdmin,
    creatProduct)

api.get('/searchProduct/:id',
    validateJwt,
    isAdmin,
    searchProduct)

api.get('/catalogProduct',
    validateJwt,
    isAdmin,
    catalogProduct)

api.put('/updateProduct/:id',
    productUpdateValidator,
    validateJwt,
    isAdmin,
    updateProduct)


api.put('/updateInformationProduct/:id',
    productInfoUpdateValidator,
    validateJwt,
    isAdmin,
    updateProduct)

api.delete('/deleteProduct/:id',
    validateJwt,
    isAdmin,
    deleteProduct)

api.get('/getBestSellers',
    validateJwt,
    isClient,
    getBestSellers
)

api.post('/searchProducts',
    validateJwt,
    isClient,
    searchProducts
)

api.get('/filterProductsCategory/:id',
    validateJwt,
    isClient,
    filterProductsByCategory
)


export default api

