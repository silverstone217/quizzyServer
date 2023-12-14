"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAnswer = void 0;
const prisma_1 = require("../../db/prisma");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.sendAnswer = router.post('/sendAnswer', async (req, res) => {
    try {
        const { quizId, answer, userId, questId } = req.body;
        if (!quizId || !answer || !userId || !questId)
            return res.json({ error: true, message: "Missing data" });
        const isUserExist = await prisma_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!isUserExist)
            return res.json({ error: true, message: "User does not exist!" });
        const addAnswer = await prisma_1.prisma.answers.create({
            data: {
                quizId: quizId,
                userId: userId,
                answer: answer,
                questId: questId,
            }
        });
        if (!addAnswer)
            return res.json({ error: true, message: "Error adding answer" });
        return res.json({ error: false, message: "Answer send!", data: addAnswer });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: true, message: err.message });
    }
});
