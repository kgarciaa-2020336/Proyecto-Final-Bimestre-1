import Cart from "../cart/cart.model.js"
import Invoice from "./invoice.model.js"
import Product from "../product/product.model.js"

export const createInvoice = async (req, res) => {
    try {
        const { uid } = req.user
        if (!uid) {
            return res.status(400).send({ message: "User is not authenticated" })
        }

        const cart = await Cart.findOne({ userId: uid }).populate('items.productId')

        if (!cart || cart.items.length === 0) {
            return res.status(400).send({ message: "The cart is empty" })
        }

        let total = 0;
        const invoiceItems = []

        for (let item of cart.items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(400).send({ message: `Product not found (ID: ${item.productId})` })
            }

            if (product.stock < item.quantity) {
                return res.status(400).send({ message: `Insufficient stock for ${product.name}` })
            }

            total += item.quantity * product.price
            product.stock -= item.quantity
            product.sold += item.quantity
            await product.save()

            invoiceItems.push({
                productId: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const newInvoice = new Invoice({
            userId: uid,
            items: invoiceItems,
            totalPrice: total
        });

        await newInvoice.save()

        cart.items = []
        await cart.save()

        return res.status(201).send({
            success: true,
            message: "Invoice successfully created",
            invoice: newInvoice
        });

    } catch (error) {
        console.error("Error in createInvoice:", error);
        return res.status(500).send({ message: "Internal server error", error })
    }
};



export const editInvoice = async (req, res) => {
    try {
        const { invoiceId, productId, quantity } = req.body

        const invoice = await Invoice.findById(invoiceId)
        if (!invoice) {
            return res.status(404).send({ message: "Invoice not found" })
        }

        const itemIndex = invoice.items.findIndex(item => item.productId.toString() === productId)
        if (itemIndex === -1) {
            return res.status(400).send({ message: "The product is not in the invoice" })
        }

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(400).send({ message: "Product not found" })
        }

        product.stock += invoice.items[itemIndex].quantity
        product.sold -= invoice.items[itemIndex].quantity

        if (product.stock < quantity) {
            return res.status(400).send({ message: `Insufficient stock for ${product.name}` })
        }

        product.stock -= quantity
        await product.save()

        invoice.items[itemIndex].quantity = quantity
        invoice.totalPrice = invoice.items.reduce((total, item) => total + item.quantity * item.price, 0)
        await invoice.save()

        return res.send({ success: true, message: "Invoice successfully updated", invoice })

    } catch (error) {
        console.error("Error in editInvoice", error)
        return res.status(500).send({ message: "Internal server error", error })
    }
}


export const getInvoices = async (req, res) => {
    try {
        const { uid } = req.user

        const invoices = await Invoice.find({ userId: uid }).populate('items.productId')

        if (!invoices.length) {
            return res.status(404).send({ message: "No invoices found for this user" })
        }

        return res.send({ success: true, invoices })
    } catch (error) {
        console.error("Error retrieving invoices", error)
        return res.status(500).send({ message: "Internal server error", error })
    }
}


export const purchaseHistory = async (req, res) => {
    try {
        const { uid } = req.user

        const invoices = await Invoice.find({ userId: uid }).populate('items.productId')

        if (!invoices || invoices.length === 0) {
            return res.status(404).send({ message: "No purchases found for this user." })
        }

        return res.json({ success: true, invoices })
    } catch (error) {
        console.error("Error fetching purchase history:", error);
        return res.status(500).send({ message: "Error fetching purchase history", error })
    }
}


