import React, { useState } from "react";
import { Layout, Menu, FloatButton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import Tables from "./components/Tables";
import { wsCreateTable } from "./socketEvents";

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
            <Header style={{
                backgroundColor: '#202332', color: "white", fontSize: "24px", textAlign: "center", position: 'sticky',
                top: 0,
                zIndex: 1
            }}>
                Guloso App
            </Header>
            <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
                {" "}
                {/* 64px é a altura do Header */}
                <Sider
                    style={{ backgroundColor: '#202332' }}
                    collapsed={collapsed}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}

                // trigger={null}
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
                        style={{
                            backgroundColor: "#1890ff",
                            borderColor: "#1890ff",
                            width: "60px",
                            height: "60px",
                        }}
                        icon={<PlusCircleOutlined />}
                        onClick={wsCreateTable}
                    />
                </Content>
            </Layout>

            <Footer
                // footerBg={"#001529"}
                style={{ textAlign: "center", position: "fixed", bottom: 0, width: "100%", background: "#202332", color: "white" }}
            >
                Restaurant Management ©2024
            </Footer>
        </Layout>
    );
};

export default App;
