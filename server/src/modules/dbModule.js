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
            return data;
        });
        return clientSession;
    } catch (error) {
        console.error("Erro ao obter dados:", error);
        throw error;
    }
};

const generateNewId = async () => {
    const snapshot = await clientSessionCollection.orderBy("id", "asc").get();
    const clientSession = snapshot.docs.map((doc) => {
        const data = doc.data();
        return data;
    });

    const newId = clientSession.length + 1;
    return newId;
};

const insertDB = async (data) => {
    try {
        const newId = await generateNewId();
        await clientSessionCollection.doc(`session${newId}`).set(data);
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

const addOrder = async (data, sessionId) => {
    // const data = [{ food: "Hamburguer", price: 20 }];

    try {
        clientSessionCollection.doc(sessionId).update({
            orders: firebase.firestore.FieldValue.arrayUnion(...data),
        });
    } catch (error) {
        console.error("Erro ao adicionar pedido: ", error);
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

//teste

module.exports = { getDB, insertDB, updateDB, addOrder };
