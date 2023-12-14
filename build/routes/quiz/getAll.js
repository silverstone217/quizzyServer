"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllQuest = void 0;
const prisma_1 = require("../../db/prisma");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.getAllQuest = router.get("/getAllQuest", async (req, res) => {
    try {
        const allQuest = await prisma_1.prisma.quiz.findMany({
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
        if (!allQuest)
            return res.json({ error: true, message: "No question avaiable!", data: [] });
        return res.json({ error: false, message: "Question find!", data: allQuest });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: true, message: err.message });
    }
});
