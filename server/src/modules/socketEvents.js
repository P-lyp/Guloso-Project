const { getDB, insertDB } = require("./dbModule");

const handleConnection = async (socket, io) => {
    console.log("Usuário conectado");

    const initialData = await getDB();
    io.emit("showData", initialData);

    socket.on("formData", async (data) => {
        await insertDB(data);
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado`);
    });
};

module.exports = { handleConnection };
