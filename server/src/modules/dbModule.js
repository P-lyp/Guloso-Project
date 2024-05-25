import { supabase } from "./supabaseModule.js";

export async function getTables() {
    const { data, error } = await supabase.from("tables").select();

    if (error) {
        console.error("Error fetching data:", error);
        return;
    }

    console.table(data);
}
getTables();

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
