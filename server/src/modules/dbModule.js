// const firebase = require("firebase");

// const db = firebase.firestore();
// const clientSessionCollection = db.collection("clientSession");

import { supabase } from "./supabaseModule.js";

export const getDB = async () => {
    try {
        const snapshot = await clientSessionCollection.orderBy("id", "asc").get();
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

export const insertDB = async (data) => {
    try {
        const newId = await generateNewId();
        await clientSessionCollection.doc(`session${newId}`).set(data);
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        throw error;
    }
};

export const updateDB = async (data) => {
    const id = data.id.toString();

    try {
        await clientSessionCollection.doc(id).update(data);
    } catch (error) {
        console.error("Erro ao atualizar dados: ", error);
        throw error;
    }
};

export const addOrder = async (data, sessionId) => {
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

// SUPABASE

fetchTableData();
export async function fetchTableData() {
    const { data, error } = await supabase.from("tables").select();

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    console.log(data);
}

// async function createTable() {
//     const { error } = await supabase.from("tables").insert({});

//     if (error) {
//         console.error(error);
//         return;
//     }
// } // createTable()

// async function occupyTable(dinersQnt, tableId) {
//     const { error } = await supabase
//         .from("tables")
//         .update({ available: false, diners: dinersQnt })
//         .eq("id", tableId);
// } //  occupyTable(quantidade de pessoas na mesa, id da mesa)

// async function newOrder(tableId) {
//     const { error } = await supabase.from("order").insert({ table_id: tableId });

//     if (error) {
//         console.error(error);
//         return;
//     }
// } // newOrder(id da mesa)

// async function addMenuItem(orderId, menuId) {
//     const { error } = await supabase
//         .from("order_items")
//         .insert({ order_id: orderId, menu_id: menuId });

//     if (error) {
//         console.error(error);
//         return;
//     }
// } // addMenuItem(id do pedido, id do item)
