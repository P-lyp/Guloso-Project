import React, { useState } from "react";
import { Layout, Menu, FloatButton } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';
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
        <Layout style={{ minHeight: "100vh" }}>
            <Header style={{ color: "white", fontSize: "24px", textAlign: "center" }}>
                Guloso App
            </Header>
            <Layout style={{ minHeight: "calc(100vh - 64px)" }}> {/* 64px é a altura do Header */}
                <Sider
                    collapsed={collapsed}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                // trigger={null}
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
                    <FloatButton type="primary" shape="circle" size="large" style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', width: '60px', height: '60px' }} 
                    icon={<PlusCircleOutlined />}
                    onClick={"kakakakakkakakakakak"}
                    />
                </Content>
            </Layout>
            <Footer theme="dark" style={{ textAlign: "center", position: "fixed", bottom: 0, width: "100%" }}>
                Restaurant Management ©2024
            </Footer>
        </Layout>
    );
};

export default App;
