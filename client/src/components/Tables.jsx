// src/components/Tables.js
import { useEffect, useState } from "react";
import { Card, Col, Row, Spin, Modal, List, Skeleton } from "antd";
import { useWebSocket } from "../webSocketContext";
import { CloseOutlined } from "@ant-design/icons";
import { cardHeaderStyle } from "../styles";

const { Meta } = Card;

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [totalOrdersValue, setTotalOrdersValue] = useState(0);
    const [selectedTable, setSelectedTable] = useState(null);

    const {
        wsRefreshTablesData,
        wsSendTableIdForOrders,
        wsReceiveTableOrders,
        wsSendTableIdForTotalAmount,
        wsReceiveTableTotalAmountValue,
        wsDeleteTable,
    } = useWebSocket();

    useEffect(() => {
        const fetchTables = () => {
            wsRefreshTablesData((data) => {
                setTables(data);
                setLoading(false);
            });
        };

        fetchTables();
    }, [wsRefreshTablesData]);

    const fetchAndSetTableOrders = (tableId) => {
        wsSendTableIdForOrders(tableId);

        wsReceiveTableOrders((data) => {
            setOrders(data);
        });
    };

    const fetchAndSetTotalOrdersValue = (tableId) => {
        wsSendTableIdForTotalAmount(tableId);

        wsReceiveTableTotalAmountValue((data) => {
            setTotalOrdersValue(data);
        });
    };

    const handleCardClick = (table) => {
        setOpen(true);
        fetchAndSetTableOrders(table.tables_id);

        fetchAndSetTotalOrdersValue(table.tables_id);
        setSelectedTable();
    };

    const handleCancel = () => {
        setOpen(false);
        setOrders([]);
        setTotalOrdersValue(0);
        setSelectedTable(null);
    };

    const closeTableFunction = (tableId) => {
        wsDeleteTable(tableId);
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                          <Col
                              key={index}
                              span={6}
                          >
                              <Skeleton
                                  active
                                  title
                              >
                                  <Card loading />
                              </Skeleton>
                          </Col>
                      ))
                    : tables.map((table) => (
                          <Col
                              key={table.tables_id}
                              span={6}
                          >
                              <Card
                                  title={
                                      <div
                                          style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                          }}
                                      >
                                          <span style={{ fontSize: "24px" }}>
                                              {table.tables_id}
                                          </span>
                                      </div>
                                  }
                                  onClick={() => handleCardClick(table)}
                                  style={{
                                      height: "300px",
                                      CardHeader: { backgroundColor: "#your-color-here" },
                                  }}
                                  styles={cardHeaderStyle(table)}
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
                                description={`Valor: R$${order.order_totalamount} - Horário: ${order.order_time}`}
                            />
                        </List.Item>
                    )}
                />

                <p>Valor total dos pedidos: R${totalOrdersValue.total_orders_value}</p>
            </Modal>
        </>
    );
};

export default Tables;
