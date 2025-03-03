import { Router } from 'express'
import {  isClient, validateJwt } from '../../middlewares/validate.jwt.js'
import { addCart, getCart, removeFromCart } from './cart.controller.js'

const api = Router()

api.post('/addCart',
    validateJwt,
    isClient,
    addCart)

api.get('/getCart',
    validateJwt,
    isClient,
    getCart)

api.delete('/removeFromCart/:id',
    validateJwt,
    isClient,
    removeFromCart)


export default api