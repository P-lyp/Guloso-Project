const socket = io("http://localhost:5000");

const form = document.getElementById("form");
const listaDados = document.getElementById("lista");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputId = document.getElementById("id").valueAsNumber;
    const inputOcupada = document.getElementById("ocupada").checked;
    const inputPaga = document.getElementById("paga").checked;

    var dados = { id: inputId, ocupada: inputOcupada, pago: inputPaga };
    console.log(dados);

    socket.emit("envioForm", dados);
});

socket.on("exibeDados", (dados) => {
    listaDados.innerHTML = "";

    for (var i = 0; i < dados.length; i++) {
        const tabela = document.createElement("p");
        tabela.textContent = `Id: ${dados[i].id}, Ocupada: ${dados[i].ocupada}, Pago: ${dados[i].pago}`;
        listaDados.appendChild(tabela);
    }
});
