// src/components/Tables.js
import { useEffect, useState } from "react";
import { Card, Col, Row, Spin, Modal, List } from "antd";
import {
    wsRefreshTablesData,
    wsRefreshTableOrders,
    wsCheckTableOrders,
    wsDeteleTable,
} from "../socketEvents";
import { CloseOutlined } from "@ant-design/icons";

const { Meta } = Card;

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);

    useEffect(() => {
        const fetchTables = () => {
            wsRefreshTablesData((data) => {
                setTables(data);
                setLoading(false);
            });
        };
        fetchTables();
    });

    const fetchOrders = () => {
        wsRefreshTableOrders((data) => {
            setOrders(data);
            console.log(data);
        });
    };

    const handleCardClick = (table) => {
        wsCheckTableOrders(table);
        setOpen(true);
        fetchOrders();
        setSelectedTable();
    };

    const handleCancel = () => {
        setOpen(false);
        setOrders([]);
        setSelectedTable(null);
    };

    const closeTableFunction = (tableId) => {
        wsDeteleTable(tableId);
    };

    if (loading) {
        return <Spin />;
    }

    const headerStyle = (table) => ({ header:{backgroundColor: table.tables_available ?  '#306B34' : '#BF0603', color: '#EFF1F3' }})

    return (
        <>
            <Row gutter={[16, 16]}>
                {tables.map((table) => (
                    <Col
                        key={table.tables_id}
                        span={6}
                    >
                        <Card
                            title={
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{ fontSize: '24px' }}>{table.tables_id}</span>
                                </div>
                            }
                            onClick={() => handleCardClick(table)}
                            style={{ height: "300px", CardHeader: { backgroundColor: '#your-color-here' } }}
                            styles={headerStyle(table)}
                            hoverable={true}
                            extra={
                                <CloseOutlined
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        closeTableFunction(table.tables_id);
                                    }}
                                />
                            }
                        >

                            <Meta description={`Status: ${table.tables_available}`} />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title={`Pedidos da Mesa`}
                open={open}
                onCancel={handleCancel}
                footer={null}
            >
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
