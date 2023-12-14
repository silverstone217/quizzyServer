import { prisma } from "../../db/prisma";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

const SignUp = router.post('/sign', async(req, res)=>{
    try {
        const {email, password, image, username} = req.body;

        if(!email || !username || !password || !image) return res.json({ error:true, message: "Invalid email or password or missing any other data" });

        const isUserExist = await prisma.user.findUnique({
            where : { email : email}
        });
        if(isUserExist) return res.json({error:true, message:"User with that email already exists!"});

        const isUserNameAvailable = await prisma.user.findUnique({
            where : { username : username}
        });

        if(isUserNameAvailable) return res.json({error:true, message:"User with that username already exists!"});

        const hachedPassword = await bcrypt.hash(password, 10);

        
        const newUser = await prisma.user.create({
            data : {
                email : email,
                password : hachedPassword,
                image : image,
                username : username
            }
        });

        if(!newUser) return res.json({error:true, message: "Error occurs when creating user!"});

        const token =  await jwt.sign(email, username);

        const { password:pwd, ...rest } = newUser;

        const user = {...rest, token}

        return res.status(201).json({error:false, message: "User created", data:user });

    } catch (error) {
        const err = error as Error;
        return res.status(500).json({error:true, message:err.message})
    }
}) 

const Login = router.post('/login', async(req, res)=>{
    try {
        const {email, password, } = req.body;
        if(!email || !password ) return res.json({ error:true, message: "Invalid email or password or missing any other data" });

        const isUserExist = await prisma.user.findUnique({
            where : { email : email}
        });
        if(!isUserExist) return res.json({error:true, message:"User with that email does not exist!"});

        const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password);
        if(!isPasswordCorrect) return res.json({error: true, message: "Password does not match with this email"});

        const token =  await jwt.sign(email, isUserExist.username);

        const { password:pwd, ...rest } = isUserExist;

        const user = {...rest, token}

        return res.status(200).json({error:false, message: "Login successfuly", data:user });

    } catch (error) {
        const err = error as Error;
        return res.status(500).json({error:true, message:err.message})
    }
});


export { Login, SignUp}