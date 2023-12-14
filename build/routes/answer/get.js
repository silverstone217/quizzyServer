"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnswerResult = void 0;
const prisma_1 = require("../../db/prisma");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.getAnswerResult = router.get("/getAnswerResult", async (req, res) => {
    try {
        const allQuest = await prisma_1.prisma.answers.findMany({
            select: {
                answer: true,
                id: true,
                questId: true,
                quizId: true,
                quizz: true,
                userId: true,
            }
        });
        if (!allQuest)
            return res.json({ error: true, message: "No Answers avaiable!", data: [] });
        return res.json({ error: false, message: "Answers find!", data: allQuest });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: true, message: err.message });
    }
});
