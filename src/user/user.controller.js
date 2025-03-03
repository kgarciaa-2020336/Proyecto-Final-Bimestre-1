import User from './user.model.js'
import {checkPassword} from '../../utils/encrypt.js'

export const updateUser = async (req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        const update = await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )
        if (!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated successfully',
                update
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

export const updatePersonal = async (req, res) => {
    const {uid} = req.user
    const data = req.body
    console.log(uid)
    console.log(data)
    try {
        const update = await User.findByIdAndUpdate(
            uid,
            data,
            { new: true }
        )
        if (!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated successfully',
                update
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

export const updateRol = async (req, res) => {
    const { id } = req.params
    const { role } = req.body
    const admin = 'ADMIN'
    const client = 'CLIENT'

    try {

        if (role !== admin && role !== client) {
            return res.status(400).send(
                {
                    success: false,
                    message: 'The role must be ADMIN or CLIENT'
                }
            )
        }

        const update = await User.findByIdAndUpdate(
            id,
            { role: role },
            { new: true }
        )
        if (!update) return res.status(404).send(
            {
                success: false,
                message: 'Category not found, not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Category updated successfully',
                update
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

export const deletedUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findById(id)

        if (!user) {
            return res.status(404).send(
                { 
                    success: false, 
                    message: 'User not found' 
                }
            )
        }

        await User.findByIdAndUpdate(id, { status: false }, { new: true })

        return res.send(
            { 
                success: true,
                message: 'user has been deleted'
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
};

export const accountDeletion = async (req, res) => {
    try {
        const  {uid}  = req.user
        let { userLoggin, password } = req.body
        
        let user = await User.findOne(
            {
                $or: [
                    { email: userLoggin },
                    { username: userLoggin }
                ]
            }
        )

        if (user && await checkPassword(user.password, password)) {
            let id  = user.id

            if(id === uid){
                await User.findByIdAndUpdate(id, { status: false }, { new: true })
                return res.send(
                    { 
                        success: true,
                        message: 'Your account has been deleted'
                    }
                )
            }
        }

        return res.status(400).send({ message: 'Wrong email or password' })
        
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
};