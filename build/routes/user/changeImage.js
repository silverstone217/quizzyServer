"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeImage = void 0;
const prisma_1 = require("../../db/prisma");
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
exports.changeImage = router.post('/image', async (req, res) => {
    try {
        const { email, image, } = req.body;
        if (!email || !image)
            return res.json({ error: true, message: "Invalid email or password or missing any other data" });
        const isUserExist = await prisma_1.prisma.user.findUnique({
            where: { email: email }
        });
        if (!isUserExist)
            return res.json({ error: true, message: "No user found!" });
        const newUser = await prisma_1.prisma.user.update({
            where: { email: email },
            data: {
                image: image
            }
        });
        if (!newUser)
            return res.json({ error: true, message: "Error occurs when creating user!" });
        const token = await jsonwebtoken_1.default.sign(email, newUser.username);
        const { password: pwd, ...rest } = newUser;
        const user = { ...rest, token };
        return res.status(201).json({ error: false, message: "Photo updated!", data: user });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ error: true, message: err.message });
    }
});
