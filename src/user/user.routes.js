import { Router } from 'express'
import { isAdmin, isClientAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { updateRoleValidator, updateValidator } from '../../helpers/validator.js'
import { accountDeletion, deletedUser, updatePersonal, updateRol, updateUser } from './user.controller.js'

const api = Router()

// rutas privadas
api.put('/updateUserFromAdmin/:id',
    updateValidator,
    validateJwt,
    isAdmin,
    updateUser)

api.put('/updateRole/:id',
    updateRoleValidator,
    validateJwt,
    isAdmin,
    updateRol)

api.delete("/deleteUser/:id",
    validateJwt,
    isAdmin,
    deletedUser)

api.put('/profileManagement',
    updateValidator,
    validateJwt,
    isClientAdmin,
    updatePersonal)


api.post('/accountDeletion',
    validateJwt,
    isClientAdmin,
    accountDeletion)

export default api

