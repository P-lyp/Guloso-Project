import React from "react";
import dados from "../../assets/dados.json";
import './session.css';
import paidIcon from '../../assets/Done.svg'

function Session() {
    console.table(dados)
    return(
        <div className="session">
            <h1 className="title">Lista de mesas</h1>
            <div className="session-list">
            {dados.map(localSession => (
                <SessionItem key={localSession.id} list={localSession.id} ocupada={localSession.ocupada} pago={localSession.pago}/>
            ))}
            </div>
        </div>
    )
}

function SessionItem({list, ocupada, pago}) {
    const badgeStyle = {width: '15px', height: '15px', position: 'absolute', top: 0, right: 0};

    const sessionItem = {backgroundColor: ocupada ? '#EBE3D5' : '#B0A695'}

    return (
        <div className="session-item" style={sessionItem}>
            <p>{list}</p>
            {pago && <img src={paidIcon} alt="Pago" style={badgeStyle} />}
        </div>
    )
}

export default Session;
