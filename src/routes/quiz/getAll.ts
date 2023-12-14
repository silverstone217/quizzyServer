import { prisma } from "../../db/prisma";
import { Router } from "express";

const router = Router();

export const getAllQuest = router.get("/getAllQuest", async(req, res) => {

    try {
        const allQuest = await prisma.quiz.findMany({
            select: {
                answers: true,
                _count : true,
                answer: true,
                question :true,
                type: true,
                category: true,
                id:true,
                level:true,
                createdAt:true,
                choices:true,
            }
        });

        if(!allQuest)return res.json({error:true, message:"No question avaiable!", data:[]});

        return res.json({error:false, message:"Question find!", data:allQuest});
        
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({error:true, message:err.message})
    }
});