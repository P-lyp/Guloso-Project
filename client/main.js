const socket = io("http://localhost:5000");

const form = document.getElementById("form");
const dataListElement = document.getElementById("lista");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputId = document.getElementById("id").valueAsNumber;
    const inputOcupada = document.getElementById("ocupada").checked;
    const inputPaga = document.getElementById("paga").checked;

    var data = { id: inputId, ocupada: inputOcupada, pago: inputPaga };
    console.log(data);

    socket.emit("formData", data);
});

socket.on("exibedata", (data) => {
    dataListElement.innerHTML = "";

    for (var i = 0; i < data.length; i++) {
        const clientSession = document.createElement("p");
        clientSession.textContent = `Id: ${data[i].id}, Ocupada: ${data[i].ocupada}, Pago: ${data[i].pago}`;
        dataListElement.appendChild(clientSession);
    }
});
