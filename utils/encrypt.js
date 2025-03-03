'use strict'
import { hash, verify } from "argon2"

//Encriptar 
export const encrypt = async(password)=>{
    try{
        return await hash(password)
    }catch(e){
        console.error(e)
        return err
    }
}

export const checkPassword = async(hash, password)=>{
    try{
        return await verify(hash, password)
    }catch(err){
        console.error(err)
        return err
    }
}