import React, { useState } from "react";
import { Layout, Menu, FloatButton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Tables from "./components/Tables";
import { wsCreateTable } from "./socketEvents";
import { layoutHeaderStyle, floatButtonStyle, layoutFooterStyle } from "./styles";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {

    const [collapsed, setCollapsed] = useState(true);
    const handleMouseEnter = () => {
        setCollapsed(false);
    };
    const handleMouseLeave = () => {
        setCollapsed(true);
    };

    return (
        <Layout style={{ minHeight: "100vh", backgroundColor: '#EFF1F3' }}>
            <Header style={layoutHeaderStyle}>
                Guloso Project
            </Header>
            <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
                {" "}
                <Sider
                    style={{ backgroundColor: '#202332' }}
                    collapsed={collapsed}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}

                >
                    <Menu
                        style={{ backgroundColor: '#202332' }}
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        items={[
                            {
                                key: "1",
                                label: "Mesas",
                            },
                            {
                                key: "2",
                                label: "Pedidos",
                            },
                            {
                                key: "3",
                                label: "Relatórios",
                            },
                        ]}
                    />
                </Sider>
                <Content style={{ padding: "50px" }}>
                    <div className="site-layout-content">
                        <Tables /> {/* Passe o ID do restaurante desejado */}
                    </div>
                    <FloatButton
                        type="primary"
                        shape="circle"
                        size="large"
                        style={floatButtonStyle}
                        icon={<PlusCircleOutlined />}
                        onClick={wsCreateTable}
                    />
                </Content>
            </Layout>
            <Footer
                style={layoutFooterStyle}
            >
                Restaurant Management ©2024
            </Footer>
        </Layout>
    );
};

export default App;
