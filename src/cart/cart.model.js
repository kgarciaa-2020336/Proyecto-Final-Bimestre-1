
import {Schema, model} from "mongoose";

const cartSchema = Schema({
    userId:{
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    },
    items: [{ 
        productId: { 
            type: Schema.Types.ObjectId, 
            ref: 'Product'
        }, 
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        price:{
            type: Number,
            required: true,
            min: 0,
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true
    }
});

cartSchema.methods.toJSON = function(){
    const { __v, status, ...cart} = this.toObject()
    return cart
}

export default model ("Cart", cartSchema)