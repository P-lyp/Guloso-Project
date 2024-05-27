import express from "express";
import http from "http";
//
import { Server } from "socket.io";
//
import { router } from "./src/routes/routes.js";
//
import { handleConnection } from "./src/modules/socketEvents.js";
import { serverConfig } from "./config.js";
//

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const port = serverConfig.port;

app.use("/", router);

io.on("connection", (socket) => {
    console.log("Usuário conectado");

    handleConnection(socket, io);
});

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
