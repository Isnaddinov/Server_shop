import { Request, Response } from "express";
import { UserInfo } from "os";
import { User_info } from "../../types/types";
import jwt from 'jsonwebtoken'
import { sec } from "../../middlewares/config";
import { client } from "../../routers/Prismaclient";
import {validationResult} from "express-validator"

export async function getUser_info(req: Request, res: Response) {
    try {
        const user_info = await client.user_info.findMany()
        return res.status(200).json({message: "User_info got", user_info})

    } catch (error) {
        res.status(400).json({message: "Error with writing User_info " + error})
    }

}

export async function postUser_info(req: Request, res: Response) {
    try {
        const body:User_info = req.body
        const {name, surname, phone, viloyat, tuman, shahar, aniq_adress, umummiybahosi, product_id} = body
        const errorsv = validationResult(req) 
        if(!errorsv.isEmpty()){
            const{errors} = Object(errorsv)
            const {msg} = errors[0]
            return res.status(400).json({message: msg})
        }
        const newUser_info = await client.user_info.create({
        data:{name:name, surname:surname, phone:phone, viloyat:viloyat, tuman:tuman, shahar:shahar, aniq_adress:aniq_adress, umumiybahosi:umummiybahosi, product_id:product_id}})
        return res.status(200).json({message: "User_info writed ", newUser_info})
    } catch (error) {
        res.status(400).json({message: "Error with putting User_info " + error})
    }
}

export async function deleteUser_info(req: Request, res: Response) {
    try {
       
        const id:number = +req.params.id
       const user_info = await client.user_info.delete({where:{id:id}})    
        return res.status(200).json({message: "User_info deleted", user_info})
    } catch (error) {
        res.status(400).json({message: "Error with deletening User_info " + error})
    }
}
