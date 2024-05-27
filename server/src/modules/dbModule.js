import { supabase } from "./supabaseModule.js";

export async function fetchTables() {
    const { data, error } = await supabase.from("tables").select();

    if (error) {
        console.error("Error fetching tables:", error);
        return;
    }

    return data;
}

export async function fetchTableOrders(tableId) {
    const { data, error } = await supabase.from("order").select().eq("tables_id", tableId);

    if (error) {
        console.log("Erro fetching orders: ", error);
        return;
    }

    return data;
}

// const teste = {
//     tableId: 2,
// };

// fetchTableOrders(teste);

export async function updateTableStatus(receivedData) {
    // Data tem que ter: quantidade de pessoas e ID da mesa
    const { error } = await supabase
        .from("tables")
        .update({ tables_available: false, tables_diners: data.dinersQnt })
        .eq("id", receivedData.tableId);

    if (error) {
        console.error(error);
        return;
    }
}

export async function createOrder(receivedData) {
    // Data tem que ter: ID da mesa
    const { data: result, error } = await supabase
        .from("order")
        .insert({ tables_id: receivedData.tableId })
        .select();

    if (error) {
        console.error(error);
        return;
    }

    const newOrderId = result[0].order_id; // atribui o id do pedido com o retorno da consulta após inserir no BD
    const menuId = receivedData.menuId; // atribui o id que foi passado pelo parametro da função de criar pedido

    addOrderItems(newOrderId, menuId);

    async function addOrderItems(orderId, menuId) {
        // Data tem que ter: Id do cardápio e Id da mesa
        const { error } = await supabase
            .from("orderitems")
            .insert({ order_id: orderId, menu_id: menuId });

        if (error) {
            console.error(error);
            return;
        }
    }
}

// const exemple = {
//     tableId: 2,
//     menuId: 1,
// };

// createOrder(exemple);
