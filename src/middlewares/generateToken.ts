import jwt from 'jsonwebtoken'
import { sec } from './config';

export function generateAccessToken(id:number, role:string){
    const payload = {
        id,
        role
    }

    return jwt.sign(payload, sec.secret, {expiresIn: "24h"})   
}

// export function generateBasketidToken(basket_id:number){
//     const payload = {
//         basket_id
//     }
//     return jwt.sign(payload, sec.secret, {expiresIn: "24h"})   
// }

// export function generate_BsPrd_idToken(bsPrd_id:number){
//     const payload = {
//         bsPrd_id
//     }
//     return jwt.sign(payload, sec.secret, {expiresIn: "24h"})   
// }
