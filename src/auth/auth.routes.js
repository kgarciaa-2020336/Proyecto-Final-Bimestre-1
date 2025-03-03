import { Router } from 'express'
import { login, register } from './auth.controller.js'
import { loginValidator, registerValidator } from '../../helpers/validator.js'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

    api.post('/register',
        registerValidator,
        register)

api.post('/login',
    loginValidator,
    login)

// rutas privadas
api.post('/loggingAdministrator', validateJwt, isAdmin, register)


export default api

