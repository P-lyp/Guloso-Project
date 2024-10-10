import React from "react";
import { Modal, List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TableModal = ({
    open,
    onCancel,
    selectedTable,
    orders,
    totalOrdersValue,
    changeTableStatus,
    openMenuList,
}) => {
    const renderTableContent = () => {
        if (selectedTable && selectedTable.statusCode === "A") {
            return renderAvailableTable();
        }

        if (orders && orders.length > 0) {
            return renderOrdersList();
        }

        return renderNoOrders();
    };

    const renderAvailableTable = () => (
        <>
            <p>Mesa disponível</p>
            <Button onClick={() => changeTableStatus("T")}>Ocupar</Button>
        </>
    );

    const renderOrdersList = () => (
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
    );

    const renderNoOrders = () => (
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
    );

    return (
        <Modal
            title={`Dados da Mesa`}
            open={open}
            onCancel={onCancel}
            footer={null}
        >
            {renderTableContent()}
        </Modal>
    );
};

export default TableModal;
