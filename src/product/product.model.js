import { Schema, model } from "mongoose";

const productSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [80, `Can't be overcome 80 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [300, `Can't be overcome 300 characters`]
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required'],
            min: [0, 'Stock cannot be negative']
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: [true, 'Category is required']
        },
        sold: {
            type: Number,
            default: 0
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

productSchema.methods.toJSON = function () {
    const { __v, status, ...product } = this.toObject()
    return product
}

export default model('Product', productSchema)