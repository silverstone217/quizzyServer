"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newQuest = void 0;
const prisma_1 = require("../../db/prisma");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.newQuest = router.post('/newQuest', async (req, res) => {
    try {
        const { question, answer, type, category, level, choices } = req.body;
        if (!question || !category || !answer || !type || !level || !choices)
            return res.json({ error: true, message: "Missing data" });
        const isQuestExist = await prisma_1.prisma.quiz.findUnique({
            where: { question: question }
        });
        if (isQuestExist)
            return res.json({ error: true, message: "This question already exists!" });
        const newQuestion = await prisma_1.prisma.quiz.create({
            data: {
                question: question, answer: answer,
                type: type, category: category,
                level: level,
                choices: choices,
            }
        });
        if (!newQuestion)
            return res.json({ error: true, message: "Error creating new question" });
        const questions = await prisma_1.prisma.quiz.findUnique({
            where: { question: newQuestion.question },
            select: {
                answers: true,
                _count: true,
                answer: true,
                question: true,
                type: true,
                category: true,
                id: true,
                level: true,
                createdAt: true,
                choices: true,
            }
        });
        return res.json({ error: false, message: "Question created!", data: questions });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: true, message: err.message });
    }
});
