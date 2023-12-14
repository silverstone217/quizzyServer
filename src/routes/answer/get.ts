import { prisma } from "../../db/prisma";
import { Router } from "express";

const router = Router();

export const getAnswerResult = router.get("/getAnswerResult", async(req, res) => {

    try {
        const allQuest = await prisma.answers.findMany({
            select: {
                answer:true,
                id:true,
                questId:true,
                quizId:true,
                quizz:true,
                userId:true,
            }
        });

        if(!allQuest)return res.json({error:true, message:"No Answers avaiable!", data:[]});

        return res.json({error:false, message:"Answers find!", data:allQuest});
        
    } catch (error) {
        const err = error as Error;
        return res.status(500).json({error:true, message:err.message})
    }
});