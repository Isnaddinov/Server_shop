import { Request, Response } from "express";
import { Categories } from "../../types/types";
import { client } from "../../routers/Prismaclient";
import { validationResult } from "express-validator";

export async function getCategories(req: Request, res: Response) {
    try {
      const categories = await client.categories.findMany() 
    
        return res.status(200).json({message: "Categorie has got", categories})
    } catch (error) {
        res.status(400).json({message: "Error with get categories " + error})
    }   

}

export async function postCategories(req: Request, res: Response) {
    try {
        const errorsv = validationResult(req) 
        if(!errorsv.isEmpty()){
            const{errors} = Object(errorsv)
            const {msg} = errors[0]
            return res.status(400).json({message: msg})
        }
        const body:Categories = req.body
        const{name} = body
       const newCategory = await client.categories.create({data:{name: name}})   
        return res.status(200).json({message: "Categorie has writed", newCategory})

    } catch (error) {
        res.status(400).json({message: "Error with post categories " + error})
    }
}
export async function updateCategories(req: Request, res: Response) {

    try {
        const errorsv = validationResult(req) 
        if(!errorsv.isEmpty()){
            const{errors} = Object(errorsv)
            const {msg} = errors[0]
            return res.status(400).json({message: msg})
        }
        const id = +req.params.id
        const name = req.body.name
        
        const category = await client.categories.update({ where:{id:id},data:{name:name}})

        return res.status(200).json({message: "Categorie has updated", category})
    } catch (error) {
        res.status(400).json({message: "Error with update categories " + error})
    }

}
export async function deleteCategories(req: Request, res: Response) {
    try {
        const id = +req.params.id
        await client.categories.delete({ where:{id:id}})

        return res.status(200).json({message: "Categorie has deleted"})

    } catch (error) {
        res.status(400).json({message: "Error with delete categories " + error})
    }

}
