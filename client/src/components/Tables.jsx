// src/components/Tables.js
import { useEffect, useState } from "react";
import { Card, Col, Row, Modal, List, Skeleton, Button, Flex } from "antd";
import { useWebSocket } from "../webSocketContext";
import { CloseOutlined, EllipsisOutlined } from "@ant-design/icons";
import { cardStyles } from "../styles";

const { Meta } = Card;

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [totalOrdersValue, setTotalOrdersValue] = useState(0);

    // IN PROGESS
    const [tableAvailable, setTableAvailable] = useState(true);
    const [selectedTable, setSelectedTable] = useState(null);

    // Importa as funções de ws
    const {
        wsRefreshTablesData,
        wsSendTableIdForOrders,
        wsReceiveTableOrders,
        wsSendTableIdForTotalAmount,
        wsReceiveTableTotalAmountValue,
        wsDeleteTable,
    } = useWebSocket();

    useEffect(() => {
        // Consulta as mesas
        const fetchTables = () => {
            wsRefreshTablesData((data) => {
                setTables(data);
                // Seta o loading como false para parar o loading
                setLoading(false);
            });
        };

        fetchTables();
    }, [wsRefreshTablesData]);

    // Consultar pedidos de uma mesa
    const fetchAndSetTableOrders = (tableId) => {
        // Envia o ID da mesa pro backend poder filtrar
        wsSendTableIdForOrders(tableId);

        // Recebe o resultado do backend e define o estado
        wsReceiveTableOrders((data) => {
            setOrders(data);
        });
    };

    // Consulta valor total dos pedidos de uma mesa
    const fetchAndSetTotalOrdersValue = (tableId) => {
        // Envia o ID da mesa pro backend poder filtrar
        wsSendTableIdForTotalAmount(tableId);

        // Recebe o resultado do backend e define o estado
        wsReceiveTableTotalAmountValue((data) => {
            setTotalOrdersValue(data);
        });
    };

    // Lida com as ações quando clicar em um card (mesa)
    const handleCardClick = (table) => {
        // seta o estado do modal para true, exibindo-o
        setModalOpen(true);
        //Envia o ID da mesa clicada e recebe os pedidos
        fetchAndSetTableOrders(table.tables_id);
        //Envia o ID da mesa clicada e recebe o total dos pedidos
        fetchAndSetTotalOrdersValue(table.tables_id);
        setSelectedTable();
    };

    // Lida com as ações quando clicar para fechar o modal
    const handleCancel = () => {
        // seta o estado do modal para true, fechando-o
        setModalOpen(false);
        // limpa o state dos pedidos
        setOrders([]);
        // limpa o state do valor total dos pedidos
        setTotalOrdersValue(0);
        setSelectedTable(null);
    };

    // Ação quando clicar no botão X dos cards
    const closeTableFunction = (tableId) => {
        // Envia o id da mesa do card clicado pro backend solicitando a remoção da mesa
        wsDeleteTable(tableId);
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                {/* SE LOADING FOR TRUE, CARREGA OS COMPONENTES DO SKELETON */}
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
                    : //   QUANDO FINALIZAR O LOADING, RENDERIZA NORMALMENTE
                      tables.map((table) => (
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
                                      height: "48vh",
                                      backgroundColor: "#fff",
                                      //   borderColor: "#575757",
                                      //   borderWidth: "0.2px",
                                  }}
                                  styles={cardStyles(table)}
                                  hoverable={true}
                                  bordered={false}
                                  extra={
                                      <CloseOutlined
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              closeTableFunction(table.tables_id);
                                          }}
                                      />
                                  }
                              >
                                  <div
                                      style={{
                                          display: "flex",
                                          height: "100%",

                                          flexDirection: "column",
                                          justifyContent: "space-between",
                                      }}
                                  >
                                      <Meta
                                          style={{ display: "flex" }}
                                          title={table.tables_available ? "Disponível" : "Ocupada"}
                                      />
                                      <div
                                          style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              alignItems: "center",
                                              justifyContent: "space-between",
                                              width: "100%",
                                          }}
                                      >
                                          <Button
                                              shape="circle"
                                              icon={<EllipsisOutlined />}
                                          />
                                      </div>
                                  </div>
                              </Card>
                          </Col>
                      ))}
            </Row>

            <Modal
                title={`Pedidos da Mesa`}
                open={modalOpen}
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
