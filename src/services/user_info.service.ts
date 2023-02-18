import { client } from './../routers/Prismaclient';

export async function findUser_infoById(id:number){
    try {
        return await client.user_info.findUnique({where:{id:id}})
    } catch (error) {
        console.error("Error findUser_info service " + error);}
}
export async function writeUser_info(name:string, surname:string, phone:string, viloyat:string, 
    tuman:string, shahar:string, aniq_adress:string, umummiybahosi:number){
    try {
        return await client.user_info.create({data:{name:name, surname:surname, phone:phone,viloyat:viloyat,
        tuman:tuman, shahar:shahar, aniq_adress:aniq_adress, umumiybahosi:umummiybahosi}})
    } catch (error) {
        console.error("Error write User_info service " + error);}
}
export async function removeUser_info(id:number){
    try {
      return await  client.user_info.delete({where:{id:id}})
    } catch (error) {
        console.error("Error remove User_info service " + error)}
}