import {Schema, model} from "mongoose";

const invoiceSchema = Schema({
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: Boolean,
        default: true
    }
});

invoiceSchema.methods.toJSON = function(){
    const { __v, status, ...invoice} = this.toObject()
    return invoice
}

export default model ("Invoice", invoiceSchema)