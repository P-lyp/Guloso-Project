const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io"); //socket.io
//bd
const firebase = require("firebase");

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const firebaseConfig = {
    apiKey: "AIzaSyBPecOTsP6waFGBmZije0LA7Hk2enyo4OI",
    authDomain: "guloso-85b45.firebaseapp.com",
    projectId: "guloso-85b45",
    storageBucket: "guloso-85b45.appspot.com",
    messagingSenderId: "196006565625",
    appId: "1:196006565625:web:3e68f2b3ccf95f06347428",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const clientSession = db.collection("clientSession");
// ROTAS

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app.html");
});

app.get("/data", async (req, res) => {
    const snapshot = await clientSession.get();
    clientSession = snapshot.docs.map((doc) => ({
        id: doc.id,
        taken: doc.taken,
        paid: doc.paid,
    }));
    res.send(clientSession);
});
// PORT
const port = 5000;

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});

// SOCKET

io.on("connection", async (socket) => {
    console.log(`Usuário conectado`);

    const data = await querySQL();
    io.emit("showData", data);

    socket.on("formData", async (data) => {
        await insertSQL(data);
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado`);
    });
});

//TESTE
