import {
    fetchTables,
    updateTableStatus,
    createOrder,
    fetchTableOrders,
    createTable,
} from "./dbModule.js";

export const handleConnection = async (socket, io) => {
    refreshTablesData();

    async function refreshTablesData() {
        const updatedTablesData = await fetchTables();
        io.emit("refreshTablesData", updatedTablesData);
    }

    socket.on("createTable", async () => {
        await createTable();
        refreshTablesData;
    });

    // Recebe o ID da mesa, filtra e retorna o resultado
    socket.on("checkTableOrders", async (data) => {
        const tableId = data.tables_id;
        const updatedOrdersData = await fetchTableOrders(tableId);
        io.emit("refreshTableOrders", updatedOrdersData);
    });

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
