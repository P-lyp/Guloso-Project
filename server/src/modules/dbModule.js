import { supabase } from "./supabaseModule.js";

export async function selectTables() {
    const { data, error } = await supabase.from("tables").select("*").order("tables_available");

    if (error) {
        console.error(`ERRO AO CONSULTAR MESAS ${error}`);
        return;
    }

    return data;
}

export async function selectTableOrders(tableId) {
    const { data, error } = await supabase.from("order").select().eq("tables_id", tableId);

    if (error) {
        console.log(`ERRO AO CONSULTAR PEDIDOS DA MESA ${error}`);
        return;
    }

    return data;
}

export async function updateTableStatus(tableId, newAvailableStatus) {
    const { error } = await supabase
        .from("tables")
        .update({ tables_available: newAvailableStatus })
        .eq("tables_id", tableId);

    if (error) {
        console.error(`ERRO AO ATUALIZAR MESA ${error}`);
        return;
    }
}

export async function insertOrder(receivedData) {
    // Data tem que ter: ID da mesa
    const { data: result, error } = await supabase
        .from("order")
        .insert({ tables_id: receivedData.tableId })
        .select();

    if (error) {
        console.error(`ERRO AO CRIAR PEDIDO ${error}`);
        return;
    }

    const newOrderId = result[0].order_id; // atribui o id do pedido com o retorno da consulta após inserir no BD
    const menuId = receivedData.menuId; // atribui o id que foi passado pelo parametro da função de criar pedido

    insertOrderItems(newOrderId, menuId);

    async function insertOrderItems(orderId, menuId) {
        // Data tem que ter: Id do cardápio e Id da mesa
        const { error } = await supabase
            .from("orderitems")
            .insert({ order_id: orderId, menu_id: menuId });

        if (error) {
            console.error(`ERRO AO ADICIONAR ITENS DO PEDIDO ${error}`);
            return;
        }
    }
}

export async function insertTable() {
    const { error } = await supabase.from("tables").insert({});

    if (error) {
        console.error(`ERRO AO CRIAR MESA ${error}`);
        return;
    }
}

export async function deleteTable(tableId) {
    const { error } = await supabase.from("tables").delete().eq("tables_id", tableId);

    if (error) {
        console.error(`ERRO AO DELETAR MESA ${error}`);
        return;
    }
}

export async function sumTableOrders(tableId) {
    const { data, error } = await supabase.rpc("sum_table_orders", { id_mesa: tableId });

    if (error) {
        console.error(`ERRO  ${error}`);
    }

    return data;
}
