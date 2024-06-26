import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { layoutHeaderStyle, layoutFooterStyle } from "./styles";
import PageTables from "./pages/PageTables";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { MdTableRestaurant } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { BiFoodMenu } from "react-icons/bi";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(true);
    const handleMouseEnter = () => {
        setCollapsed(false);
    };
    const handleMouseLeave = () => {
        setCollapsed(true);
    };

    const menuItensList = [
        {
            key: "1",
            label: <Link to="/">Mesas</Link>,
            icon: <MdTableRestaurant />
        },
        {
            key: "2",
            label: <Link to="/orders">Pedidos</Link>,
            icon: <IoRestaurant />
        },
        {
            key: "3",
            label: <Link to="/reports">Relatórios</Link>,
            icon: <TbReportAnalytics />
        },
        {
            key: "4",
            label: <Link to="/menu">Cardápio</Link>,
            icon: <BiFoodMenu />
        },
    ];

    return (
        <Router>
            <Layout style={{ minHeight: "100vh", backgroundColor: "#EFF1F3" }}>
                <Header style={layoutHeaderStyle}>Guloso Project</Header>
                <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
                    {" "}
                    <Sider
                        style={{ backgroundColor: "#202332" }}
                        collapsed={collapsed}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Menu
                            style={{ backgroundColor: "#202332" }}
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={["1"]}
                            items={menuItensList}
                        ></Menu>
                    </Sider>
                    <Content style={{ padding: "50px" }}>
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={<PageTables />}
                            />
                            <Route
                                exact
                                path="/orders"
                                element={<span>oii</span>}
                            />
                            <Route
                                exact
                                path="/reports"
                                element={<span>kkk</span>}
                            />
                            <Route
                                exact
                                path="/menu"
                                element={<span>oiiii</span>}
                            />
                        </Routes>
                    </Content>
                </Layout>
                <Footer style={layoutFooterStyle}>Restaurant Management ©2024</Footer>
            </Layout>
        </Router>
    );
};

export default App;
