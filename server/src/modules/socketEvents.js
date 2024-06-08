import {
    selectTables,
    updateTableStatus,
    insertOrder,
    selectTableOrders,
    insertTable,
} from "./dbModule.js";

export const handleConnection = async (socket, io) => {
    refreshTablesData();

    async function refreshTablesData() {
        const updatedTablesData = await selectTables();
        io.emit("refreshTablesData", updatedTablesData);
    }

    socket.on("createTable", async () => {
        await insertTable();
        refreshTablesData();
    });

    // Recebe o ID da mesa, filtra e retorna o resultado
    socket.on("checkTableOrders", async (data) => {
        const tableId = data.tables_id;
        const updatedOrdersData = await selectTableOrders(tableId);
        io.emit("refreshTableOrders", updatedOrdersData);
    });

    socket.on("updateTableStatus", async (data) => {
        await updateTableStatus(data);
        refreshTablesData();
    });

    socket.on("createOrder", async (data) => {
        await insertOrder(data);
        refreshTablesData();
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado`);
    });
};
