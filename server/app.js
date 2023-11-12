const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socketIo = require("socket.io"); //socket.io
//bd
const postgres = require("postgres");
require("dotenv").config();

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// ROTAS

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/app.html");
});

app.get("/dados", (req, res) => {
    res.sendFile(__dirname + "/dados.json");
});
// PORT
const port = 5000;

server.listen(port, () => {
    console.log(`Server rodando na porta ${port}`);
});

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: "require",
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});

// COMANDOS SQL

async function inserirSQL(dados) {
    await sql`INSERT INTO mesas (id, ocupada, pago) VALUES (${dados.id}, ${dados.ocupada}, ${dados.pago})`;

    const updatedData = await consultaSQL();
    io.emit("exibeDados", updatedData);
}

async function consultaSQL() {
    const result = await sql`SELECT * FROM mesas`;
    return result;
}

// SOCKET

io.on("connection", async (socket) => {
    console.log(`Usuário conectado`);

    const dados = await consultaSQL();
    io.emit("exibeDados", dados);

    socket.on("envioForm", async (dados) => {
        await inserirSQL(dados);
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado`);
    });
});

//TESTE
