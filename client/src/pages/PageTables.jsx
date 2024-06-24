import React from "react";
import Tables from "../components/Tables";
import { FloatButton } from "antd";
import { floatButtonStyle } from "../styles";

import { PlusCircleOutlined } from "@ant-design/icons";
import { WebSocketProvider, useWebSocket } from "../webSocketContext";

const PageTables = () => {
    return (
        <div>
            <WebSocketProvider>
                <Tables />
                <FloatButtonWrapper />
            </WebSocketProvider>
        </div>
    );
};

// FUNÇÃO NECESSÁRIA PARA PODER UTILIZAR O WS
const FloatButtonWrapper = () => {
    const { wsCreateTable } = useWebSocket();

    return (
        <FloatButton
            type="primary"
            shape="circle"
            size="large"
            style={floatButtonStyle}
            icon={<PlusCircleOutlined />}
            onClick={wsCreateTable}
        />
    );
};

export default PageTables;
