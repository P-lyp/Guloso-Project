import React from "react";
import dados from "../assets/dados.json"

function Session() {
    return(
        <div>
            <h1>Lista de mesas</h1>
            {dados.map(item => (
                <SessionItem key={item.id} list={item.id} ocupada={item.ocupado}/>
            ))}
        </div>
    )

}

function SessionItem({list, ocupada}) {
    console.log(dados)
    return (
        <div>
            <p>{list}</p>
            <p>{ocupada}</p>
        </div>
    )
}

export default Session;
