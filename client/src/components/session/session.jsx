import React, { useEffect, useState } from "react";
import "./session.css";
import paidIcon from "../../assets/Done.svg";
import { io } from "socket.io-client";

const server = require('../../connection-properties.json')
const socket = io(server.server);

function Session() {
    const [data, setData] = useState(null);

    useEffect(() => {
        socket.on("showData", (data) => {
            setData(data);
        });

        return () => {
            socket.off("dadosAtualizados");
        };
    }, []);

    return (
        // ANTIGA FORMA

        // <div className="session">
        //     <h1 className="title">Lista de mesas</h1>
        //     <div className="session-list">
        //     {dados.map(localSession => (
        //         <SessionItem key={localSession.id} list={localSession.id} ocupada={localSession.ocupada} pago={localSession.pago}/>
        //     ))}
        //     </div>
        // </div>

        // NOVA FORMA

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

    return (
        <div className="session-item" style={sessionItem}>
            <p>{list}</p>
            {pago && <img src={paidIcon} alt="Pago" style={badgeStyle} />}
        </div>
    );
}

export default Session;
