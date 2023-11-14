const express = require("express");
const http = require("http");
//
const socketIo = require("socket.io");
//
const config = require("./config");
const firebaseConfig = config.firebaseConfig;
//
const firebaseModule = require("./src/modules/firebaseModule");
firebaseModule.initializeFirebase(firebaseConfig);
//
const routes = require("./src/routes");
const { handleConnection } = require("./src/modules/socketEvents");
//
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const port = config.serverConfig.port;

app.use("/", routes);

io.on("connection", (socket) => {
    handleConnection(socket, io);
});

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});
