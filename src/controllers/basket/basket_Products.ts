// import { Request, Response } from "express";
// import { client } from "../../routers/Prismaclient";
// import { Basket_products } from "../../types/types";
// import jwt from 'jsonwebtoken'
// import { sec } from "../../middlewares/config";
// import { generate_BsPrd_idToken } from "../../middlewares/generateToken";

// export async function getBasket_Poroducts(req: Request, res: Response) {
//     try {
//         const {product_id, basket_id_token} = req.query
     
//         const {basket_id} = Object(jwt.verify (String(basket_id_token), sec.secret))

//          const basket_products = await client.basket_products.findFirst({where:{basketId:basket_id}, include:{products:{where:{id:Number(product_id)}}}})
//          console.log(basket_products);
         
//          if(!basket_products){
//             res.status(400).json({ message: "Basket_product not found"})
//          }
//         //  user_info  basket_product_idsiga tashash uchun  
//          const token_bsPrd_id = generate_BsPrd_idToken(Number(basket_products?.id))
//          const basket_Products = {id: token_bsPrd_id, products:basket_products?.products}
//          const product = Array(basket_Products.products)[0]
//      return res.status(200).json({message: "Basket_Products got", basket_Products, product})
         
//     } catch (error) {
//         res.status(400).json({message:"Error with get basket_products " + error})
//     }

// }
// export async function postBasket_Products(req: Request, res: Response) {
//     try {
//         const body:Basket_products = req.body
//         const{basket_id_token} = body

//         const {basket_id} = Object(jwt.verify (basket_id_token, sec.secret))

//         const newbasket_product = await client.basket_products.create({data:{basketId:basket_id}})
       
//         //user_info  basket_product_idsiga tashash uchun  
//         const token_bsPrd_id = generate_BsPrd_idToken(newbasket_product.id)

//        return  res.status(200).json({message: "Basket_products writed", token_bsPrd_id})

//     } catch (error) {
//         res.status(400).json({message:"Error with post basket_products"})
//     }
// }