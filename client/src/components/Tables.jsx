// src/components/Tables.js
import { useEffect, useState } from "react";
import { Card, Col, Row, Modal, List, Skeleton, Button, InputNumber } from "antd";
import { useWebSocket } from "../webSocketContext";
import { CloseOutlined, EllipsisOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { cardStyles } from "../styles";

const { Meta } = Card;

const Tables = () => {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [orderModalOpen, setOrderModalOpen] = useState(false);
    const [menu, setMenu] = useState([]);
    const [orders, setOrders] = useState(null);
    const [totalOrdersValue, setTotalOrdersValue] = useState(0);
    const [selectedTable, setSelectedTable] = useState(null);

    const [selectedItems, setSelectedItems] = useState([]);

    const [quantities, setQuantities] = useState([0]);

    // Importa as funções de ws
    const {
        wsRefreshTablesData,
        wsSendTableIdForOrders,
        wsReceiveTableOrders,
        wsSendTableIdForTotalAmount,
        wsReceiveTableTotalAmountValue,
        wsDeleteTable,
        wsChangeTableStatus,
        wsRequestMenu,
        wsSendOrders,
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
        setSelectedTable({ id: table.tables_id, statusCode: table.tablestatus_code });
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

        wsRequestMenu((data) => {
            setMenu(data);
        });
    });

    // Lida com as ações quando clicar para fechar o modal
    const handleCancel = () => {
        // seta o estado do modal para true, fechando-o
        setModalOpen(false);
        setOrderModalOpen(false);
        // limpa o state dos pedidos
        setOrders([]);
        // limpa o state do valor total dos pedidos
        setTotalOrdersValue(0);
        setSelectedTable(null);
    };

    // Ação quando clicar no botão X dos cards
    const closeTableFunction = (table) => {
        // Verifica se o status da mesa é diferente de disponível. Se sim pode deletar, se não.. não....
        if (table.tablestatus_code !== "A") {
            console.log(
                "opaaa kkk calma la paizao implementa um outro status ai de Pago ou Fechado rsrsrs"
            );
        }
        // Envia o id da mesa do card clicado pro backend solicitando a remoção da mesa
        else {
            wsDeleteTable(table.tables_id);
        }
    };

    // Função para alterar o status da mesa
    const changeTableStatus = (newTableStatus) => {
        const tableId = selectedTable.id;
        // Envia o ID da mesa e o novo status para o backend
        wsChangeTableStatus(tableId, newTableStatus);

        // Atualiza o estado de tables para refletir a mudança
        const updatedTables = tables.map((table) => {
            if (table.tables_id === tableId) {
                return { ...table, tablestatus_code: newTableStatus };
            }
            return table;
        });
        setTables(updatedTables);

        setSelectedTable({ ...selectedTable, statusCode: newTableStatus });
    };

    const openMenuList = () => {
        setOrderModalOpen(true);
    };

    const handleChooseOrder = (menuItem) => {
        console.log(`Pedido escolhido: ${menuItem.menu_name}`);
        // setOrderLoading(false);

        if (selectedItems.includes(menuItem.menu_id)) {
            setSelectedItems(selectedItems.filter((item) => item !== menuItem.menu_id));
        } else {
            setSelectedItems([...selectedItems, menuItem.menu_id]);
        }
    };

    const handleSendOrders = () => {
        setOrderLoading(true);
        // Adiciona um atraso de 3 segundos
        // setTimeout(() => {
        //     setOrderLoading(false);
        // }, 2000);

        wsSendOrders(selectedTable.id, selectedItems);

        setSelectedItems([]);
        setOrderModalOpen(false);
    };

    return (
        <>
            <Row gutter={[22, 40]}>
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
                                      height: "46vh",
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
                                              closeTableFunction(table);
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
                                          title={
                                              table.tablestatus_code === "A"
                                                  ? "Disponível"
                                                  : "Ocupada"
                                          }
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
                                          {/* {table.tablestatus_code !== "A" ? (
                                              <Button
                                                  shape="circle"
                                                  size="large"
                                                  onClick={(e) => {
                                                      e.stopPropagation();
                                                      openMenuList();
                                                  }}
                                                  icon={<PlusOutlined />}
                                              />
                                          ) : null} */}
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
                {selectedTable && selectedTable.statusCode === "A" ? (
                    <>
                        <p>Mesa disponível</p>
                        <Button onClick={() => changeTableStatus("T")}>Ocupar</Button>
                    </>
                ) : orders && orders.length > 0 ? (
                    <>
                        <List
                            itemLayout="horizontal"
                            dataSource={orders}
                            renderItem={(order) => (
                                <List.Item key={order.order_id}>
                                    <List.Item.Meta
                                        title={`Pedido ${order.order_id}`}
                                        description={`Valor: R$${order.order_totalamount} - Horário: ${order.order_time}`}
                                    />
                                </List.Item>
                            )}
                        />

                        <p>Valor total dos pedidos: R${totalOrdersValue.total_orders_value}</p>
                        <Button onClick={() => changeTableStatus("A")}>Desocupar</Button>
                        <Button
                            shape="circle"
                            size="large"
                            onClick={openMenuList}
                            icon={<PlusOutlined />}
                        />
                    </>
                ) : (
                    <>
                        <p>Sem pedidos</p>
                        <Button onClick={() => changeTableStatus("A")}>Desocupar</Button>
                        <Button
                            shape="circle"
                            size="large"
                            onClick={openMenuList}
                            icon={<PlusOutlined />}
                        />
                    </>
                )}
            </Modal>

            <Modal
                title={`Selecionar pedido`}
                open={orderModalOpen}
                onCancel={handleCancel}
                footer={[
                    <div style={{ position: "sticky" }}>
                        <Button
                            shape="circle"
                            icon={<CheckOutlined hoverable />}
                            loading={orderLoading}
                            onClick={handleSendOrders}
                        />
                    </div>,
                ]}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={menu}
                    renderItem={(menuItem, index) => (
                        <List.Item
                            key={menuItem.menu_id}
                            actions={[
                                <InputNumber
                                    value={quantities[index]}
                                    onStep={setQuantities[index]}
                                    variant="filled"
                                    // onClick={handleChooseOrder(menuItem)}
                                />,
                            ]}
                        >
                            <List.Item.Meta
                                title={`${menuItem.menu_name}`}
                                description={`Valor: R$${menuItem.menu_price} - ID: ${menuItem.menu_id}`}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        </>
    );
};

export default Tables;
