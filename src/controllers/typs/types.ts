import { Request, Response } from "express";
import { Types} from "../../types/types"
import multer from "multer"
import { client } from "../../routers/Prismaclient";
import { validationResult } from "express-validator";
export async function getTypesbyCat_id(req: Request, res: Response) {
    try {
        //Eslatma! paramsda  categories_id ni yibaramiz
        const id= +req.params.id
        if(id == undefined){res.status(404).json({message: "Products not found or Uncategories_id"})}
        const types = await client.types.findMany({where:{categoriesId:id}})

      res.status(200).json({message: "Type has got", types})  
    } catch (error) {
     res.status(400).json({message: "Error with get type " + error})   
    }
}
export async function postTypes(req: Request, res: Response) {
    try {
      const errorsv = validationResult(req) 
        if(!errorsv.isEmpty()){
            const{errors} = Object(errorsv)
            const {msg} = errors[0]
            return res.status(400).json({message: msg})
        }
        const body:Types = req.body
        const img = String(req.file?.path)
        if(img == null){res.status(400).json({message: "Must be type_img"})}
        const {name, categories_id} = body
        //TODO Category ni qidiradug'n qoyish garak
        if(categories_id == null){
          res.status(400).json({message: "You must write categories_id "}) 
        }
       const newType =  await client.types.create({data:{name: name, img:img,categoriesId:Number(categories_id)}})
     res.status(200).json({message: "Type has writed", newType})   
    } catch (error) {
     res.status(400).json({message: "Error with write type " + error})   
    }
}
export async function updateTypes(req: Request, res: Response) {
    try {
      const errorsv = validationResult(req) 
      if(!errorsv.isEmpty()){
          const{errors} = Object(errorsv)
          const {msg} = errors[0]
          return res.status(400).json({message: msg})
      }
        const id = +req.params.id
        const body:Types = req.body
        const img = String(req.file?.path)
        if(img == null || undefined){res.status(400).json({message: "Must be type_img"})}
        const{name, categories_id} = body
        //TODO Category ni qidiradug'n qoyish garak
        if(categories_id == undefined || null){
         const type =  await client.types.update({where:{id:id}, data:{name:name, img:img}})
          res.status(200).json({message: "Type has updated ", type}) 
        }
        const type = await client.types.update({where:{id:id}, data:{name:name, img:img, categoriesId:Number(categories_id)}})
      res.status(200).json({message: "Type has updated ", type})  
    } catch (error) {
     res.status(400).json({message: "Error with update type " + error})   
    }

}
export async function deleteTypes(req: Request, res: Response) {
    try {
        const id = +req.params.id
        const type =  await client.types.delete({where:{id:id}})
      res.status(200).json({message: "Type has deleted" , type})  
    } catch (error) {
     res.status(400).json({message: "Error with delete type" + error})   
    }

}
export async function getAllTypes(req: Request, res: Response) {
    try {
      const allTypes = await client.types.findMany()
      res.status(200).json({message: "All types", allTypes})  
    } catch (error) {
     res.status(400).json({message: "Error with All types get" + error})   
    }

}

