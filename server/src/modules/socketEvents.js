import { getDB, insertDB, updateDB } from "./dbModule.js";

export const handleConnection = async (socket, io) => {
    async function refreshData() {
        const updatedData = await getDB();
        io.emit("showData", updatedData);
    }

    refreshData();

    console.log("Usuário conectado");

    socket.on("formData", async (data) => {
        console.log({ id: data.inputId, taken: data.inputOcupada, paid: data.inputPaga });
        await insertDB({ id: data.inputId, taken: data.inputOcupada, paid: data.inputPaga });
        refreshData();
    });

    socket.on("updateSession", async (data) => {
        await updateDB(data);
        refreshData();
    });

    // TODO: INVÉS DE IMPLEMENTAR UM DELETE, FAZER UM CLEAR NA SESSÃO PARA SIMULAR QUE UMA MESA FOI ESVAZIADA
    socket.on("deleteSession", async (data) => {
        await updateDB(data);
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado`);
    });
};
