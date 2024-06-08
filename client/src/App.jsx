import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Tables from "./Tables";

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
        <Layout style={{ Height: "100%" }}>
            <Header style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
                Guloso App
            </Header>
            <Layout style={{ Height: "100%" }}>
                <Sider
                    collapsed={collapsed}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    trigger={null}
                    style={{ height: "100%" }} 
                    >
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                label: 'Mesas',
                            },
                            {
                                key: '2',
                                label: 'Pedidos',
                            },
                            {
                                key: '3',
                                label: 'Relatórios',
                            },
                        ]}
                    />
                </Sider>
                <Content style={{ padding: "50px" }}>
                    <div className="site-layout-content">
                        <Tables /> {/* Passe o ID do restaurante desejado */}
                    </div>
                </Content>
            </Layout>
            <Footer style={{ textAlign: "center" }}>
                Restaurant Management ©2024
            </Footer>
        </Layout>
    );
};

export default App;
