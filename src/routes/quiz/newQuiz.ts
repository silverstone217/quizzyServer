import { prisma } from "../../db/prisma";
import { Router } from "express";


const router = Router();

export const newQuest = router.post('/newQuest', async(req, res)=>{
    try {
        const {question, answer, type, category, level, choices} = req.body;

        if(!question || !category || !answer || !type || !level || !choices) return res.json({ error:true, message: "Missing data" });

        const isQuestExist = await prisma.quiz.findUnique({
            where : { question : question}
        });

        if(isQuestExist) return res.json({error:true, message:"This question already exists!"});

        const newQuestion = await prisma.quiz.create({
            data:
            {
                question: question, answer: answer, 
                type: type, category:category, 
                level: level,
                choices: choices,
            }
        })

        if(!newQuestion) return res.json({error:true, message : "Error creating new question"});


        const questions = await prisma.quiz.findUnique({
            where: { question: newQuestion.question},
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
                choices: true,
            }
        })

        return res.json({error:false, message:"Question created!", data:questions})

    } catch (error) {
        const err = error as Error;
        return res.status(500).json({error:true, message:err.message})
    }
}) 