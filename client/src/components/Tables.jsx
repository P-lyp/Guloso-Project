// src/components/Tables.js
import { useEffect, useState } from "react";
import { Card, Col, Row, Modal, List, Skeleton, Button, InputNumber } from "antd";
import { useWebSocket } from "../webSocketContext";
import { CloseOutlined, EllipsisOutlined, PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { cardStyles } from "../styles";

import TableModal from "./TableModal";
import OrderModal from "./OrderModal";

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
        wsRefreshMenuData,
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

        wsRefreshMenuData((data) => {
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

    const tableStatusMap = {
        A: "Disponível",
        T: "Ocupada",
        O: "Pedido",
        P: "Pago",
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
                              xs={24}
                              sm={12}
                              md={8}
                              lg={6}
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
                                              tableStatusMap[table.tablestatus_code] || "Indefinido"
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
                                      </div>
                                  </div>
                              </Card>
                          </Col>
                      ))}
            </Row>

            <TableModal
                open={modalOpen}
                onCancel={handleCancel}
                selectedTable={selectedTable}
                orders={orders}
                totalOrdersValue={totalOrdersValue}
                changeTableStatus={changeTableStatus}
                openMenuList={openMenuList}
            />

            <OrderModal
                open={orderModalOpen}
                onCancel={handleCancel}
                menu={menu}
                quantities={quantities}
                setQuantities={setQuantities}
                orderLoading={orderLoading}
                handleSendOrders={handleSendOrders}
            />
        </>
    );
};

export default Tables;
