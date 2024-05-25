import express from "express";
import http from "http";
//
// const socketIo = require("socket.io");
import { Server } from "socket.io";
//
// const config = require("./config");
// const firebaseConfig = config.firebaseConfig;

//
// const firebaseModule = require("./src/modules/firebaseModule");
// firebaseModule.initializeFirebase(firebaseConfig);

//
import { router } from "./src/routes/routes.js";
import { handleConnection } from "./src/modules/socketEvents.js";
//
const app = express();
const server = http.createServer(app);

const io = Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const port = config.serverConfig.port;

app.use("/", router);

io.on("connection", (socket) => {
    handleConnection(socket, io);
});

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
