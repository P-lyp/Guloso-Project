import { fetchTables, updateTableStatus, createOrder } from "./dbModule.js";

export const handleConnection = async (socket, io) => {
    refreshTablesData();

    async function refreshTablesData() {
        const updatedTablesData = await fetchTables();
        io.emit("refreshTablesData", updatedTablesData);
    }

    socket.on("updateTableStatus", async (data) => {
        await updateTableStatus(data);
        refreshTablesData();
    });

    socket.on("createOrder", async (data) => {
        await createOrder(data);
        refreshTablesData();
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado`);
    });
};
