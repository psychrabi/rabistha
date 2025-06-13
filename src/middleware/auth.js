import { PrismaClient } from "@prisma/client"
import { verify } from "jsonwebtoken"
const prisma = new PrismaClient()

export const authenticate = async (req, res, next) => {
 if(!req.headers.authorization) {
    throw new Error('Unauthorized')
 }

 console.log(req.headers.authorization)
 const token = req.headers.authorization.split(' ')[1]
 if (!token){
    throw new Error("Token not found")
 }

 try {
    const decode = verify(token, "JWT_SECRET")
    console.log(decode)
    const admin = await prisma.admin.findUnique({
        where : {
            username: decode.username
        }
    });
    req.admin = admin ?? undefined
    next();
 } catch (err) {
    req.admin = undefined
    next()
    
 }
} 