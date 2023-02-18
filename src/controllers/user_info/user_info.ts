import { Request, Response } from "express";
import { User_info } from "../../types/types";
import { client } from "../../routers/Prismaclient";
import {validationResult} from "express-validator"
import { findUser_infoById, removeUser_info, writeUser_info } from "../../services/user_info.service";

export async function getUser_infoById(req: Request, res: Response) {
    try {
        const id:number = +req.params.id
        const user_info = await findUser_infoById(id)
        if(!user_info){return res.status(400).json({message: "User_info not found By Id"})}
        return res.status(200).json({message: "User_info got", user_info})
    } catch (error) {
        res.status(400).json({message: "Error with writing User_info " + error})
    }
}

export async function postUser_info(req: Request, res: Response) {
    try {
        const body:User_info = req.body
        const {name, surname, phone, viloyat, tuman, shahar, aniq_adress, umummiybahosi} = body
        const errorsv = validationResult(req) 
        if(!errorsv.isEmpty()){
            const{errors} = Object(errorsv)
            const {msg} = errors[0]
            return res.status(400).json({message: msg})
        }
        const newUser_info = await writeUser_info(name, surname, phone, viloyat, tuman, shahar, aniq_adress, umummiybahosi)
        return res.status(200).json({message: "User_info writed ", newUser_info})
    } catch (error) {
        res.status(400).json({message: "Error with putting User_info " + error})
    }
}

export async function deleteUser_info(req: Request, res: Response) {
    try {
        const id:number = +req.params.id
        const finduser_info = await findUser_infoById(id)
        if(!finduser_info){return res.status(400).json({message: "User_info not found By Id"})}
       const user_info = await removeUser_info(id)    
        return res.status(200).json({message: "User_info deleted", user_info})
    } catch (error) {
        res.status(400).json({message: "Error with deletening User_info " + error})
    }
}
