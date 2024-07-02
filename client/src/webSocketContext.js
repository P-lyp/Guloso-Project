import React, { createContext, useContext, useEffect, useState } from "react";

import io from "socket.io-client";

const server = require("./connection-properties.json");
const webSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketServer = io(server["online"]);

        // socketServer.on("connect", () => {
        //     console.log("WebSocket connected");
        // });

        // socketServer.on("disconnect", () => {
        //     console.log("WebSocket disconnected");
        // });

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

    // Envia o ID da mesa para o backend consultar os pedidos
    const wsSendTableIdForOrders = (tableId) => {
        socket?.emit("sendTableOrdersId", tableId);
    };

    // Recebe os pedidos das mesas
    const wsReceiveTableOrders = (callback) => {
        socket?.on("receiveTableOrders", callback);
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

    const wsChangeTableStatus = (tableId, newAvailableStatus) => {
        socket?.emit("changeTableStatus", tableId, newAvailableStatus);
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
            }}
        >
            {children}
        </webSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(webSocketContext);
