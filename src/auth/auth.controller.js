import User from "../user/user.model.js"
import { checkPassword, encrypt } from "../../utils/encrypt.js"
import { generateJwt } from "../../utils/jwt.js"

export const test = (req, res) => {
    console.log('Test is running')
    return res.send({ message: 'Test is running' })
}

export const register = async (req, res) => {
    console.log('Register is running')
    try {
        let data = req.body

        let user = new User(data)

        user.password = await encrypt(user.password)

        await user.save()
        console.log('User registered successfully')
        return res.send({ message: `Registered successfully, can be logged with username: ${user.username} and role: ${user.role}` })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ message: 'General error with registering user', e })
    }
}

export const login = async (req, res) => {
    try {
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
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }

            let token = await generateJwt(loggedUser)

            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({ message: 'Wrong email or password' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'General error with login function' })
    }
}        