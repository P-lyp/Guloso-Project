import { Table } from "antd";

const Menu = () => {

    const column = [
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'Preço',
            dataIndex: 'preco',
            key: 'preco',
        },
    ];

    const dataSource = [
        {
            ID: '1',
            nome: 'Pao com lama',
            preco: 32,
        },
        {
            ID: '2',
            nome: 'Pao com lama',
            preco: 32,
        },
        {
            ID: '3',
            nome: 'Pao com lama',
            preco: 32,
        },
        {
            ID: '4',
            nome: 'Pao com lama',
            preco: 32,
        },
        {
            ID: '5',
            nome: 'Pao com lama',
            preco: 32,
        },
    ];
    return (
        <Table columns={column} dataSource={dataSource} />
)
}


export default Menu;



