import io from "socket.io-client";

const server = require("./connection-properties.json");
const socketServer = io(server["online"]);

//Recebe os dados das mesas
export const wsRefreshTablesData = async (callback) => {
    socketServer.on("refreshTablesData", (data) => {
        callback(data);
    });
};

// Envia o ID da mesa para o backend consultar os pedidos
export const wsSendTableIdForOrders = async (tableId) => {
    socketServer.emit("sendTableOrdersId", tableId);
};

// Recebe os pedidos das mesas
export const wsReceiveTableOrders = async (callback) => {
    socketServer.on("receiveTableOrders", (data) => {
        callback(data);
    });
};

// Envia o ID da mesa para o backend consultar o valor total dos pedidos
export const wsSendTableIdForTotalAmount = async (tableId) => {
    socketServer.emit("sendTableIdForTotalAmount", tableId);
};

// Recebe o valor total dos pedidos da mesa
export const wsReceiveTableTotalAmountValue = async (callback) => {
    socketServer.on("receiveTableTotalAmountValue", (data) => {
        callback(data);
    });
};

// Solicita pro backend a criação de uma mesa
export const wsCreateTable = async () => {
    socketServer.emit("createTable");
};

// Solicita pro backend a remoção de uma mesa
export const wsDeteleTable = async (tableId) => {
    socketServer.emit("deleteTable", { tableId });
};
