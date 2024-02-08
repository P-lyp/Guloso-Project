import io from "socket.io-client";

const server = require("./connection-properties.json");
const socketServer = io(server["server-2"]);

export default socketServer;

// useEffect(() => {

//     socketServer.on("showData", (data) => {
//         console.table(data);
//     });

//     return () => {
//         socketServer.off("dadosAtualizados");
//     };
// }, []);
