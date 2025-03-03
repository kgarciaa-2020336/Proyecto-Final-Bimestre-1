import { Router } from 'express'
import { isClient, validateJwt } from '../../middlewares/validate.jwt.js'
import { createInvoice, editInvoice, getInvoices, purchaseHistory } from './invoice.controller.js'

const api = Router()

api.get('/creatInvoice',
    validateJwt,
    isClient,
    createInvoice)

api.put('/updateInvoice', 
    validateJwt,
    isClient,
    editInvoice)

api.get('/getInvoices',
    validateJwt,
    isClient,
    getInvoices
)

api.get('/puchaseHistory',
    validateJwt,
    isClient,
    purchaseHistory
)



export default api