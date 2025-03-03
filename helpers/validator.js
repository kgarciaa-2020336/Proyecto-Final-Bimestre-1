import { body } from "express-validator"
import { validateErrorWithoutImg } from "./validate.error.js"
import { existEmail, existUsername } from "./db-validators.js"

export const registerValidator = [
    body('name', 'Name cannot be empty').notEmpty(),
    body('surname', 'Surname cannot be empty').notEmpty(),
    body('username', 'Username cannot be empty').notEmpty().custom(existUsername),
    body('email', 'Email cannot be empty or is not a valid email').notEmpty().isEmail().custom(existEmail),
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword()
        .withMessage("The passwort must be strong").isLength({ mas: 8 }),
    body('phone', 'Phone cannot be empty or is not valid phone').notEmpty().isMobilePhone(),
    body('role', 'Optional').optional(),
    validateErrorWithoutImg
]

export const loginValidator = [
    body('userLoggin', 'Username or email is required').notEmpty(),
    body('password', 'Password is required').notEmpty(),
    validateErrorWithoutImg
]

export const updateValidator = [
    body('name', 'Name is required').optional().notEmpty(),
    body('surname', 'Surname is required').optional().notEmpty().custom(existUsername),
    body('email', 'Email is required').optional().notEmpty().custom(existEmail),
    body('phone', 'Phone is required or is not a valid email').optional().notEmpty().isMobilePhone(),
    validateErrorWithoutImg
]

export const updateRoleValidator = [
    body('role', 'Role is required').notEmpty(),
    validateErrorWithoutImg
]


export const categoyValidator = [
    body('name', 'Name is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    validateErrorWithoutImg
]

export const categoyUpdateValidator = [
    body('name', 'Name is required').optional().notEmpty(),
    body('description', 'Description is required').optional().notEmpty(),
    validateErrorWithoutImg
]


export const productValidator = [
    body('name', 'Name is required').notEmpty(),
    body('description', 'Description is required').notEmpty(),
    body('price', 'Price is required').notEmpty().isNumeric(),
    body('stock', 'Stock is required').notEmpty().isNumeric(),
    body('category', 'Category is required').notEmpty(),
    validateErrorWithoutImg
]

export const productUpdateValidator = [
    body('price', 'price is required').optional().notEmpty(),
    body('stock', 'stock is required').optional().notEmpty(),
    validateErrorWithoutImg
]

export const productInfoUpdateValidator = [
    body('name', 'neme is required').optional().notEmpty(),
    body('description', 'description is required').optional().notEmpty(),
    validateErrorWithoutImg
]
