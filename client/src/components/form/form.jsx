import React, { useEffect } from "react";
import io from "socket.io-client";

function Form() {
    const socket = io("http://localhost:5000");
  
    useEffect(() => {
      const form = document.getElementById("form");
      const listaDados = document.getElementById("lista");
  
      form.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const inputId = document.getElementById("id").valueAsNumber;
        const inputOcupada = document.getElementById("ocupada").checked;
        const inputPaga = document.getElementById("paga").checked;
  
        var data = { id: inputId, taken: inputOcupada, paid: inputPaga };
  
        socket.emit("formData", data);
      });
  
      socket.on("showData", (data) => {
        listaDados.innerHTML = "";
  
        for (var i = 0; i < data.length; i++) {
          const tabela = document.createElement("p");
          tabela.textContent = `Id: ${data[i].id}, Ocupada: ${data[i].taken}, Pago: ${data[i].paid}`;
          listaDados.appendChild(tabela);
        }});}, []);


    return(
        
        <div>
            <div className="container__input">
                <form id="form">
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