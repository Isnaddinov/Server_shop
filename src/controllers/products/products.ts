import { Request, Response } from "express";
import { Products, Types} from "../../types/types"
import multer from "multer"
import { client } from "../../routers/Prismaclient";
import { validationResult } from "express-validator";


export async function getProductsbyTypeId(req: Request, res: Response) {
    try {
        //Elsatma! paramsda  type_id ni  baramiz
        const id = +req.params.id
      //TODO type ni barliqini tekshiradug'n funksiya qoyamiz
        if(id == undefined || null){
            res.status(404).json({message: "Products must be type_id"})}
        const products = await client.products.findMany({where:{typesId:id}})
      res.status(200).json({message: "Product has got", products})  
    } catch (error) {
     res.status(400).json({message: "Error with get product" + error})   
    }

}
export async function getProductbyId(req: Request, res: Response) {
    try {
        const id = +req.params.id
        if(id == undefined || null){ 
            res.status(200).json({message: "Products to basket must be product.id "})
        }
        const product = await client.products.findMany({where:{id:id}})
      res.status(200).json({message: "Product has got", product})  
    } catch (error) {
     res.status(400).json({message: "Error with getbyId product" + error})   
    }

}
// search qo'sh-----------------------------------------
export async function getSearchProduct(req: Request, res: Response) {
  try {
      //Elsatma! query zaprosda name dab yibaramiz  baramiz
      const {name} = req.query
      if(name == undefined || null){
          res.status(404).json({message: "Product has not"})}
      const products = await client.products.findMany({where:{name:String(name)}})
    res.status(200).json({message: "Product has got", products})  
  } catch (error) {
   res.status(400).json({message: "Error with get product" + error})   
  }

}
export async function postProducts(req: Request, res: Response) {
    try {
      const errorsv = validationResult(req) 
        if(!errorsv.isEmpty()){
            const{errors} = Object(errorsv)
            const {msg} = errors[0]
            return res.status(400).json({message: msg})
        }
        const body:Products = req.body
        const img = String(req.file?.path)
        if(img === null || undefined){res.status(400).json({message: "Must be product_img"})}
        const {name, price, desc,type_id} = body
       const newProduct =  await client.products.create({data:{name:name, img:img, price:Number(price), desc:desc, typesId:Number(type_id)}})

      res.status(200).json({message: "Product has writed", newProduct})  
    } catch (error) {
     res.status(400).json({message: "Error with write product" + error})   
    }
}

export async function updateProducts(req: Request, res: Response) {
    try { 
        const errorsv = validationResult(req) 
        if(!errorsv.isEmpty()){
            const{errors} = Object(errorsv)
            const {msg} = errors[0]
            return res.status(400).json({message: msg})
        }
        const id = +req.params.id
        const body:Products = req.body
        const img = String(req.file?.path)
        if(img === null || undefined){res.status(400).json({message: "Must be product_img"})}
        const{name, desc, price, type_id} = body
        if(type_id === undefined || null){
           const product = await client.products.update({where:{id:id}, data:{name:name,img:img, desc:desc, price:Number(price)}})
           res.status(200).json({message: "Product has updated", product})  
        }
        const product = await client.products.update({where:{id:id}, data:{name:name,img:img, desc:desc, price:Number(price), typesId:Number(type_id)}})
      res.status(200).json({message: "Product has updated", product})  
    } catch (error) {
     res.status(400).json({message: "Error with update product " + error})   
    }

}
export async function deleteProducts(req: Request, res: Response) {
    try {
        const id = +req.params.id
        const product =  await client.products.delete({where:{id:id}})
      res.status(200).json({message: "Product has deleted ", product})  
    } catch (error) {
     res.status(400).json({message: "Error with delete product" + error}) 
    }

}
export async function getAllProducts(req: Request, res: Response) {
  try {
    const allProducts = await client.products.findMany()
    res.status(200).json({message: "All products", allProducts})  
  } catch (error) {
   res.status(400).json({message: "Error with All products get " + error})   
  }

}


