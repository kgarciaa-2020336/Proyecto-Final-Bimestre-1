import Category from "../src/category/category.model.js"
import User from "../src/user/user.model.js"

export const existUsername = async (username) => {
    const alreadyUsername = await User.findOne({ username })
    if (alreadyUsername) {
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async (email) => {
    const alreadyEmail = await User.findOne({ email })
    if (alreadyEmail) {
        console.error(`Email: ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}
export const existCategory = async (nameCategory) => {
    const alreadyCategory = await Category.findOne({ nameCategory })
    if (alreadyCategory) {
        console.error(`Category: ${nameCategory} is already taken`)
        throw new Error(`Category ${nameCategory} is already taken`)
    }
}

export const objectIdValid = async (objectId) => {
    console.log(isValidObjectId(objectId))
    if (!isValidObjectId(objectId)) {
        throw new Error('Is not an objectId valid')
    }
}

export const findUser = async (id) => {
    try {
        const userExist = await User.findById(id)
        if (!userExist) return false
        return userExist
    } catch (err) {
        console.error(err)
        return false
    }
}

