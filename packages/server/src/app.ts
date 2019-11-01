import express from 'express';
import socket from 'socket.io';
import { countWords } from './modules/countWords';

const port = 4000;

const app = express();

const server = app.listen(port, () => {
    console.log(`App is running at http://localhost:${port} in ${app.get("env")} mode`);
});

const io = socket(server);

io.on("connect", socket => {
    console.log("Связь с клиентом установлена, id:", socket.id);
    socket.on("countWords", data => {
        data.output = countWords(data.input);
        socket.emit("countWords", data);
    });
    socket.on("disconnect", () => {
        console.log("Связь с клиентом разорвана, id:", socket.id);
    });
});

export default app;
