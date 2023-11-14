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
const clientSessionCollection = db.collection("clientSession");
// ROTAS

const getDB = async () => {
    try {
        const snapshot = await clientSessionCollection
            .orderBy("id", "asc")
            .get();
        const clientSession = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: data.id,
                taken: data.taken,
                paid: data.paid,
            };
        });
        return clientSession;
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        throw error;
    }
};

const insertDB = async (data) => {
    try {
        await clientSessionCollection.add(data);

        const updatedData = await getDB();
        io.emit("showData", updatedData);
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        throw error;
    }
};

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app.html");
});

app.get("/data", async (req, res) => {
    const data = await getDB();
    res.send(data);
});

//CRIAR ROTA PARA DAR POST NO BANCO DE DADOS

// PORT
const port = 5000;

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});

// SOCKET

io.on("connection", async (socket) => {
    console.log(`Usuário conectado`);

    const initialData = await getDB();
    io.emit("showData", initialData);

    socket.on("formData", async (data) => {
        await insertDB(data);
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado`);
    });
});
