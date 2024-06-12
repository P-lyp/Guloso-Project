import React from "react"
import Tables from "../components/Tables"
import { FloatButton } from "antd"
import { floatButtonStyle } from "../styles";
import { wsCreateTable } from "../socketEvents";
import { PlusCircleOutlined } from "@ant-design/icons";

const PageTables = () => {
    return (
        <div>
            <Tables />
            <FloatButton
                type="primary"
                shape="circle"
                size="large"
                style={floatButtonStyle}
                icon={<PlusCircleOutlined />}
                onClick={wsCreateTable}
            />
        </div>
    );
};

export default PageTables;