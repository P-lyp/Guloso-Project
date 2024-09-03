import { Table, Modal, Form, Input } from "antd";
import { useWebSocket } from "../webSocketContext";
import { useState, useEffect } from "react";

const Menu = () => {
    const { wsRequestMenu, wsInsertMenuItem } = useWebSocket();
    const [menu, setMenu] = useState([]);
    const [modalMenuOpen, setModalMenuOpen] = useState(false);
    const [recordRow, setRecordRow] = useState(null);
    const [formValues, setFormValues] = useState({
        menu_id: "",
        menu_name: "",
        menu_price: "",
    });

    useEffect(() => {
        wsRequestMenu((data) => {
            setMenu(data);
        });
    }, [wsRequestMenu]);

    useEffect(() => {
        if (recordRow) {
            setFormValues({
                menu_id: recordRow.menu_id,
                menu_name: recordRow.menu_name,
                menu_price: recordRow.menu_price,
            });
        }
    }, [recordRow]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const column = [
        {
            title: "ID",
            dataIndex: "menu_id",
            key: "menu_id",
        },
        {
            title: "Nome",
            dataIndex: "menu_name",
            key: "menu_name",
        },
        {
            title: "Preço",
            dataIndex: "menu_price",
            key: "menu_price",
        },
    ];

    return (
        <>
            <Table
                columns={column}
                dataSource={menu}
                rowKey="menu_id"
                size="large"
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setModalMenuOpen(true);
                            setRecordRow(record);
                        },
                    };
                }}
            />
            {recordRow && (
                <Modal
                    open={modalMenuOpen}
                    okText="Salvar"
                    onOk={() => setModalMenuOpen(false)}
                    onCancel={() => setModalMenuOpen(false)}
                    title={formValues.menu_name}
                    closable={false}
                >
                    <Form layout="vertical">
                        <Form.Item label="ID:">
                            <Input
                                disabled={true}
                                name="menu_id"
                                value={formValues.menu_id}
                            />
                        </Form.Item>
                        <Form.Item label="Nome:">
                            <Input
                                name="menu_name"
                                value={formValues.menu_name}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                        <Form.Item label="Preço:">
                            <Input
                                name="menu_price"
                                value={formValues.menu_price}
                                onChange={handleInputChange}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default Menu;
