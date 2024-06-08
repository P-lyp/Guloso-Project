// src/components/Tables.js
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Card, Col, Row, Spin, Modal, List } from "antd";

const socketServer = io("localhost:5001");
// const socketServer = io("https://guloso-server-alpha-1-2.onrender.com");


const { Meta } = Card;

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        const fetchTables = async () => {
            socketServer.on("refreshTablesData", (data) => {
                setTables(data);

                setLoading(false);
            });
        };

        fetchTables();
    });

    const fetchOrders = async () => {
        socketServer.on("refreshTableOrders", (data) => {
            console.log(data);
            setOrders(data);
        });
        setOpen(true);
    };

    const handleCardClick = (table) => {
        socketServer.emit("checkTableOrders", table);
        fetchOrders();
        setSelectedTable();
    };

    const handleCancel = () => {
        setOpen(false);
        setOrders([]);
        setSelectedTable(null);
    };

    if (loading) {
        return <Spin />;
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                {tables.map((table) => (
                    <Col key={table.tables_id} span={12}>
                        <Card
                            title={`Mesa ${table.tables_id}`}
                            bordered={false}
                            onClick={() => handleCardClick(table)}
                            style={{ cursor: "pointer" }}
                        >
                            <Meta description={`Status: ${table.tables_available}`} />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal title={`Pedidos da Mesa`} open={open} onCancel={handleCancel} footer={null}>
                <List
                    itemLayout="horizontal"
                    dataSource={orders}
                    renderItem={(order) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`Pedido ${order.order_id}`}
                                description={`Total: R$${order.order_totalamount} - Horário: ${order.order_time}`}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default Tables;
