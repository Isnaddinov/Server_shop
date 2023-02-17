import { client } from './../routers/Prismaclient';

export async function findUserbyId(id: number) { 
    return await client.user.findUnique({ where: { id } }) 
}