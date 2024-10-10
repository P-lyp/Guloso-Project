import React from "react";
import { Modal, List, Button, InputNumber } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const OrderModal = ({
    open,
    onCancel,
    menu,
    quantities,
    setQuantities,
    orderLoading,
    handleSendOrders,
}) => {
    return (
        <Modal
            title={`Selecionar pedido`}
            open={open}
            onCancel={onCancel}
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
    );
};

export default OrderModal;
