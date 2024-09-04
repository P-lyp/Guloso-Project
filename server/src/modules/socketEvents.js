import {
    selectTables,
    updateTableStatus,
    insertOrder,
    selectTableOrders,
    insertTable,
    deleteTable,
    sumTableOrders,
    selectMenu,
    updateMenuItem,
} from "./dbModule.js";

export const handleConnection = async (socket, io) => {
    RefreshTablesData();
    refreshMenuData();

    // Consulta o banco de dados e retorna as mesas
    async function RefreshTablesData() {
        const updatedTablesData = await selectTables();

        io.emit("refreshTablesData", updatedTablesData);
    }

    async function refreshMenuData() {
        const updatedMenu = await selectMenu();
        io.emit("refreshMenuData", updatedMenu);
    }

    // Recebe id da mesa pelo WS, consulta o pedidos no BD e envia pelo WS
    socket.on("sendTableOrdersId", async (tableId) => {
        const updatedOrdersData = await selectTableOrders(tableId);
        io.emit("receiveTableOrders", updatedOrdersData);
    });

    // Recebe id da mesa, executa função no BD e envia o valor total dos pedidos da mesa pelo WS
    socket.on("sendTableIdForTotalAmount", async (tableId) => {
        const tableTotalAmountValue = await sumTableOrders(tableId);

        io.emit("receiveTableTotalAmountValue", tableTotalAmountValue);
    });

    // Cria uma mesa no BD
    socket.on("createTable", async () => {
        await insertTable();
        RefreshTablesData();
    });

    // Recebe o id da mesa e deleta no BD
    socket.on("deleteTable", async (data) => {
        const { tableId } = data;
        await deleteTable(tableId);
        RefreshTablesData();
    });

    // TO DO: ADICIONAR FUNÇAO NO FRONT
    // Define o status da mesa para available: false
    socket.on("changeTableStatus", async (tableId, newTableStatus) => {
        await updateTableStatus(tableId, newTableStatus);
    });

    // TO DO: ADICIONAR FUNÇAO NO FRONT
    // TO DO: FINALIZAR LOGICA PARA RECEBER ID DO CARDAPIO E DA MESA
    socket.on("sendOrders", async (tableId, menuIdArray) => {
        console.log(menuIdArray);
        await insertOrder(tableId, menuIdArray);
        RefreshTablesData();
    });

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado`);
    });

    // WIP
    // socket.on("sendMenuItem", async (menuItem) => {
    //     await insertMenuItem(menuItem);
    //     refreshMenuData();
    // });

    socket.on("updateMenuItem", async (menuItem) => {
        await updateMenuItem(menuItem);
        refreshMenuData();
    });
};
