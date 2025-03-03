
import {Schema, model} from "mongoose";

const categorySchema = Schema({
    name:{ 
        type: String, 
        required: [true, "Name is required"], 
        unique: true 
    },
    description:{
        type: String, 
        required: [true, "Description is required"],
        minLength: [3, "Description needs more than 3 characters"],
        maxLength: [800, "Description cannot exced 800 characters"]
    },
    status:{
        type: Boolean,
        default: true
    }
});

categorySchema.methods.toJSON = function(){
    const { __v, status,  ...category} = this.toObject()
    return category
}

export default model ("Category", categorySchema)