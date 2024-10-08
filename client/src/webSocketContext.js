import React, { createContext, useContext, useEffect, useState } from "react";

import io from "socket.io-client";

const server = require("./connection-properties.json");
const webSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketServer = io(server["local"]);

        setSocket(socketServer);

        return () => {
            socketServer.close();
        };
    }, []);

    //FUNÇÕES DO WS DO CLIENT DECLARADAS ABAIXO

    //Recebe os dados das mesas
    const wsRefreshTablesData = (callback) => {
        socket?.on("refreshTablesData", callback);
    };

    const wsRequestMenu = (callback) => {
        socket?.on("refreshMenuData", callback);
    };

    // Envia o ID da mesa para o backend consultar os pedidos
    const wsSendTableIdForOrders = (tableId) => {
        socket?.emit("sendTableOrdersId", tableId);
    };

    // Recebe os pedidos das mesas
    const wsReceiveTableOrders = (callback) => {
        socket?.on("receiveTableOrders", callback);
    };

    const wsSendOrders = (tableId, menuIdArray) => {
        socket?.emit("sendOrders", tableId, menuIdArray);
    };

    // Envia o ID da mesa para o backend consultar o valor total dos pedidos
    const wsSendTableIdForTotalAmount = (tableId) => {
        socket?.emit("sendTableIdForTotalAmount", tableId);
    };

    // Recebe o valor total dos pedidos da mesa
    const wsReceiveTableTotalAmountValue = (callback) => {
        socket?.on("receiveTableTotalAmountValue", callback);
    };

    // Solicita pro backend a criação de uma mesa
    const wsCreateTable = () => {
        socket?.emit("createTable");
    };

    // Solicita pro backend a remoção de uma mesa
    const wsDeleteTable = (tableId) => {
        socket?.emit("deleteTable", { tableId });
    };

    const wsChangeTableStatus = (tableId, newTableStatus) => {
        socket?.emit("changeTableStatus", tableId, newTableStatus);
    };

    return (
        <webSocketContext.Provider
            value={{
                wsRefreshTablesData,
                wsSendTableIdForOrders,
                wsReceiveTableOrders,
                wsSendTableIdForTotalAmount,
                wsReceiveTableTotalAmountValue,
                wsCreateTable,
                wsDeleteTable,
                wsChangeTableStatus,
                wsRequestMenu,
                wsSendOrders,
            }}
        >
            {children}
        </webSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(webSocketContext);
