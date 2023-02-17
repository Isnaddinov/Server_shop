import { client } from "../routers/Prismaclient";

export async function getbyUserId(id:number){
    try {
        const basket = await client.basket.findUnique({where:{userId:id}})
        const loginBasket = {name: basket?.name, user_id:basket?.userId}
        return loginBasket
    } catch (error) {
        console.error("Errro with service get basket " + error);}
}

export async function WriteBasket(name:string, id:number){
    try {
        const newBasket = await client.basket.create({ data:{name:name, userId:id}})
        const basketName = newBasket.name
        const basket = {name: newBasket.name }
        return basket
    } catch (error) {
        console.error("Errro with service write basket " + error);}
}
export async function basketDelete(id:number){
    try {
        return await client.basket.delete({where:{id:id}})
        
    } catch (error) {
        console.error("Errro with service write basket " + error);}
}
export async function findBasketbyId(id:number){
    return await client.basket.findUnique({where:{id}})
    
}
