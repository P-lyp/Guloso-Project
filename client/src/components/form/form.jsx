import React from "react";

function Form() {
    return(
        <div>
            <div className="container__input">
                <form action="" id="form">
                    <p>Id:</p>
                        <input
                            id="id"
                            autoComplete="off"
                            placeholder="Insira sua mensagem"
                            type="number"/>
                    <p>Ocupada:</p>
                    <input type="checkbox" id="ocupada" />
                    <p>Paga:</p>
                    <input type="checkbox" id="paga" />
                    <button type="submit">Enviar</button>
                </form>
            </div>
            <div id="lista"></div>
        </div>
        
    );
}

export default Form;