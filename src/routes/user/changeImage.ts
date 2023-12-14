import { prisma } from "../../db/prisma";
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

export const changeImage = router.post('/image', async(req, res)=>{
    try {
        const {email, image,} = req.body;

        if(!email  || !image) return res.json({ error:true, message: "Invalid email or password or missing any other data" });

        const isUserExist = await prisma.user.findUnique({
            where : { email : email}
        });
        if(!isUserExist) return res.json({error:true, message:"No user found!"});

        const newUser = await prisma.user.update({
            where : { email : email },
            data: {
                image : image
            }
        });

        if(!newUser) return res.json({error:true, message: "Error occurs when creating user!"});

        const token =  await jwt.sign(email, newUser.username);

        const { password:pwd, ...rest } = newUser;

        const user = {...rest, token}

        return res.status(201).json({error:false, message: "Photo updated!", data:user });

    } catch (error) {
        const err = error as Error;
        return res.status(500).json({error:true, message:err.message})
    }
}) 