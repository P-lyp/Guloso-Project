import React, { useEffect, useState } from "react";

import socketServer from "../../socket";

import Input from "./Input/Input";

import "./form.css";

export default function Form() {
    const [inputId, setInputId] = useState("");
    const [inputOcupada, setInputOcupada] = useState(false);
    const [inputPaga, setInputPaga] = useState(false);

    // const [socket, setSocket] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        if (socketServer) {
            console.log({ inputId, inputOcupada, inputPaga });
            socketServer.emit("formData", { inputId, inputOcupada, inputPaga });

            setInputId("");
            setInputOcupada(false);
            setInputPaga(false);
        }
    }

    // useEffect(() => {
    //     const form = document.getElementById("form");
    //     const listaDados = document.getElementById("lista");

    //     form.addEventListener("submit", (e) => {
    //         e.preventDefault();

    //         const inputId = document.getElementById("id").valueAsNumber;
    //         const inputOcupada = document.getElementById("ocupada").checked;
    //         const inputPaga = document.getElementById("paga").checked;

    //         var data = { id: inputId, taken: inputOcupada, paid: inputPaga };

    //         socket.emit("formData", data);
    //     });

    //     socket.on("showData", (data) => {
    //         for (var i = 0; i < data.length; i++) {
    //             const tabela = document.createElement("p");
    //             tabela.textContent = `Id: ${data[i].id}, Ocupada: ${data[i].taken}, Pago: ${data[i].paid}`;
    //             listaDados.appendChild(tabela);
    //         }
    //     });
    // }, []);

    return (
        <div>
            <div className="container-form">
                <form id="form" onSubmit={handleSubmit}>
                    <Input
                        label="Id da mesa:"
                        inputType="number"
                        updateState={(value) => setInputId(value)}
                        inputFieldValue={inputId}
                    />
                    <Input
                        label="Ocupada:"
                        inputType="checkbox"
                        updateState={(value) => setInputOcupada(value)}
                        inputFieldValue={inputOcupada}
                    />
                    <Input
                        label="Paga:"
                        inputType="checkbox"
                        updateState={(value) => setInputPaga(value)}
                        inputFieldValue={inputPaga}
                    />
                    <Button>Enviar</Button>
                </form>
            </div>
        </div>
    );
}

function Button(props) {
    return <button type="submit">{props.children}</button>;
}
