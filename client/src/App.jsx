import { Layout } from "antd";
import Tables from "./Tables";

const { Header, Content, Footer } = Layout;

const App = () => {
    return (
        <Layout>
            <Header>
                <div style={{ color: "white", fontSize: "24px" }}>Restaurant Management</div>
            </Header>
            <Content style={{ padding: "50px" }}>
                <div className="site-layout-content">
                    <Tables /> {/* Passe o ID do restaurante desejado */}
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>Restaurant Management ©2024</Footer>
        </Layout>
    );
};

export default App;

// import { useState, useEffect } from "react";
// import { Card, Modal, Button, Space } from "antd";

// import io from "socket.io-client";

// import "./App.css";

// const socketServer = io("localhost:5001");

// function App() {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [socketData, setSocketData] = useState("Sem dados");

//     const showModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleOk = () => {
//         setIsModalOpen(false);
//     };

//     useEffect(() => {
//         socketServer.on("refreshTablesData", (data) => {
//             setSocketData(data);
//         });
//         console.log(socketData);

//         return () => {
//             socketServer.off("refreshTablesData");
//         };
//     });

//     return (
//         <>
//             <div className="container">
//                 <Space size={20} wrap>
//                     <Modal
//                         title="Modal"
//                         open={isModalOpen}
//                         footer={[
//                             <Button key="fechar" onClick={handleOk} type="primary">
//                                 Fechar
//                             </Button>,
//                         ]}
//                     >
//                         <p>Isto é um modal</p>
//                     </Modal>

//                     <Card
//                         hoverable
//                         title="Este é um card"
//                         extra={<a href="#">+</a>}
//                         style={{ width: 300 }}
//                     >
//                         <p>Observação</p>
//                         <Button onClick={showModal}>Info</Button>
//                     </Card>

//                     <Card
//                         hoverable
//                         title="Este é um card"
//                         extra={<a href="#">+</a>}
//                         style={{ width: 300 }}
//                     >
//                         <p>Observação</p>
//                         <Button onClick={showModal}>Info</Button>
//                     </Card>
//                 </Space>
//             </div>
//         </>
//     );
// }

// export default App;
