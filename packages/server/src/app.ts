import express from 'express';
import socket from 'socket.io';
import { countWords } from './modules/countWords';


const app = express();
app.get('/', (req, res) => {
    res.send('hello');
})
const port = process.env.NODE_ENV === 'production' ? 8081 : 4000;

const server = app.listen(port, () => {
    console.log(`App is running at http://localhost:${port} in ${app.get("env")} mode`);
});

const io = socket(server);
io.origins('*:*')

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
