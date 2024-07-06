import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { layoutHeaderStyle, layoutFooterStyle } from "./styles";
import PageTables from "./pages/PageTables";
import PageMenu from "./pages/PageMenu";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { MdTableRestaurant } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { BiFoodMenu } from "react-icons/bi";
import "./App.css";

import { contentStyles } from "./styles";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(true);
    const handleMouseEnter = () => {
        setCollapsed(false);
    };
    const handleMouseLeave = () => {
        setCollapsed(true);
    };

    const iconStyle = {
        // borderRadius: "50%",
        color: "#202332",
        // fontSize: "30px",
    };

    const menuItensList = [
        {
            key: "1",
            label: <Link to="/">Mesas</Link>,
            icon: <MdTableRestaurant style={iconStyle} />,
        },
        {
            key: "2",
            label: <Link to="/orders">Pedidos</Link>,
            icon: <IoRestaurant style={iconStyle} />,
        },
        {
            key: "3",
            label: <Link to="/reports">Relatórios</Link>,
            icon: <TbReportAnalytics style={iconStyle} />,
        },
        {
            key: "4",
            label: <Link to="/menu">Cardápio</Link>,
            icon: <BiFoodMenu style={iconStyle} />,
        },
    ];

    return (
        <Router>
            <Layout style={{ minHeight: "100vh", backgroundColor: "#EFF1F3" }}>
                <Header style={layoutHeaderStyle}>Guloso Project</Header>
                <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
                    <Sider
                        className="sider"
                        style={{}}
                        theme="light"
                        collapsed={collapsed}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Menu
                            className="menu"
                            mode="inline"
                            theme="light"
                            defaultSelectedKeys={["1"]}
                            items={menuItensList}
                        ></Menu>
                    </Sider>
                    <Content style={contentStyles}>
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
                                element={<PageMenu />}
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
