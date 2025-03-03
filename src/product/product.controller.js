import Product from "./product.model.js"

export const creatProduct = async (req, res) => {
    try {
        const data = req.body

        const product = new Product(data)
        await product.save()
        return res.status(201).send({ success: true, message: 'Category created successfully', product: product })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}

export const searchProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        console.log(product)
        if (!product) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'Product found',
                product
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                error: e
            }
        )
    }
}

export const catalogProduct = async (req, res) => {
    try {
        const product = await Product.find({ status: true })
        return res.send(
            {
                success: true,
                message: 'Product found: ',
                Products: product
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'Product error',
                err
            }
        )
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params
    const dataProduct = req.body
    try {
        if (!dataProduct) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'Data is required'
                }
            )
        }

        const product = await Product.findByIdAndUpdate(
            id,
            dataProduct,
            { new: true }
        )
        return res.send(
            {
                success: true,
                message: 'Product updated successfully',
                product
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding category',
                e
            }
        )
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).send(
                {
                    success: false,
                    message: 'Product not found'
                }
            )
        }

        await Product.findByIdAndUpdate(id, { status: false }, { new: true })

        return res.send(
            {
                success: true,
                message: 'Product has been deleted'
            }
        )

    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error deleting account',
                e
            }
        )
    }
}
export const getBestSellers = async (req, res) => {
    try {

        const bestSellers = await Product.find()
            .sort({ sold: -1 }) 
            .limit(10) 

        return res.send({ success: true, bestSellers })
    } catch (error) {
        console.error("Error fetching best-selling products:", error)
        return res.status(500).send({ message: "Error fetching best-selling products", error })
    }
}

export const searchProducts = async (req, res) => {
    try {
        const { name } = req.body 

        const products = await Product.find({ name: { $regex: name, $options: 'i' } })

        if (products.length === 0) {
            return res.status(404).send({ message: "No products found" })
        }

        return res.send({ success: true, products })
    } catch (error) {
        console.error("Error searching for products:", error)
        return res.status(500).send({ message: "Error searching for products", error })
    }
}


export const filterProductsByCategory = async (req, res) => {
    try {
        const { id } = req.params

        const products = await Product.find({ category: id })

        if (products.length === 0) {
            return res.status(404).send({ message: "No products found for this category" })
        }

        return res.send({ success: true, products })
    } catch (error) {
        console.error("Error filtering products by category:", error)
        return res.status(500).send({ message: "Error filtering products by category", error })
    }
}