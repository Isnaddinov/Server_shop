import { Request, Response } from "express";
import { client } from "../../routers/Prismaclient";
import { Basket } from "../../types/types";
import jwt from 'jsonwebtoken'
import { sec } from "../../middlewares/config";
import { basketDelete, findBasketById, getByUserId, WriteBasket } from "../../services/basket.service";
import { findUserById } from "../../services/user.service";

export async function getBasket(req: Request, res: Response) {

    try {
        //Eslatma! frontend query zaprosda token  dab yibarganmiz
        const { token } = req.query
        const { id } = Object(jwt.verify(String(token), sec.secret))
        const user = findUserById(id)
        if(!user){return res.status(400).json({message: "User not found"})}
        const loginBasket = await getByUserId(id)
        return res.status(200).json({ message: "Basket getted ", loginBasket })
    } catch (error) {
        res.status(400).json({ message: "Error get basket" + error })
    }

}
export async function postBasket(req: Request, res: Response) {
    try {
        const body: Basket = req.body
        const { name, user_token } = body
        const { id } = Object(jwt.verify(String(user_token), sec.secret))
        const basket = await WriteBasket(name, id)
        return res.status(200).json({ message: "Basket writed ", basket })
    } catch (error) {
        res.status(400).json({ message: "Error post basket" + error })
    }
}

export async function deleteBasket(req: Request, res: Response) {
    try {
        const id = +req.params.id
        const findBasket = await findBasketById(id)
        if(!findBasket){return res.status(400).json({message: "Basket not found0"})}
        const basket = await basketDelete(id)
        res.status(200).json({ message: "Basket has deleted", basket })
    } catch (error) {
        res.status(400).json({ message: "Error with delete basket" + error })
    }
}