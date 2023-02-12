import { Request, Response } from "express";
import { client } from "../../routers/Prismaclient";
import { Basket } from "../../types/types";
import jwt from 'jsonwebtoken'
import { sec } from "../../middlewares/config";
// import { generateBasketidToken } from "../../middlewares/generateToken";


export async function getBasket(req: Request, res: Response) {

    try {
        //Eslatma! frontend query zaprosda token va user_id dab yibarganmiz
        const {token} = req.query 
        const {id} = Object(jwt.verify(String(token), sec.secret))
        const basket = await client.basket.findFirst({where:{userId:id}})
        const loginBasket = {name: basket?.name, user_id:basket?.userId}
        return res.status(200).json({message: "Basket getted ",loginBasket})

    } catch (error) {
        res.status(400).json({message: "Error get basket" + error})
    }

}
export async function postBasket(req: Request, res: Response) {
    try {
        const body:Basket = req.body

    const{ name, user_token} = body
    const {id} = Object(jwt.verify(String(user_token), sec.secret))

    const newBasket = await client.basket.create({ data:{name:name, userId:id}})
    const basketName = newBasket.name
    const basket = {name: newBasket.name }
    return res.status(200).json({message: "Basket writed ", basket})

    } catch (error) {
        res.status(400).json({message: "Error post basket" + error})
    }
}

export async function deleteBasket(req: Request, res: Response) {
    try {
        const id = +req.params.id
        
       const basket =  await client.basket.delete({where:{id:id}})
      res.status(200).json({message: "Basket has deleted", basket})  
    } catch (error) {
     res.status(400).json({message: "Error with delete basket" + error})   
    }

}