import { Schema, model } from "mongoose";

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]            
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`]            
        },
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            maxLength: [15, `Can't be overcome 15 characters`]            
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required'],

        },
        password: {
            type: String,
            required:[true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            maxLength: [13, `Can't be overcome 8 numbers`],
            minLength: [8, 'Number must be 8 numbers']
        },
        role: {
            type: String,
            uppercase: true,
            enum: ['ADMIN', 'CLIENT'],
            default: "CLIENT"
        },
        status:{
            type: Boolean, 
            default: true
        }
    }
)

userSchema.methods.toJSON = function(){
    const { __v, password, status, _id, ...user} = this.toObject()
    return user
}

export default model('User', userSchema)