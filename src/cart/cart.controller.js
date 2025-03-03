import Product from "../product/product.model.js";
import Cart from "../cart/cart.model.js";

export const addCart = async (req, res) => {
    try{
        const { uid } = req.user
        const { productId, quantity } = req.body

        const product = await Product.findById(productId)

        if (!product || product.stock <= quantity) {
            return res.status(400).send({ error: "Stock insuficiente" })
        }

        const newItem = {
            productId: productId,
            quantity: quantity,
            price: product.price,
        }

        let cart = await Cart.findOne({ userId:uid })

        if (cart) {

            let productFound = false

            for (const item of cart.items) {
                if (item.productId.equals(productId)) {
                    item.quantity += quantity
                    productFound = true
                    break
                }
            }

            if (!productFound) {
                cart.items.push(newItem)
            }

            let totalPrice = 0
            for (const item of cart.items) {
                totalPrice += item.quantity * item.price
            }

            cart.totalPrice = totalPrice

            await cart.save()
            res.send(
                { 
                    message: "Producto agregado al carrito y cantidad actualizada" 
                }
            )
        } else {
            const newCart = new Cart(
                {
                    userId: uid,
                    items: [newItem], 
                }
            )

            const totalPrice = newItem.quantity * newItem.price

            newCart.totalPrice = totalPrice

            await newCart.save()
            res.send(
                { 
                    message: "Nuevo carrito creado y producto agregado" 
                }
            )
        }
    } catch (e) {
        return res.status(500).send(
            { 
                message:'General error', error: e 
            }
        )
    }
}




export const getCart = async (req, res) => {
    try{
        const { uid } = req.user

        const cart = await Cart.findOne({ userId: uid, status: true })
        
        if (!cart) {
            return res.status(400).send({ error: "Empty shopping cart" })
        }

        return res.send(
            {
                message: "loaded cart",
                cart: cart
            }
        )
    
    }catch (e) {
        return res.status(500).send(
            { 
                message:'General error', error: e 
            }
        )
    }
}


export const removeFromCart = async (req, res) => {
    try {
        const { uid } = req.user
        const { id } = req.params

        let cart = await Cart.findOne({ userId: uid })

        if (!cart) {
            return res.status(404).send({ message: "Carrito no encontrado" })
        }

        let newItems = []
        let totalPrice = 0
        let found = false

        for (const item of cart.items) {
            if (item.productId.equals(id)) {
                found = true
                continue
            }

            newItems.push({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            })

            totalPrice += item.quantity * item.price
        }

        if (!found) {
            return res.status(404).send(
                { 
                    message: "Producto no encontrado en el carrito" 
                }
            )
        }

        cart.items = newItems
        cart.totalPrice = totalPrice

        await cart.save()
        return res.send(
            {
                message: "Producto eliminado del carrito",
                totalPrice: cart.totalPrice,
                items: cart.items
            }
        );

    } catch (e) {
        res.status(500).send({ message: "Error al eliminar el producto", error: e })
    }
}