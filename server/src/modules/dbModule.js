const firebase = require("firebase");

const db = firebase.firestore();
const clientSessionCollection = db.collection("clientSession");

const getDB = async () => {
    try {
        const snapshot = await clientSessionCollection
            .orderBy("id", "asc")
            .get();
        const clientSession = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: data.id,
                taken: data.taken,
                paid: data.paid,
            };
        });
        return clientSession;
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        throw error;
    }
};

const insertDB = async (data) => {
    try {
        await clientSessionCollection.add(data);
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        throw error;
    }
};

const updateDB = async (data) => {
    const id = data.id.toString();

    try {
        await clientSessionCollection.doc(id).update(data);
    } catch (error) {
        console.error("Erro ao atualizar dados: ", error);
        throw error;
    }
};

// TODO: INVÉS DE IMPLEMENTAR UM DELETE, FAZER UM CLEAR NA SESSÃO PARA SIMULAR QUE UMA MESA FOI ESVAZIADA
// const deleteDB = async (data) => {
//     const id = data.id.toString();

//     try {
//         await clientSessionCollection.doc(id).delete();
//     } catch (error) {
//         console.error("Erro ao deletar dados: ", error);
//         throw error;
//     }
// };

module.exports = { getDB, insertDB, updateDB };
