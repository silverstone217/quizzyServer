import cors from 'cors';
import express from 'express';
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import 'dotenv/config'
import { Login, SignUp } from './routes/user/auth';
import { changeImage } from './routes/user/changeImage';
import { newQuest } from './routes/quiz/newQuiz';
import { getAllQuest } from './routes/quiz/getAll';
import { sendAnswer } from './routes/answer/send';
import { getAnswerResult } from './routes/answer/get';

const PORT = process.env.PORT || 3500;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use(SignUp);
app.use(Login);
app.use(changeImage);
app.use(newQuest);
app.use(getAllQuest);
app.use(sendAnswer);
app.use(getAnswerResult);

app.get('/', (req, res) => {
  res.send('<h1>Welcome, go and download our app!</h1>');
});

//database updated
io.on('connection', (socket: Socket) => {
    //console.log('Nouvelle connexion Socket.IO');
    // io.emit('databaseUpdate', 'Nouvelle connexion Socket.IO');
    // Écoutez l'événement de mise à jour de la base de données
    socket.on('databaseUpdate', (arg: string) => {
      io.emit('databaseUpdate', "liv3dd!");
    });
    socket.on('databaseLikedUpdate', (arg: string) => {
      io.emit('databaseLikedUpdate', "liked!!");
    });
  });

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});