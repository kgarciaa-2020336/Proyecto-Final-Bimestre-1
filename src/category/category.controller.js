import Category from './category.model.js'
import Product from '../product/product.model.js'


export const creatCategory = async (req, res) => {
    try {
        const { name, description,} = req.body

        const existingCategory = await Category.findOne({name})
        if (existingCategory) {
            return res.status(400).send({ success: false, message: 'Category already registered ' })
        }

        const newProduct = new Category({name, description,})
        await newProduct.save()
        return res.status(201).send({ success: true, message: 'Category created successfully', product: newProduct })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ success: false, message: 'General error', error: e })
    }
}


export const getAll = async(req, res)=>{
    try{
        const category = await Category.find({status: true})
        return res.send(
            {
                success: true,
                message: 'Category found: ', 
                Categories: category
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const updateCategory = async(req, res)=>{
    const { id } = req.params
    const data = req.body
    try{
        const update = await Category.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        return res.send(
            {
                success: true,
                message: 'Category updated successfully',
                update
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding category',
                err
            }
        )
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const { id } = req.params

        const idGeneral = await Category.findOne({name: 'General'})
        let idDefault = idGeneral.id
        
        if(id === idDefault){
            return res.status(400).send(
                {
                    success: false,
                    message: 'It is not possible to delete the general category',
                }
            )
        }

        await Category.findByIdAndUpdate(id, {status: false}, {new: true})

        await Product.updateMany(
            { category: id }, 
            { $set: 
                { 
                    category: idGeneral._id 
                } 
            } 
        )

        return res.status(200).send(
            {
                success: true,
                message: 'Delete Category',
            }
        )

    }catch(err){
        return res.status(500).send(
            {
                success: false,
                message: "Error delete category",
                error: err.message
            }
        )
    }
}