import React, { useEffect, useState } from "react";

import socketServer from "../../socket";

import Input from "./Input/Input";

import "./form.css";

export default function Form() {
    const [inputId, setInputId] = useState("");
    const [inputOcupada, setInputOcupada] = useState(false);
    const [inputPaga, setInputPaga] = useState(false);

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
