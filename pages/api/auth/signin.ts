import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "prisma/prisma/prisma/node_modules/.prisma/client"; 
import bcrypt from "bcrypt"
import * as jose from "jose"
import { setCookie } from "cookies-next";
const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse
) {

    if(req.method ==="POST") {

        const {email, password } = req.body;
        const errors: string[] = [];

        const validateSchema = [
            {
                valid: validator.isEmail(email),
                errorMessage: "Invalid Email Address"
            },
            {
                valid: validator.isLength(password, {
                    min: 1,
                }),
                errorMessage: "Invalid Password"
            }
        ]

        validateSchema.forEach(check => {
            if(!check.valid) {
                errors.push(check.errorMessage)
            }
        })

        if(errors.length > 0) {
            return res.status(400).json({errorMessage: errors[0]})
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!currentUser) {
            return res.status(401).json({
                errorMessage: "Email or Password invalid"
            })
        }

        const isMatch = await bcrypt.compare(password, currentUser.password);

        if(!isMatch) {
            return res.status(401).json({
                errorMessage: "Email or Password invalid"
            })
        }

        const alg = "HS256"
        const secret = new TextEncoder().encode(process.env.SECRET)
        const token = await new jose.SignJWT({email: currentUser.email})
        .setProtectedHeader({alg})
        .setExpirationTime("24h")
        .sign(secret) 

        setCookie("jwt", token, {req, res, maxAge: 60 * 6 * 24})
        
           

        return res.status(200).json({
            firstName: currentUser.first_name,
            lastName: currentUser.last_name,
            email: currentUser.email,
            phone: currentUser.phone,
            city: currentUser.city,
        })
    }

    return res.status(404).json("Unknown endpoint")

}