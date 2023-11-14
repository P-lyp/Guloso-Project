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

        const updatedData = await getDB();
        io.emit("showData", updatedData);
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        throw error;
    }
};

module.exports = { getDB, insertDB };
