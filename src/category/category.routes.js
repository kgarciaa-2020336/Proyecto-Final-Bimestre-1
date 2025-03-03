import { Router } from 'express'
import { isAdmin, isClient, validateJwt } from '../../middlewares/validate.jwt.js'
import { creatCategory, deleteCategory, getAll, updateCategory } from './category.controller.js'
import { categoyUpdateValidator, categoyValidator } from '../../helpers/validator.js'

const api = Router()

// rutas privadas
api.post('/createCategory',
    categoyValidator,
    validateJwt,
    isAdmin,
    creatCategory)

api.get('/getAllCategory',
    validateJwt,
    isAdmin,
    getAll)

api.put('/updateCategory/:id',
    categoyUpdateValidator,
    validateJwt,
    isAdmin,
    updateCategory)


api.delete('/deleteCategory/:id',
    validateJwt,
    isAdmin,
    deleteCategory)
    
api.get('/existsCategory',            
        validateJwt,
        isClient,
        getAll)

export default api
