import { client } from "../../routers/Prismaclient";
import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt'


export async function findUser(username:string) {
    try {
   const reuslt = await client.user.findFirst({ where:{ username:username} })

    return reuslt

    } 
    catch (error) {
    console.error('Error auth.user by username' + error);
    
    }
}
export async function postUser(name:string, username:string, password:string,role:string){

    const hashPassword = bcrypt.hashSync(password, 7);

    try {
      const writeUser = await client.user.create({
        data:{
            name: name,
            username:username,
            password: hashPassword,
            role: role
        },
      })
      return writeUser
    } catch (error) {
        console.error('Error writing user ' + error);
        
    }

}



