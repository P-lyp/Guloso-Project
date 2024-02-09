import { useEffect, useState } from "react";
import socketServer from "../../socket";

export default function DataList() {
    const [dataList, setDataList] = useState(null);

    useEffect(() => {
        socketServer.on("showData", (data) => {
            setDataList(data);
        });

        return () => {
            socketServer.off("dadosAtualizados");
        };
    }, []);

    return (
        <>
            {dataList &&
                dataList.map((item) => (
                    <p key={item.id}>
                        Id: {item.id} - Ocupada: {item.taken ? "Sim" : "Não"}, Pago:{" "}
                        {item.paid ? "Sim" : "Não"}
                    </p>
                ))}
        </>
    );
}
