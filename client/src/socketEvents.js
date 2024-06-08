import io from "socket.io-client";

const server = require("./connection-properties.json");
const socketServer = io(server["online"]);

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
