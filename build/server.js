"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
require("dotenv/config");
const auth_1 = require("./routes/user/auth");
const changeImage_1 = require("./routes/user/changeImage");
const newQuiz_1 = require("./routes/quiz/newQuiz");
const getAll_1 = require("./routes/quiz/getAll");
const send_1 = require("./routes/answer/send");
const get_1 = require("./routes/answer/get");
const PORT = process.env.PORT || 3500;
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use(auth_1.SignUp);
app.use(auth_1.Login);
app.use(changeImage_1.changeImage);
app.use(newQuiz_1.newQuest);
app.use(getAll_1.getAllQuest);
app.use(send_1.sendAnswer);
app.use(get_1.getAnswerResult);
app.get('/', (req, res) => {
    res.send('<h1>Welcome, go and download our app!</h1>');
});
//database updated
io.on('connection', (socket) => {
    //console.log('Nouvelle connexion Socket.IO');
    // io.emit('databaseUpdate', 'Nouvelle connexion Socket.IO');
    // Écoutez l'événement de mise à jour de la base de données
    socket.on('databaseUpdate', (arg) => {
        io.emit('databaseUpdate', "liv3dd!");
    });
    socket.on('databaseLikedUpdate', (arg) => {
        io.emit('databaseLikedUpdate', "liked!!");
    });
});
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
