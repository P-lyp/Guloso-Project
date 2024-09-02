import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from "react-router-dom";
import { layoutHeaderStyle, layoutFooterStyle } from "./styles";
import PageTables from "./pages/PageTables";
import PageMenu from "./pages/PageMenu";
import { MdTableRestaurant } from "react-icons/md";
import { IoRestaurant } from "react-icons/io5";
import { TbReportAnalytics } from "react-icons/tb";
import { BiFoodMenu } from "react-icons/bi";
import "./App.css";

import { contentStyles } from "./styles";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
    const [collapsed, setCollapsed] = useState(true);
    const location = useLocation(); // Aqui useLocation pode ser usado corretamente

    const handleMouseEnter = () => {
        setCollapsed(false);
    };
    const handleMouseLeave = () => {
        setCollapsed(true);
    };

    const iconStyle = {
        color: "#202332",
    };

    const menuItensList = [
        {
            key: "/",
            label: <Link to="/">Mesas</Link>,
            icon: <MdTableRestaurant style={iconStyle} />,
        },
        {
            key: "/orders",
            label: <Link to="/orders">Pedidos</Link>,
            icon: <IoRestaurant style={iconStyle} />,
        },
        {
            key: "/reports",
            label: <Link to="/reports">Relatórios</Link>,
            icon: <TbReportAnalytics style={iconStyle} />,
        },
        {
            key: "/menu",
            label: <Link to="/menu">Cardápio</Link>,
            icon: <BiFoodMenu style={iconStyle} />,
        },
    ];

    return (
        <Layout style={{ minHeight: "calc(100vh - 64px)" }}>
            <Sider
                className="sider"
                theme="light"
                collapsed={collapsed}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <Menu
                    className="menu"
                    mode="inline"
                    theme="light"
                    selectedKeys={[location.pathname]} // Define a seleção com base na rota atual
                    items={menuItensList}
                />
            </Sider>
            <Content style={contentStyles}>
                <Routes>
                    <Route exact path="/" element={<PageTables />} />
                    <Route exact path="/orders" element={<span>oii</span>} />
                    <Route exact path="/reports" element={<span>kkk</span>} />
                    <Route exact path="/menu" element={<PageMenu />} />
                </Routes>
            </Content>
        </Layout>
    );
};

const App = () => {
    return (
        <Router>
            <Layout style={{ minHeight: "100vh", backgroundColor: "#EFF1F3" }}>
                <Header style={layoutHeaderStyle}>Guloso Project</Header>
                <LayoutComponent />
                <Footer style={layoutFooterStyle}>Restaurant Management ©2024</Footer>
            </Layout>
        </Router>
    );
};

export default App;
