import React, { useEffect, useState } from "react";
import "./Session.css";
import paidIcon from "../../assets/Done.svg";

import socketServer from "../../socket";

function Session() {
    const [data, setData] = useState(null);

    useEffect(() => {
        socketServer.on("showData", (data) => {
            setData(data);
        });

        return () => {
            socketServer.off("dadosAtualizados");
        };
    }, []);

    return (
        <div className="session">
            <h1 className="title">Lista de mesas</h1>
            <div className="session-list">
                {data &&
                    data.map((item) => (
                        <SessionItem
                            key={item.id}
                            list={item.id}
                            ocupada={item.taken}
                            pago={item.paid}
                        />
                    ))}
            </div>
        </div>
    );
}

function SessionItem({ list, ocupada, pago }) {
    const badgeStyle = {
        width: "15px",
        height: "15px",
        position: "absolute",
        top: 0,
        right: 0,
    };
    const sessionItem = { backgroundColor: ocupada ? "#EBE3D5" : "#B0A695" };

function deleteSession() {
    const confirmacao = window.confirm('Deseja remover esse item?');
    if (confirmacao) {
        socketServer.emit("deleteSession", list);
        console.log(list)
    } else {
        console.log("Não foi possível remover o item!")
    }
} 

    return (
        <div className="session-item" style={sessionItem} onClick={deleteSession}> 
            <p>{list}</p>
            {pago && <img src={paidIcon} alt="Pago" style={badgeStyle} />}
        </div>
    );
}

export default Session;
