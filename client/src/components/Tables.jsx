// src/components/Tables.js
import { useEffect, useState } from "react";
import { Card, Col, Row, Modal, List, Skeleton, Button } from "antd";
import { useWebSocket } from "../webSocketContext";
import { CloseOutlined, EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import { cardStyles } from "../styles";

const { Meta } = Card;

const Tables = () => {
    const [tables, setTables] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [orders, setOrders] = useState(null);
    const [totalOrdersValue, setTotalOrdersValue] = useState(0);
    const [selectedTable, setSelectedTable] = useState(null);

    // Importa as funções de ws
    const {
        wsRefreshTablesData,
        wsSendTableIdForOrders,
        wsReceiveTableOrders,
        wsSendTableIdForTotalAmount,
        wsReceiveTableTotalAmountValue,
        wsDeleteTable,
        wsChangeTableStatus,
    } = useWebSocket();

    const fetchTables = () => {
        wsRefreshTablesData((data) => {
            setTables(data);
            // Seta o loading como false para parar o loading
            setLoading(false);
        });
    };

    // Lida com as ações quando clicar em um card (mesa)
    const handleCardClick = (table) => {
        setSelectedTable({ id: table.tables_id, available: table.tables_available });
        // seta o estado do modal para true, exibindo-o
        setModalOpen(true);
    };

    useEffect(() => {
        fetchTables();

        if (selectedTable) {
            // Consultar pedidos de uma mesa
            const requestTableOrders = (tableId) => {
                // Envia o ID da mesa pro backend poder filtrar
                wsSendTableIdForOrders(tableId);

                // Recebe o resultado do backend e define o estado
                wsReceiveTableOrders((data) => {
                    setOrders(data);
                });
            };

            // Consulta valor total dos pedidos de uma mesa
            const requestTotalOrdersValue = (tableId) => {
                // Envia o ID da mesa pro backend poder filtrar
                wsSendTableIdForTotalAmount(tableId);

                // Recebe o resultado do backend e define o estado
                wsReceiveTableTotalAmountValue((data) => {
                    setTotalOrdersValue(data);
                });
            };
            //Envia o ID da mesa clicada e recebe os pedidos
            requestTableOrders(selectedTable.id);
            //Envia o ID da mesa clicada e recebe o total dos pedidos
            requestTotalOrdersValue(selectedTable.id);
        }
    });

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

    const changeTableStatus = () => {
        const newTableStatus = !selectedTable.available;
        wsChangeTableStatus(selectedTable.id, newTableStatus);
        setSelectedTable({ ...selectedTable, available: newTableStatus });

        // Atualiza o estado de tables para refletir a mudança
        const updatedTables = tables.map((table) => {
            if (table.tables_id === selectedTable.id) {
                return { ...table, tables_available: newTableStatus };
            }
            return table;
        });
        setTables(updatedTables);
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
                                      height: "44vh",
                                      backgroundColor: "#fff",
                                      border: "none",
                                      //   borderColor: "#575757",
                                      //   borderWidth: "0.4px",
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
                                              onClick={(e) => e.stopPropagation()}
                                              icon={<EllipsisOutlined />}
                                          />
                                          <Button
                                              shape="circle"
                                              size="large"
                                              onClick={(e) => e.stopPropagation()}
                                              icon={<PlusOutlined />}
                                          />
                                      </div>
                                  </div>
                              </Card>
                          </Col>
                      ))}
            </Row>

            <Modal
                title={`Dados da Mesa`}
                open={modalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {selectedTable && selectedTable.available ? (
                    <>
                        <p>Mesa disponível</p>
                        <Button onClick={() => changeTableStatus()}>Ocupar</Button>
                    </>
                ) : orders && orders.length > 0 ? (
                    <>
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
                        <Button onClick={() => changeTableStatus()}>Desocupar</Button>
                    </>
                ) : (
                    <>
                        <p>Sem pedidos</p>
                        <Button onClick={() => changeTableStatus()}>Desocupar</Button>
                    </>
                )}
            </Modal>
        </>
    );
};

export default Tables;
