import { Table } from "antd";
import { useWebSocket } from "../webSocketContext";
import { useState } from "react";

const Menu = () => {
    const [menuData, setMenuData] = useState();

    const wsRequestMenu = useWebSocket();

    wsRequestMenu((data) => {
        setMenuData(menuData);
        console.log(data);
    });

    const column = [
        {
            title: "ID",
            dataIndex: "ID",
            key: "ID",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
        },
        {
            title: "Preço",
            dataIndex: "preco",
            key: "preco",
        },
    ];

    const dataSource = [
        {
            ID: "1",
            nome: "Pao com lama",
            preco: 32,
        },
        {
            ID: "2",
            nome: "Pao com lama",
            preco: 32,
        },
        {
            ID: "3",
            nome: "Pao com lama",
            preco: 32,
        },
        {
            ID: "4",
            nome: "Pao com lama",
            preco: 32,
        },
        {
            ID: "5",
            nome: "Pao com lama",
            preco: 32,
        },
    ];
    return (
        <Table
            columns={column}
            dataSource={dataSource}
        />
    );
};

export default Menu;
