import React from "react";
import Menu from "../components/Menu";
import { WebSocketProvider } from "../webSocketContext";

const PageMenu = () => {
    return (
        <div>
            <WebSocketProvider>
                <Menu />
            </WebSocketProvider>
        </div>
    );
};

export default PageMenu;