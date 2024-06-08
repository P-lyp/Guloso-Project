import io from "socket.io-client";

const server = require("./connection-properties.json");
const socketServer = io(server["local"]);

export const wsRefreshTablesData = async (callback) => {
    socketServer.on("refreshTablesData", (data) => {
        callback(data);
    });
};

export const wsRefreshTableOrders = async (callback) => {
    socketServer.on("refreshTableOrders", (data) => {
        callback(data);
    });
};

export const wsCheckTableOrders = async (table) => {
    socketServer.emit("checkTableOrders", table);
};

export const wsCreateTable = async () => {
    socketServer.emit("createTable");
};

export const wsDeteleTable = async (tableId) => {
    socketServer.emit("deleteTable", { tableId });
};
