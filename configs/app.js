'use strict'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { limiter } from '../middlewares/rate.limit.js'
import authRoutes from '../src/auth/auth.routes.js'
import userRoutes from '../src/user/user.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import productRoutes from '../src/product/product.routes.js'
import cartRoutes from '../src/cart/cart.routes.js'
import invoiceRoutes from '../src/invoice/invoice.routes.js'

const configs = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
}

const routes = (app) => {
    app.use(authRoutes)
    app.use('/user', userRoutes)
    app.use('/category', categoryRoutes)
    app.use('/product', productRoutes)
    app.use('/cart', cartRoutes)
    app.use('/invoice', invoiceRoutes)
}

export const initServer = async () => {
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (e) {
        console.error('Server init failed', e)
    }
}